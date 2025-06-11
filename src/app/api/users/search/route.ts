import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/users/search - Search users by name or email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ 
        error: 'Query must be at least 2 characters long' 
      }, { status: 400 });
    }

    const searchTerm = query.trim();

    // Search for users by name or email
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        profile: {
          select: {
            id: true,
            bio: true,
            address: true,
            profileImg: true,
          }
        }
      },
      take: 10, // Limit results to 10
      orderBy: {
        name: 'asc'
      }
    });

    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile ? {
        id: user.profile.id,
        bio: user.profile.bio,
        address: user.profile.address,
        profileImg: user.profile.profileImg,
      } : null
    }));

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      total: formattedUsers.length
    });

  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
