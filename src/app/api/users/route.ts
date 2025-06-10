import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
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
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
