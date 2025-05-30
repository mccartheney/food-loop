import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/friends/search?userId=xxx&searchUserId=yyy - Search for user by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const searchUserId = searchParams.get('searchUserId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!searchUserId) {
      return NextResponse.json(
        { error: 'Search User ID is required' },
        { status: 400 }
      );
    }

    if (userId === searchUserId) {
      return NextResponse.json(
        { error: 'Cannot search for yourself' },
        { status: 400 }
      );
    }

    // Find the current user's profile
    const currentUserProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!currentUserProfile) {
      return NextResponse.json(
        { error: 'Current user profile not found' },
        { status: 404 }
      );
    }

    // Find the searched user
    const searchedUser = await prisma.user.findUnique({
      where: { id: searchUserId },
      include: {
        profile: true,
      },
    });

    if (!searchedUser || !searchedUser.profile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if they are already friends
    const existingFriendship = await prisma.profile.findFirst({
      where: {
        id: currentUserProfile.id,
        friends: {
          some: {
            id: searchedUser.profile.id,
          },
        },
      },
    });

    if (existingFriendship) {
      return NextResponse.json(
        { error: 'User is already your friend' },
        { status: 400 }
      );
    }

    // Return the user profile if eligible to be added as friend
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
      },
    });

  } catch (error) {
    console.error('Error searching for user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
