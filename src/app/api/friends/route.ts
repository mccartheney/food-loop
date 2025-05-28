import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/friends - Get user's friends list
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the user's profile
    const userProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Get all friends
    const friends = await prisma.profile.findUnique({
      where: { id: userProfile.id },
      include: {
        friends: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const friendsList = friends?.friends.map(friend => ({
      id: friend.id,
      userId: friend.userId,
      name: friend.user.name,
      email: friend.user.email,
      bio: friend.bio,
      profileImg: friend.profileImg,
      address: friend.address,
    })) || [];

    return NextResponse.json({
      success: true,
      friends: friendsList,
      count: friendsList.length,
    });

  } catch (error) {
    console.error('Error fetching friends:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/friends - Add a friend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, friendUserId } = body;

    if (!userId || !friendUserId) {
      return NextResponse.json(
        { error: 'Both userId and friendUserId are required' },
        { status: 400 }
      );
    }

    if (userId === friendUserId) {
      return NextResponse.json(
        { error: 'Cannot add yourself as a friend' },
        { status: 400 }
      );
    }

    // Find both user profiles
    const [userProfile, friendProfile] = await Promise.all([
      prisma.profile.findUnique({ where: { userId } }),
      prisma.profile.findUnique({ where: { userId: friendUserId } }),
    ]);

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    if (!friendProfile) {
      return NextResponse.json(
        { error: 'Friend profile not found' },
        { status: 404 }
      );
    }

    // Check if they are already friends
    const existingFriendship = await prisma.profile.findFirst({
      where: {
        id: userProfile.id,
        friends: {
          some: {
            id: friendProfile.id,
          },
        },
      },
    });

    if (existingFriendship) {
      return NextResponse.json(
        { error: 'Users are already friends' },
        { status: 400 }
      );
    }

    // Create bidirectional friendship
    await prisma.$transaction([
      prisma.profile.update({
        where: { id: userProfile.id },
        data: {
          friends: {
            connect: { id: friendProfile.id },
          },
        },
      }),
      prisma.profile.update({
        where: { id: friendProfile.id },
        data: {
          friends: {
            connect: { id: userProfile.id },
          },
        },
      }),
    ]);

    // Get the friend's details to return
    const friendDetails = await prisma.profile.findUnique({
      where: { id: friendProfile.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Friend added successfully',
      friend: {
        id: friendDetails?.id,
        userId: friendDetails?.userId,
        name: friendDetails?.user.name,
        email: friendDetails?.user.email,
        bio: friendDetails?.bio,
        profileImg: friendDetails?.profileImg,
        address: friendDetails?.address,
      },
    });

  } catch (error) {
    console.error('Error adding friend:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
