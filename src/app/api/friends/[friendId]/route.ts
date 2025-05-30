import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE /api/friends/[friendId] - Remove a friend
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ friendId: string }> }
) {
  try {
    const { friendId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!friendId) {
      return NextResponse.json(
        { error: 'Friend ID is required' },
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

    // Find the friend's profile
    const friendProfile = await prisma.profile.findUnique({
      where: { id: friendId },
    });

    if (!friendProfile) {
      return NextResponse.json(
        { error: 'Friend profile not found' },
        { status: 404 }
      );
    }

    // Check if they are actually friends
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

    if (!existingFriendship) {
      return NextResponse.json(
        { error: 'Users are not friends' },
        { status: 400 }
      );
    }

    // Remove bidirectional friendship and any related friend requests
    await prisma.$transaction([
      prisma.profile.update({
        where: { id: userProfile.id },
        data: {
          friends: {
            disconnect: { id: friendProfile.id },
          },
        },
      }),
      prisma.profile.update({
        where: { id: friendProfile.id },
        data: {
          friends: {
            disconnect: { id: userProfile.id },
          },
        },
      }),
      // Also remove any pending friend requests between these users
      prisma.friendRequest.deleteMany({
        where: {
          OR: [
            {
              requesterId: userProfile.id,
              receiverId: friendProfile.id,
            },
            {
              requesterId: friendProfile.id,
              receiverId: userProfile.id,
            },
          ],
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Friend removed successfully',
      removedFriendId: friendId,
    });

  } catch (error) {
    console.error('Error removing friend:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
