import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type FriendshipStatus = 'friend' | 'pending_sent' | 'pending_received' | 'none';

interface UserWithStatus {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string | null;
  profileImg: string | null;
  address: string | null;
  isActive: boolean;
  friendshipStatus: FriendshipStatus;
  requestId?: string; // For pending requests
}

// GET /api/friends/search - Search users or get all users with friendship status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const query = searchParams.get('q'); // Search query (name or email)
    const showAll = searchParams.get('showAll') === 'true'; // Show all users
    const searchUserId = searchParams.get('searchUserId'); // Legacy support

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the current user's profile
    const currentUserProfile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        friends: { select: { id: true } },
      },
    });

    if (!currentUserProfile) {
      return NextResponse.json(
        { error: 'Current user profile not found' },
        { status: 404 }
      );
    }

    // Legacy support for searchUserId parameter
    if (searchUserId) {
      if (userId === searchUserId) {
        return NextResponse.json(
          { error: 'Cannot search for yourself' },
          { status: 400 }
        );
      }

      const searchedUser = await prisma.user.findUnique({
        where: { id: searchUserId },
        include: { profile: true },
      });

      if (!searchedUser || !searchedUser.profile) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const status = await getFriendshipStatus(currentUserProfile.id, searchedUser.profile.id);
      
      return NextResponse.json({
        success: true,
        user: {
          id: searchedUser.profile.id,
          userId: searchedUser.id,
          name: searchedUser.name,
          email: searchedUser.email,
          bio: searchedUser.profile.bio,
          profileImg: searchedUser.profile.profileImg,
          address: searchedUser.profile.address,
          isActive: searchedUser.isActive,
          friendshipStatus: status.status,
          requestId: status.requestId,
        },
      });
    }

    // Get all users or search by query
    const whereCondition: any = {
      id: { not: userId }, // Exclude current user
      isActive: true, // Only active users
    };

    // Add search condition if query is provided
    if (query && query.trim()) {
      whereCondition.OR = [
        { name: { contains: query.trim(), mode: 'insensitive' } },
        { email: { contains: query.trim(), mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where: whereCondition,
      include: {
        profile: true,
      },
      orderBy: { name: 'asc' },
      take: showAll ? undefined : 50, // Limit results if not showing all
    });

    // Filter out users without profiles and get friendship status for each
    const usersWithStatus: UserWithStatus[] = [];
    
    for (const user of users) {
      if (!user.profile) continue;
      
      const status = await getFriendshipStatus(currentUserProfile.id, user.profile.id);
      
      usersWithStatus.push({
        id: user.profile.id,
        userId: user.id,
        name: user.name,
        email: user.email,
        bio: user.profile.bio,
        profileImg: user.profile.profileImg,
        address: user.profile.address,
        isActive: user.isActive,
        friendshipStatus: status.status,
        requestId: status.requestId,
      });
    }

    return NextResponse.json({
      success: true,
      users: usersWithStatus,
      count: usersWithStatus.length,
      isSearch: !!query,
      showAll,
    });

  } catch (error) {
    console.error('Error searching for users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to determine friendship status between two users
async function getFriendshipStatus(currentUserProfileId: string, targetUserProfileId: string): Promise<{
  status: FriendshipStatus;
  requestId?: string;
}> {
  // Check if they are already friends
  const friendship = await prisma.profile.findFirst({
    where: {
      id: currentUserProfileId,
      friends: {
        some: { id: targetUserProfileId },
      },
    },
  });

  if (friendship) {
    return { status: 'friend' };
  }

  // Check for pending friend requests
  const friendRequest = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { requesterId: currentUserProfileId, receiverId: targetUserProfileId },
        { requesterId: targetUserProfileId, receiverId: currentUserProfileId },
      ],
      status: 'PENDING',
    },
  });

  if (friendRequest) {
    if (friendRequest.requesterId === currentUserProfileId) {
      return { status: 'pending_sent', requestId: friendRequest.id };
    } else {
      return { status: 'pending_received', requestId: friendRequest.id };
    }
  }

  return { status: 'none' };
}
