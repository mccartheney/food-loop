import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Interface for creating a trade
interface TradeCreateInput {
  email: string;
  title: string;
  description: string;
  offeredItemIds: string[]; // Items from user's pantry they want to trade
  wantedItems: string[]; // What they want in return (item names/types)
  location?: string;
}

// Interface for trade participation
interface TradeParticipateInput {
  email: string;
  tradeId: string;
  offeredItemIds: string[]; // Items they offer to give in return
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const status = searchParams.get('status'); // 'active', 'completed', 'all'
  const userId = searchParams.get('userId'); // To get trades by specific user

  try {
    let whereClause: any = {
      price: 0, // Distinguish trades from marketplace items
      hasSoldOrDonated: status === 'completed' ? true : status === 'active' ? false : undefined,
    };

    // If userId is provided, get trades for that specific user
    if (userId) {
      const userProfile = await prisma.profile.findFirst({
        where: { userId: userId }
      });
      
      if (!userProfile) {
        return NextResponse.json({ trades: [] });
      }

      // Get trades created by this user OR trades they participated in
      const userTrades = await prisma.box.findMany({
        where: {
          OR: [
            // Trades created by this user (using ngoId to store profile ID)
            { ngoId: userProfile.id, price: 0 },
            // Trades they participated in (through orders)
            {
              price: 0,
              orders: {
                some: {
                  profileId: userProfile.id
                }
              }
            }
          ]
        },
        include: {
          items: true,
          orders: {
            include: {
              profile: {
                include: {
                  user: true
                }
              }
            }
          },
          ngo: true // This will actually be the profile who created the trade
        },
        orderBy: { date: 'desc' }
      });

      const formattedTrades = userTrades.map(trade => ({
        id: trade.id,
        title: trade.name,
        description: trade.description,
        offeredItems: trade.items,
        status: trade.hasSoldOrDonated ? 'completed' : 'active',
        createdAt: trade.date,
        endDate: trade.endDate,
        ownerId: trade.ngoId,
        isOwner: trade.ngoId === userProfile.id,
        participants: trade.orders,
        location: trade.description.includes('📍') ? trade.description.split('📍')[1]?.split('\n')[0] : null,
      }));

      return NextResponse.json({ trades: formattedTrades });
    }

    // Regular marketplace view - get all active trades
    const trades = await prisma.box.findMany({
      where: whereClause,
      include: {
        items: true,
        orders: {
          include: {
            profile: {
              include: {
                user: true
              }
            }
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    const formattedTrades = trades.map(trade => ({
      id: trade.id,
      title: trade.name,
      description: trade.description,
      offeredItems: trade.items,
      status: trade.hasSoldOrDonated ? 'completed' : 'active',
      createdAt: trade.date,
      endDate: trade.endDate,
      ownerId: trade.ngoId,
      participants: trade.orders,
      location: trade.description.includes('📍') ? trade.description.split('📍')[1]?.split('\n')[0] : null,
    }));

    return NextResponse.json({ trades: formattedTrades });
  } catch (error) {
    console.error('Error fetching trades:', error);
    return NextResponse.json({ error: 'Failed to fetch trades' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { email, title, description, offeredItemIds, wantedItems, location } = 
    (await request.json()) as TradeCreateInput;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!title || !offeredItemIds || offeredItemIds.length === 0 || !wantedItems || wantedItems.length === 0) {
    return NextResponse.json({ 
      error: 'Title, offered items, and wanted items are required' 
    }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { 
        profile: {
          include: {
            pantry: {
              include: {
                items: true
              }
            }
          }
        }
      },
    });

    if (!user || !user.profile || !user.profile.pantry) {
      return NextResponse.json({ error: 'User, profile, or pantry not found' }, { status: 404 });
    }

    // Verify the offered items belong to the user's pantry
    const userItems = user.profile.pantry.items;
    const validItemIds = userItems.map(item => item.id);
    const invalidItemIds = offeredItemIds.filter(id => !validItemIds.includes(id));

    if (invalidItemIds.length > 0) {
      return NextResponse.json({ 
        error: 'Some offered items do not belong to your pantry' 
      }, { status: 400 });
    }

    // Create the trade description with wanted items and location
    const wantedItemsText = wantedItems.join(', ');
    const fullDescription = `${description}\n\n🔄 Wants: ${wantedItemsText}${location ? `\n📍 ${location}` : ''}`;

    // Create the trade using Box model
    const trade = await prisma.box.create({
      data: {
        name: title,
        description: fullDescription,
        quantity: offeredItemIds.length,
        date: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        price: 0, // Distinguish from marketplace items
        hasSoldOrDonated: false,
        ngoId: user.profile.id, // Use ngoId to store the profile ID of trade creator
      },
    });

    // Link the offered items to this trade
    await prisma.item.updateMany({
      where: {
        id: { in: offeredItemIds },
        pantryId: user.profile.pantry.id
      },
      data: {
        boxId: trade.id
      }
    });

    return NextResponse.json({ 
      message: 'Trade created successfully', 
      trade: {
        id: trade.id,
        title: trade.name,
        description: trade.description,
        status: 'active'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating trade:', error);
    return NextResponse.json({ error: 'Failed to create trade' }, { status: 500 });
  }
}

// Handle trade participation requests
export async function PATCH(request: NextRequest) {
  const { email, tradeId, offeredItemIds } = (await request.json()) as TradeParticipateInput;

  if (!email || !tradeId) {
    return NextResponse.json({ error: 'Email and trade ID are required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { 
        profile: {
          include: {
            pantry: {
              include: {
                items: true
              }
            }
          }
        }
      },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: 'User or profile not found' }, { status: 404 });
    }

    // Find the trade
    const trade = await prisma.box.findUnique({
      where: { id: tradeId },
      include: { items: true }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    if (trade.hasSoldOrDonated) {
      return NextResponse.json({ error: 'Trade is already completed' }, { status: 400 });
    }

    // Check if user is trying to participate in their own trade
    if (trade.ngoId === user.profile.id) {
      return NextResponse.json({ error: 'Cannot participate in your own trade' }, { status: 400 });
    }

    // If offeredItemIds are provided, verify they belong to the user
    if (offeredItemIds && offeredItemIds.length > 0 && user.profile.pantry) {
      const userItems = user.profile.pantry.items;
      const validItemIds = userItems.map(item => item.id);
      const invalidItemIds = offeredItemIds.filter(id => !validItemIds.includes(id));

      if (invalidItemIds.length > 0) {
        return NextResponse.json({ 
          error: 'Some offered items do not belong to your pantry' 
        }, { status: 400 });
      }
    }

    // Create an order to represent participation interest
    const participation = await prisma.order.create({
      data: {
        entity: 'NGO', // Use NGO as default entity type
        profileId: user.profile.id,
        date: new Date(),
        quantity: offeredItemIds ? offeredItemIds.length : 0,
        ngoId: trade.ngoId, // Reference to trade creator
      }
    });

    // Link this participation to the trade
    await prisma.box.update({
      where: { id: tradeId },
      data: {
        orders: {
          connect: { id: participation.id }
        }
      }
    });

    return NextResponse.json({ 
      message: 'Trade participation request sent successfully',
      participationId: participation.id
    });

  } catch (error) {
    console.error('Error participating in trade:', error);
    return NextResponse.json({ error: 'Failed to participate in trade' }, { status: 500 });
  }
}
