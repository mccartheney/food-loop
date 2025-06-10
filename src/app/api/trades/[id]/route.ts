import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Interface for accepting a trade
interface TradeAcceptInput {
  email: string;
  participantId: string; // The order ID of the participant to accept
}

// Interface for completing a trade
interface TradeCompleteInput {
  email: string;
  participantId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const { id } = await params;
    const trade = await prisma.box.findUnique({
      where: { id },
      include: {
        items: true,
        orders: {
          include: {
            profile: {
              include: {
                user: true,
                pantry: {
                  include: {
                    items: true
                  }
                }
              }
            }
          }
        },
        ngo: true // This represents the profile who created the trade
      }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Extract creator ID from description and get creator profile info
    const creatorMatch = trade.description.match(/TRADE_CREATOR:([^\n]+)/);
    const creatorId = creatorMatch ? creatorMatch[1] : null;
    const cleanDescription = trade.description.replace(/TRADE_CREATOR:[^\n]+\n/, '');
    
    const creatorProfile = creatorId ? await prisma.profile.findUnique({
      where: { id: creatorId },
      include: {
        user: true
      }
    }) : null;

    const formattedTrade = {
      id: trade.id,
      title: trade.name,
      description: cleanDescription,
      offeredItems: trade.items,
      status: trade.hasSoldOrDonated ? 'completed' : 'active',
      createdAt: trade.date,
      endDate: trade.endDate,
      creator: creatorProfile ? {
        id: creatorProfile.id,
        name: creatorProfile.user.name,
        email: creatorProfile.user.email
      } : null,
      participants: trade.orders.map(order => ({
        id: order.id,
        profileId: order.profileId,
        participantName: order.profile.user.name,
        participantEmail: order.profile.user.email,
        date: order.date,
        quantity: order.quantity,
        offeredItems: order.profile.pantry?.items.filter(item => 
          // This would need to be enhanced to track which items each participant offered
          item.pantryId === order.profile.pantry?.id
        ) || []
      })),
      location: cleanDescription.includes('📍') ? 
        cleanDescription.split('📍')[1]?.split('\n')[0] : null,
      wantedItems: cleanDescription.includes('🔄 Wants:') ? 
        cleanDescription.split('🔄 Wants:')[1]?.split('\n')[0]?.trim() : null,
    };

    return NextResponse.json({ trade: formattedTrade });
  } catch (error) {
    console.error('Error fetching trade details:', error);
    return NextResponse.json({ error: 'Failed to fetch trade details' }, { status: 500 });
  }
}

// Accept a trade participant
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { email, participantId } = (await request.json()) as TradeAcceptInput;

