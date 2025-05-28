import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ItemType, UserRole, AuthMethod, Item } from '@prisma/client';

class InvalidItemTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidItemTypeError";
  }
}

// Helper to map string types to ItemType enum
function mapStringToItemType(typeString: string): ItemType {
  const upperTypeString = typeString.toUpperCase().replace(/\s+/g, '_');
  if (upperTypeString in ItemType) {
    return upperTypeString as ItemType;
  }
  throw new InvalidItemTypeError(`Invalid item type provided: '${typeString}'.`);
}

interface GroceryItemInput {
  name: string;
  quantity: number;
  expire_date: string; // 'YYYY-MM-DD' or 'N/A'
  type: string; // e.g., 'Produce', 'Meat'
  img?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: {
          include: {
            pantry: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.profile || !user.profile.pantry) {
      return NextResponse.json({ items: [] }); // No pantry or user found, return empty list
    }

    const pantryItems = user.profile.pantry.items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      // Format dates as 'YYYY-MM-DD'. Handle potential nulls if your schema changes.
      expire_date: item.expireDate.toISOString().split('T')[0],
      type: item.type, // This will be the enum value, e.g., 'VEGETABLES'
      img: item.img,
      dateBought: item.dateBought.toISOString().split('T')[0],
    }));

    return NextResponse.json({ items: pantryItems });
  } catch (error) {
    console.error('Error fetching pantry items:', error);
    return NextResponse.json({ error: 'Failed to fetch pantry items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { email, itemsToAdd } = (await request.json()) as { email: string; itemsToAdd: GroceryItemInput[] | GroceryItemInput };

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }
  if (!itemsToAdd || (Array.isArray(itemsToAdd) && itemsToAdd.length === 0) || (!Array.isArray(itemsToAdd) && !itemsToAdd.name)) {
    return NextResponse.json({ error: 'Items to add are required' }, { status: 400 });
  }

  const itemsArray = Array.isArray(itemsToAdd) ? itemsToAdd : [itemsToAdd];

  try {
    let user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
       return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.profile) {
      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
        }
      });
      user = { ...user, profile };
    }
    
    const profileId = user.profile!.id;

    let pantry = await prisma.pantry.findUnique({
      where: { profileId: profileId },
    });

    if (!pantry) {
      pantry = await prisma.pantry.create({
        data: {
          profileId: profileId,
        },
      });
    }

    const processedItems: Item[] = [];
    for (const itemInput of itemsArray) {
      if (!itemInput.name || typeof itemInput.quantity !== 'number' || !itemInput.expire_date || !itemInput.type) {
        console.warn('Skipping invalid item input (missing required fields):', itemInput);
        continue; 
      }

      let itemType: ItemType;
      try {
        itemType = mapStringToItemType(itemInput.type);
      } catch (e) {
        if (e instanceof InvalidItemTypeError) {
          // Stop processing this batch and inform client about the specific item
          return NextResponse.json({ 
            error: `Invalid type for item '${itemInput.name}'. ${e.message}` 
          }, { status: 400 });
        }
        throw e; // Re-throw other unexpected errors
      }
      
      const existingItem = await prisma.item.findFirst({
        where: {
          pantryId: pantry.id,
          name: itemInput.name,
          type: itemType,
        },
      });

      let parsedNewExpireDate: Date | undefined = undefined;
      if (itemInput.expire_date.toUpperCase() !== 'N/A') {
        const parsedDate = new Date(itemInput.expire_date);
        if (!isNaN(parsedDate.getTime())) {
          parsedNewExpireDate = parsedDate;
        } else {
          console.warn(`Invalid date format for item ${itemInput.name}: ${itemInput.expire_date}. Expiry date will not be updated if item exists, or item might be skipped if new.`);
        }
      }


      if (existingItem) {
        // Item exists, update quantity and potentially other fields
        const updatedQuantity = existingItem.quantity + itemInput.quantity;
        
        const dataToUpdate: { quantity: number; expireDate?: Date; img?: string | null } = {
            quantity: updatedQuantity,
        };

        if (parsedNewExpireDate) {
            dataToUpdate.expireDate = parsedNewExpireDate;
        }
        if (itemInput.img !== undefined) { // Check if img is explicitly provided
            dataToUpdate.img = itemInput.img;
        }


        const updatedItem = await prisma.item.update({
          where: { id: existingItem.id },
          data: dataToUpdate,
        });
        processedItems.push(updatedItem);
      } else {
        // Item does not exist, create new
        let expireDateForNewItem: Date;
        if (parsedNewExpireDate) {
            expireDateForNewItem = parsedNewExpireDate;
        } else if (itemInput.expire_date.toUpperCase() === 'N/A') {
            // Example: Set to 100 years in the future if 'N/A' for a new item
            expireDateForNewItem = new Date();
            expireDateForNewItem.setFullYear(expireDateForNewItem.getFullYear() + 100);
        } else {
            // Invalid date for a new item, skip or handle as error
            console.warn(`Invalid or N/A date for new item ${itemInput.name}: ${itemInput.expire_date}. Skipping item.`);
            continue;
        }

        const newItem = await prisma.item.create({
          data: {
            name: itemInput.name,
            type: itemType, // Use the validated itemType
            img: itemInput.img,
            quantity: itemInput.quantity,
            dateBought: new Date(),
            expireDate: expireDateForNewItem,
            pantryId: pantry.id,
          },
        });
        processedItems.push(newItem);
      }
    }

    return NextResponse.json({ message: 'Items processed successfully', processedItems }, { status: 201 });
  } catch (error) {
    if (error instanceof InvalidItemTypeError) {
      // This case should ideally be caught within the loop,
      // but as a fallback or if mapStringToItemType is called elsewhere.
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error processing items for pantry:', error);
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
        return NextResponse.json({ error: 'Failed to add items due to a conflict (e.g., unique constraint).', details: (error as any).meta?.target }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to process items for pantry' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { email, itemIdsToDelete } = (await request.json()) as { email: string; itemIdsToDelete: string[] | string };

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }
  if (!itemIdsToDelete || (Array.isArray(itemIdsToDelete) && itemIdsToDelete.length === 0) || (typeof itemIdsToDelete === 'string' && !itemIdsToDelete)) {
    return NextResponse.json({ error: 'Item ID(s) to delete are required' }, { status: 400 });
  }

  const idsArray = Array.isArray(itemIdsToDelete) ? itemIdsToDelete : [itemIdsToDelete];

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: {
          include: {
            pantry: true,
          },
        },
      },
    });

    if (!user || !user.profile || !user.profile.pantry) {
      return NextResponse.json({ error: 'User or pantry not found' }, { status: 404 });
    }

    const pantryId = user.profile.pantry.id;

    // Verify items belong to the user's pantry before deleting
    // This adds a layer of security/correctness
    const items = await prisma.item.findMany({
        where: {
            id: { in: idsArray },
            pantryId: pantryId,
        }
    });

    const foundItemIds = items.map(item => item.id);
    const notFoundIds = idsArray.filter(id => !foundItemIds.includes(id));

    if (notFoundIds.length > 0) {
        console.warn(`Some items not found in user's pantry or do not exist: ${notFoundIds.join(', ')}`);
    }

    if (foundItemIds.length === 0) {
        return NextResponse.json({ error: 'No specified items found in this pantry to delete' }, { status: 404 });
    }


    const deleteResult = await prisma.item.deleteMany({
      where: {
        id: { in: foundItemIds }, // Only delete items confirmed to be in the user's pantry
        pantryId: pantryId,
      },
    });

    if (deleteResult.count === 0) {
      return NextResponse.json({ error: 'No items were deleted. They might not exist or belong to another pantry.' }, { status: 404 });
    }

    return NextResponse.json({ message: `${deleteResult.count} item(s) deleted successfully` });
  } catch (error) {
    console.error('Error deleting items from pantry:', error);
    return NextResponse.json({ error: 'Failed to delete items from pantry' }, { status: 500 });
  }
}