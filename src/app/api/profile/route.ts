import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/profile - Get profile by email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const profile = await prisma.profile.findFirst({
      where: {
        user: {
          email: email
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        friends: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        },
        _count: {
          select: {
            friends: true,
            recipes: true,
          }
        }
      },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        userId: profile.userId,
        bio: profile.bio,
        address: profile.address,
        profileImg: profile.profileImg,
        user: profile.user,
        friends: profile.friends.map(friend => ({
          id: friend.id,
          userId: friend.userId,
          name: friend.user.name,
          email: friend.user.email,
          bio: friend.bio,
          profileImg: friend.profileImg,
          address: friend.address,
        })),
        counts: {
          friends: profile._count.friends,
          recipes: profile._count.recipes,
        }
      }
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/profile - Update profile data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, bio, address, profileImg } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate input lengths
    if (bio && bio.length > 500) {
      return NextResponse.json({ error: 'Bio cannot exceed 500 characters' }, { status: 400 });
    }

    if (address && address.length > 200) {
      return NextResponse.json({ error: 'Address cannot exceed 200 characters' }, { status: 400 });
    }

    // Find the user's profile
    const existingProfile = await prisma.profile.findFirst({
      where: {
        user: {
          email: email
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (!existingProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Update the profile
    const updatedProfile = await prisma.profile.update({
      where: {
        id: existingProfile.id
      },
      data: {
        bio: bio?.trim() || existingProfile.bio,
        address: address?.trim() || existingProfile.address,
        profileImg: profileImg || existingProfile.profileImg,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        friends: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        },
        _count: {
          select: {
            friends: true,
            recipes: true,
          }
        }
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      profile: {
        id: updatedProfile.id,
        userId: updatedProfile.userId,
        bio: updatedProfile.bio,
        address: updatedProfile.address,
        profileImg: updatedProfile.profileImg,
        user: updatedProfile.user,
        friends: updatedProfile.friends.map(friend => ({
          id: friend.id,
          userId: friend.userId,
          name: friend.user.name,
          email: friend.user.email,
          bio: friend.bio,
          profileImg: friend.profileImg,
          address: friend.address,
        })),
        counts: {
          friends: updatedProfile._count.friends,
          recipes: updatedProfile._count.recipes,
        }
      }
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
