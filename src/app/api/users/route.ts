import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (userId) {
      // Get specific user by ID
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: {
            select: {
              id: true,
              bio: true,
              profileImg: true,
              isOnline: true,
              lastSeenAt: true
            }
          }
        }
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const formattedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        profileId: user.profile?.id,
        bio: user.profile?.bio,
        profileImg: user.profile?.profileImg,
        isOnline: user.profile?.isOnline || false,
        lastSeenAt: user.profile?.lastSeenAt
      };

      return NextResponse.json({
        success: true,
        user: formattedUser
      });
    } else {
      // Get all users (existing functionality)
      const users = await prisma.user.findMany({
        include: {
          profile: {
            select: {
              id: true,
              bio: true,
              profileImg: true,
              isOnline: true,
              lastSeenAt: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });

      const formattedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        profileId: user.profile?.id,
        bio: user.profile?.bio,
        profileImg: user.profile?.profileImg,
        isOnline: user.profile?.isOnline || false,
        lastSeenAt: user.profile?.lastSeenAt
      }));

      return NextResponse.json({
        success: true,
        users: formattedUsers
      });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
