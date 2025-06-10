import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email is provided
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user's profile
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });

    if (!user?.profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id }
    });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Check if already favorited
    const existingFavorite = await prisma.recipe.findFirst({
      where: {
        id: params.id,
        favorites: {
          some: {
            id: user.profile.id
          }
        }
      }
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Recipe already favorited' },
        { status: 400 }
      );
    }

    // Add to favorites
    await prisma.recipe.update({
      where: { id: params.id },
      data: {
        favorites: {
          connect: { id: user.profile.id }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Recipe added to favorites'
    });

  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    return NextResponse.json(
      { error: 'Failed to add recipe to favorites' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email is provided
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user's profile
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });

    if (!user?.profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id }
    });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Check if favorited
    const existingFavorite = await prisma.recipe.findFirst({
      where: {
        id: params.id,
        favorites: {
          some: {
            id: user.profile.id
          }
        }
      }
    });

    if (!existingFavorite) {
      return NextResponse.json(
        { error: 'Recipe not in favorites' },
        { status: 400 }
      );
    }

    // Remove from favorites
    await prisma.recipe.update({
      where: { id: params.id },
      data: {
        favorites: {
          disconnect: { id: user.profile.id }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Recipe removed from favorites'
    });

  } catch (error) {
    console.error('Error removing recipe from favorites:', error);
    return NextResponse.json(
      { error: 'Failed to remove recipe from favorites' },
      { status: 500 }
    );
  }
}
