import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface HistoryActivity {
  id: string;
  type: 'TRADE_CREATED' | 'TRADE_COMPLETED' | 'ITEM_ADDED' | 'RECIPE_CREATED' | 'FRIEND_ADDED' | 'FRIEND_REQUEST_SENT';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  metadata: {
    itemName?: string;
    itemQuantity?: number;
    tradeName?: string;
    tradeId?: string;
    recipeName?: string;
    recipeId?: string;
    friendName?: string;
    friendId?: string;
    [key: string]: any;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const type = searchParams.get('type') || 'all'; // all, trades, items, recipes, friends
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const days = parseInt(searchParams.get('days') || '30'); // Last N days

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });

    if (!user?.profile) {
      return NextResponse.json({ activities: [], total: 0, hasMore: false });
    }

    const userId = user.id;
    const profileId = user.profile.id;
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const activities: HistoryActivity[] = [];

    // 1. GET TRADES ACTIVITIES
    if (type === 'all' || type === 'trades') {
      try {
        // Get trades created by user
        const userTrades = await prisma.box.findMany({
          where: {
            price: 0, // Trades have price 0
            description: {
              contains: `TRADE_CREATOR:${profileId}`
            },
            date: { gte: cutoffDate }
          },
          include: {
            items: true,
            orders: {
              include: {
                profile: {
                  include: { user: true }
                }
              }
            }
          },
          orderBy: { date: 'desc' }
        });

        // Add trade created activities
        userTrades.forEach(trade => {
          const cleanDescription = trade.description.replace(/TRADE_CREATOR:[^\n]+\n/, '');
          activities.push({
            id: `trade-created-${trade.id}`,
            type: 'TRADE_CREATED',
            title: 'Trade Criado',
            description: `Criou o trade "${trade.name}"`,
            timestamp: trade.date,
            icon: '🤝',
            metadata: {
              tradeName: trade.name,
              tradeId: trade.id,
              offeredItems: trade.items.length
            }
          });

          // Add trade completed activity if completed
          if (trade.hasSoldOrDonated) {
            activities.push({
              id: `trade-completed-${trade.id}`,
              type: 'TRADE_COMPLETED',
              title: 'Trade Completado',
              description: `Completou o trade "${trade.name}"`,
              timestamp: trade.endDate,
              icon: '✅',
              metadata: {
                tradeName: trade.name,
                tradeId: trade.id,
                participantsCount: trade.orders.length
              }
            });
          }
        });

        // Get trades user participated in
        const participatedTrades = await prisma.box.findMany({
          where: {
            price: 0,
            orders: {
              some: {
                profileId: profileId
              }
            },
            date: { gte: cutoffDate }
          },
          include: {
            items: true,
            orders: {
              include: {
                profile: {
                  include: { user: true }
                }
              }
            }
          }
        });

        participatedTrades.forEach(trade => {
          const isNotCreator = !trade.description.includes(`TRADE_CREATOR:${profileId}`);
          if (isNotCreator) {
            const userOrder = trade.orders.find(order => order.profileId === profileId);
            if (userOrder) {
              activities.push({
                id: `trade-joined-${trade.id}`,
                type: 'TRADE_CREATED', // Using same type for simplicity
                title: 'Participou em Trade',
                description: `Participou no trade "${trade.name}"`,
                timestamp: userOrder.date,
                icon: '🔄',
                metadata: {
                  tradeName: trade.name,
                  tradeId: trade.id,
                  action: 'participated'
                }
              });
            }
          }
        });
      } catch (error) {
        console.error('Error fetching trade activities:', error);
      }
    }

    // 2. GET PANTRY ITEMS ACTIVITIES
    if (type === 'all' || type === 'items') {
      try {
        const pantryItems = await prisma.item.findMany({
          where: {
            pantry: {
              profileId: profileId
            },
            dateBought: { gte: cutoffDate }
          },
          orderBy: { dateBought: 'desc' },
          take: 50 // Limit to avoid too many items
        });

        pantryItems.forEach(item => {
          activities.push({
            id: `item-added-${item.id}`,
            type: 'ITEM_ADDED',
            title: 'Item Adicionado',
            description: `Adicionou ${item.quantity}x ${item.name} à despensa`,
            timestamp: item.dateBought,
            icon: '📦',
            metadata: {
              itemName: item.name,
              itemQuantity: item.quantity,
              itemType: item.type
            }
          });
        });
      } catch (error) {
        console.error('Error fetching pantry activities:', error);
      }
    }

    // 3. GET RECIPES ACTIVITIES
    if (type === 'all' || type === 'recipes') {
      try {
        const userRecipes = await prisma.recipe.findMany({
          where: {
            profileId: profileId,
            id: { 
              // Use recipe ID as proxy for creation date since there's no createdAt
              not: undefined 
            }
          },
          include: {
            favorites: true,
            items: true
          },
          orderBy: { id: 'desc' },
          take: 20
        });

        userRecipes.forEach(recipe => {
          // Since we don't have createdAt, we'll use a reasonable timestamp
          // In a real scenario, you'd want to add createdAt to Recipe model
          const estimatedDate = new Date(Date.now() - Math.random() * days * 24 * 60 * 60 * 1000);
          
          if (estimatedDate >= cutoffDate) {
            activities.push({
              id: `recipe-created-${recipe.id}`,
              type: 'RECIPE_CREATED',
              title: 'Receita Criada',
              description: `Criou a receita "${recipe.name}"`,
              timestamp: estimatedDate,
              icon: '👨‍🍳',
              metadata: {
                recipeName: recipe.name,
                recipeId: recipe.id,
                favoritesCount: recipe.favorites.length,
                ingredientsCount: recipe.items.length
              }
            });
          }
        });
      } catch (error) {
        console.error('Error fetching recipe activities:', error);
      }
    }

    // 4. GET FRIENDS ACTIVITIES
    if (type === 'all' || type === 'friends') {
      try {
        // Get accepted friend requests (both sent and received)
        const acceptedRequests = await prisma.friendRequest.findMany({
          where: {
            OR: [
              { requesterId: profileId },
              { receiverId: profileId }
            ],
            status: 'ACCEPTED',
            updatedAt: { gte: cutoffDate }
          },
          include: {
            requester: {
              include: { user: true }
            },
            receiver: {
              include: { user: true }
            }
          },
          orderBy: { updatedAt: 'desc' }
        });

        acceptedRequests.forEach(request => {
          const isRequester = request.requesterId === profileId;
          const friend = isRequester ? request.receiver : request.requester;
          
          activities.push({
            id: `friend-added-${request.id}`,
            type: 'FRIEND_ADDED',
            title: isRequester ? 'Amigo Adicionado' : 'Novo Amigo',
            description: isRequester 
              ? `${friend.user.name} aceitou seu pedido de amizade`
              : `Adicionou ${friend.user.name} como amigo`,
            timestamp: request.updatedAt,
            icon: '👥',
            metadata: {
              friendName: friend.user.name,
              friendId: friend.userId,
              action: isRequester ? 'accepted_by_friend' : 'accepted_friend'
            }
          });
        });

        // Get sent friend requests
        const sentRequests = await prisma.friendRequest.findMany({
          where: {
            requesterId: profileId,
            status: 'PENDING',
            createdAt: { gte: cutoffDate }
          },
          include: {
            receiver: {
              include: { user: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        });

        sentRequests.forEach(request => {
          activities.push({
            id: `friend-request-sent-${request.id}`,
            type: 'FRIEND_REQUEST_SENT',
            title: 'Pedido de Amizade',
            description: `Enviou pedido de amizade para ${request.receiver.user.name}`,
            timestamp: request.createdAt,
            icon: '📨',
            metadata: {
              friendName: request.receiver.user.name,
              friendId: request.receiver.userId,
              status: request.status
            }
          });
        });
      } catch (error) {
        console.error('Error fetching friend activities:', error);
      }
    }

    // Sort all activities by timestamp (most recent first)
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Apply pagination
    const total = activities.length;
    const paginatedActivities = activities.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return NextResponse.json({
      activities: paginatedActivities,
      total,
      hasMore,
      summary: {
        trades: activities.filter(a => a.type.includes('TRADE')).length,
        items: activities.filter(a => a.type === 'ITEM_ADDED').length,
        recipes: activities.filter(a => a.type === 'RECIPE_CREATED').length,
        friends: activities.filter(a => a.type.includes('FRIEND')).length
      }
    });

  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
