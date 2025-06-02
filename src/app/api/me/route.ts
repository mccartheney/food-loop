import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  console.log(email);
  try {
    // Find profile by user email and include all relationships
    const profile = await prisma.profile.findFirst({
      where: {
        user: {
          email: email
        }
      },
      include: {
        user: true,
        pantry: {
          include: {
            items: true,
          },
        },
        friends: {
          include: {
            user: true,
          },
        },
        friendOf: {
          include: {
            user: true,
          },
        },
        recipes: true,
        favoriteRecipes: true,
        favoriteBoxes: true,
        orders: true,
        history: true,
      },
    });

    console.log(profile);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Format dates for items if pantry exists
    if (profile.pantry && profile.pantry.items) {
      profile.pantry.items = profile.pantry.items.map(item => ({
        ...item,
        dateBought: item.dateBought.toISOString().split('T')[0],
        expireDate: item.expireDate.toISOString().split('T')[0],
      }));
    }

    console.log('Profile data:', profile);
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find profile by user email and include all relationships
    const profile = await prisma.profile.findFirst({
      where: {
        user: {
          email: email
        }
      },
      include: {
        user: true,
        pantry: {
          include: {
            items: true,
          },
        },
        friends: {
          include: {
            user: true,
          },
        },
        friendOf: {
          include: {
            user: true,
          },
        },
        recipes: true,
        favoriteRecipes: true,
        favoriteBoxes: true,
        orders: true,
        history: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Format dates for items if pantry exists
    if (profile.pantry && profile.pantry.items) {
      profile.pantry.items = profile.pantry.items.map(item => ({
        ...item,
        dateBought: item.dateBought.toISOString().split('T')[0],
        expireDate: item.expireDate.toISOString().split('T')[0],
      }));
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