  if (!email || !participantId) {
    return NextResponse.json({ 
      error: 'Email and participant ID are required' 
    }, { status: 400 });
  }

  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: 'User or profile not found' }, { status: 404 });
    }

    // Find the trade
    const trade = await prisma.box.findUnique({
      where: { id },
      include: {
        items: true,
        orders: {
          include: {
            profile: {
              include: {
                user: true,
                pantry: {
                  include: {
                    items: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Extract creator ID from description and verify ownership
    const creatorMatch = trade.description.match(/TRADE_CREATOR:([^\n]+)/);
    const creatorId = creatorMatch ? creatorMatch[1] : null;
    
    if (creatorId !== user.profile.id) {
      return NextResponse.json({ 
        error: 'Only the trade creator can accept participants' 
      }, { status: 403 });
    }

    // Find the specific participant
    const participant = trade.orders.find(order => order.id === participantId);
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
    }

    // Mark the trade as completed
    await prisma.box.update({
      where: { id },
      data: { hasSoldOrDonated: true }
    });

    return NextResponse.json({ 
      message: 'Trade participant accepted successfully',
      acceptedParticipant: {
        id: participant.id,
        name: participant.profile.user.name,
        email: participant.profile.user.email
      }
    });

  } catch (error) {
    console.error('Error accepting trade participant:', error);
    return NextResponse.json({ error: 'Failed to accept trade participant' }, { status: 500 });
  }
}

// Complete a trade (transfer items)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { email, participantId } = (await request.json()) as TradeCompleteInput;

  if (!email || !participantId) {
    return NextResponse.json({ 
      error: 'Email and participant ID are required' 
    }, { status: 400 });
  }

  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { 
        profile: {
          include: {
            pantry: true
          }
        }
      },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: 'User or profile not found' }, { status: 404 });
    }

    // Find the trade
    const trade = await prisma.box.findUnique({
      where: { id },
      include: {
        items: true,
        orders: {
          include: {
            profile: {
              include: {
                pantry: true
              }
            }
          }
        }
      }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Extract creator ID from description and verify ownership
    const creatorMatch = trade.description.match(/TRADE_CREATOR:([^\n]+)/);
    const creatorId = creatorMatch ? creatorMatch[1] : null;
    
    if (creatorId !== user.profile.id) {
      return NextResponse.json({ 
        error: 'Only the trade creator can complete trades' 
      }, { status: 403 });
    }

    // Find the participant
    const participant = trade.orders.find(order => order.id === participantId);
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
    }

    if (!participant.profile.pantry || !user.profile.pantry) {
      return NextResponse.json({ 
        error: 'Both users must have pantries to complete trade' 
      }, { status: 400 });
    }

    // Find the participant's offer box (contains items they offered)
    const participantOfferBoxes = await prisma.box.findMany({
      where: {
        price: -1, // Special price for participant offers
        description: {
          contains: `PARTICIPANT_OFFER:${participant.profileId}`
        },
        orders: {
          some: {
            id: participantId
          }
        }
      },
      include: {
        items: true
      }
    });

    // Transfer items from trade creator to participant
    // Move the offered items to participant's pantry
    await prisma.item.updateMany({
      where: {
        boxId: trade.id
      },
      data: {
        pantryId: participant.profile.pantry.id,
        boxId: null // Remove from trade
      }
    });

    // Transfer items from participant to trade creator (if they made an offer)
    if (participantOfferBoxes.length > 0) {
      const participantOfferBox = participantOfferBoxes[0]; // Should only be one
      
      // Move participant's offered items to creator's pantry
      await prisma.item.updateMany({
        where: {
          boxId: participantOfferBox.id
        },
        data: {
          pantryId: user.profile.pantry.id,
          boxId: null // Remove from offer box
        }
      });

      // Delete the temporary offer box
      await prisma.box.delete({
        where: { id: participantOfferBox.id }
      });
    }

    // Mark the trade as completed
    await prisma.box.update({
      where: { id },
      data: { hasSoldOrDonated: true }
    });

    // Create history records for both users
    const now = new Date();
    
    // Creator's history
    await prisma.history.create({
      data: {
        profileId: user.profile.id,
        date: now,
        orders: {
          connect: { id: participantId }
        }
      }
    });

    // Participant's history
    await prisma.history.create({
      data: {
        profileId: participant.profile.id,
        date: now,
        orders: {
          connect: { id: participantId }
        }
      }
    });

    // Get participant user info for response
    const participantUser = await prisma.user.findUnique({
      where: { id: participant.profile.userId }
    });

    return NextResponse.json({ 
      message: 'Trade completed successfully',
      trade: {
        id: trade.id,
        status: 'completed',
        completedWith: participantUser?.name || 'Unknown User',
        itemsTransferred: trade.items.length
      }
    });

  } catch (error) {
    console.error('Error completing trade:', error);
    return NextResponse.json({ error: 'Failed to complete trade' }, { status: 500 });
  }
}

// Delete a trade
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { email } = await request.json() as { email: string };

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: 'User or profile not found' }, { status: 404 });
    }

    // Find the trade
    const trade = await prisma.box.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Extract creator ID from description and verify ownership
    const creatorMatch = trade.description.match(/TRADE_CREATOR:([^\n]+)/);
    const creatorId = creatorMatch ? creatorMatch[1] : null;
    
    if (creatorId !== user.profile.id) {
      return NextResponse.json({ 
        error: 'Only the trade creator can delete trades' 
      }, { status: 403 });
    }

    // Prevent deletion of completed trades
    if (trade.hasSoldOrDonated) {
      return NextResponse.json({ 
        error: 'Cannot delete completed trades' 
      }, { status: 400 });
    }

    // Remove items from trade (return them to pantry only)
    await prisma.item.updateMany({
      where: { boxId: trade.id },
      data: { boxId: null }
    });

    // Delete associated orders (trade participation requests)
    await prisma.order.deleteMany({
      where: {
        boxes: {
          some: { id: trade.id }
        }
      }
    });

    // Delete the trade
    await prisma.box.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Trade deleted successfully' });

  } catch (error) {
    console.error('Error deleting trade:', error);
    return NextResponse.json({ error: 'Failed to delete trade' }, { status: 500 });
  }
}
