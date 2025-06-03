import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// PUT /api/auth/sync-profile - Sync current session profile image with database
export async function PUT(request: NextRequest) {
  try {
    const { email, name, image } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the user and their profile
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user info if needed
    const updates: any = {};
    if (name && name !== user.name) {
      updates.name = name;
    }

    if (Object.keys(updates).length > 0) {
      await prisma.user.update({
        where: { email },
        data: updates,
      });
    }

    // Update profile image if it's different or missing
    if (user.profile && image && image !== user.profile.profileImg) {
      await prisma.profile.update({
        where: { id: user.profile.id },
        data: {
          profileImg: image,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Profile image updated successfully',
        profileImg: image,
      });
    }

    // If no profile exists, create one
    if (!user.profile && image) {
      await prisma.profile.create({
        data: {
          userId: user.id,
          profileImg: image,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Profile created with image',
        profileImg: image,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile already up to date',
      profileImg: user.profile?.profileImg || null,
    });

  } catch (error) {
    console.error('Error syncing profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
