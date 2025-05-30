import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface FriendRequestResponse {
  id: string;
  receiverId?: string;
  receiverName?: string;
  receiverEmail?: string;
  receiverBio?: string | null;
  receiverProfileImg?: string | null;
  requesterId?: string;
  requesterName?: string;
  requesterEmail?: string;
  requesterBio?: string | null;
  requesterProfileImg?: string | null;
  status: string;
  createdAt: Date;
  type: 'sent' | 'received';
}

// GET /api/friends/requests - Get user's friend requests (sent and received)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'sent' | 'received' | 'all'

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

    let sentRequests: FriendRequestResponse[] = [];
    let receivedRequests: FriendRequestResponse[] = [];

    if (type === 'sent' || type === 'all' || !type) {
      // Get sent requests
      const sent = await prisma.friendRequest.findMany({
        where: {
          requesterId: userProfile.id,
          status: 'PENDING',
        },
        include: {
          receiver: {
            select: {
              id: true,
              bio: true,
              profileImg: true,
              address: true,
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
        orderBy: {
          createdAt: 'desc',
        },
      });

      sentRequests = sent.map(request => ({
        id: request.id,
        receiverId: request.receiverId,
        receiverName: request.receiver.user.name,
        receiverEmail: request.receiver.user.email,
        receiverBio: request.receiver.bio,
        receiverProfileImg: request.receiver.profileImg,
        status: request.status,
        createdAt: request.createdAt,
        type: 'sent',
      }));
    }

    if (type === 'received' || type === 'all' || !type) {
      // Get received requests
      const received = await prisma.friendRequest.findMany({
        where: {
          receiverId: userProfile.id,
          status: 'PENDING',
        },
        include: {
          requester: {
            select: {
              id: true,
              bio: true,
              profileImg: true,
              address: true,
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
        orderBy: {
          createdAt: 'desc',
        },
      });

      receivedRequests = received.map(request => ({
        id: request.id,
        requesterId: request.requesterId,
        requesterName: request.requester.user.name,
        requesterEmail: request.requester.user.email,
        requesterBio: request.requester.bio,
        requesterProfileImg: request.requester.profileImg,
        status: request.status,
        createdAt: request.createdAt,
        type: 'received',
      }));
    }

    return NextResponse.json({
      success: true,
      sentRequests,
      receivedRequests,
      counts: {
        sent: sentRequests.length,
        received: receivedRequests.length,
        total: sentRequests.length + receivedRequests.length,
      },
    });

  } catch (error) {
    console.error('Error fetching friend requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/friends/requests - Accept or reject a friend request
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, requestId, action } = body; // action: 'accept' | 'reject'

    if (!userId || !requestId || !action) {
      return NextResponse.json(
        { error: 'userId, requestId, and action are required' },
        { status: 400 }
      );
    }

    if (!['accept', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be either "accept" or "reject"' },
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

    // Find the friend request
    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: requestId },
      include: {
        requester: {
          select: {
            id: true,
            userId: true,
            bio: true,
            profileImg: true,
            address: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            userId: true,
            bio: true,
            profileImg: true,
            address: true,
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

    if (!friendRequest) {
      return NextResponse.json(
        { error: 'Friend request not found' },
        { status: 404 }
      );
    }

    // Verify that the current user is the receiver of this request
    if (friendRequest.receiverId !== userProfile.id) {
      return NextResponse.json(
        { error: 'You are not authorized to respond to this friend request' },
        { status: 403 }
      );
    }

    // Check if request is still pending
    if (friendRequest.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Friend request has already been ${friendRequest.status.toLowerCase()}` },
        { status: 400 }
      );
    }

    if (action === 'accept') {
      // Accept the friend request - create friendship and update request status
      await prisma.$transaction([
        // Update the friend request status
        prisma.friendRequest.update({
          where: { id: requestId },
          data: { status: 'ACCEPTED' },
        }),
        // Create bidirectional friendship
        prisma.profile.update({
          where: { id: friendRequest.receiverId },
          data: {
            friends: {
              connect: { id: friendRequest.requesterId },
            },
          },
        }),
        prisma.profile.update({
          where: { id: friendRequest.requesterId },
          data: {
            friends: {
              connect: { id: friendRequest.receiverId },
            },
          },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: 'Friend request accepted successfully',
        newFriend: {
          id: friendRequest.requester.id,
          userId: friendRequest.requester.userId,
          name: friendRequest.requester.user.name,
          email: friendRequest.requester.user.email,
          bio: friendRequest.requester.bio,
          profileImg: friendRequest.requester.profileImg,
          address: friendRequest.requester.address,
        },
      });
    } else {
      // Reject the friend request
      await prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: 'REJECTED' },
      });

      return NextResponse.json({
        success: true,
        message: 'Friend request rejected successfully',
        rejectedRequest: {
          id: friendRequest.id,
          requesterName: friendRequest.requester.user.name,
        },
      });
    }

  } catch (error) {
    console.error('Error handling friend request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/friends/requests - Cancel a sent friend request
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const requestId = searchParams.get('requestId');

    if (!userId || !requestId) {
      return NextResponse.json(
        { error: 'userId and requestId are required' },
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

    // Find the friend request
    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!friendRequest) {
      return NextResponse.json(
        { error: 'Friend request not found' },
        { status: 404 }
      );
    }

    // Verify that the current user is the requester (can only cancel own requests)
    if (friendRequest.requesterId !== userProfile.id) {
      return NextResponse.json(
        { error: 'You can only cancel your own friend requests' },
        { status: 403 }
      );
    }

    // Check if request is still pending
    if (friendRequest.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Cannot cancel a friend request that has been ${friendRequest.status.toLowerCase()}` },
        { status: 400 }
      );
    }

    // Delete the friend request
    await prisma.friendRequest.delete({
      where: { id: requestId },
    });

    return NextResponse.json({
      success: true,
      message: 'Friend request cancelled successfully',
      cancelledRequestId: requestId,
    });

  } catch (error) {
    console.error('Error cancelling friend request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
