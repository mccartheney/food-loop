import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email'); // For favorite checking

    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id },
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        items: true,
        favorites: {
          include: {
            user: {
              select: {
                id: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Get current user's profile for favorite checking (if email provided)
    let currentUser = null;
    if (userEmail) {
      currentUser = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { profile: true }
      });
    }

    const steps = typeof recipe.steps === 'string' ? JSON.parse(recipe.steps) : recipe.steps;
    const isFavorited = currentUser?.profile 
      ? recipe.favorites.some(fav => fav.id === currentUser.profile?.id)
      : false;

    const transformedRecipe = {
      id: recipe.id,
      title: recipe.name,
      subtitle: recipe.description,
      imageUrl: recipe.img || '/images/placeholder-recipe.jpg',
      cookTime: extractCookTime(recipe.description),
      difficulty: extractDifficulty(recipe.description) as 'easy' | 'medium' | 'hard',
      servings: extractServings(recipe.description),
      isPopular: recipe.favorites.length >= 2,
      isFavorited,
      category: extractCategory(recipe.description),
      author: recipe.profile?.user.name || 'Unknown',
      authorId: recipe.profile?.user.id,
      ingredients: recipe.items.map(item => item.name),
      steps: Array.isArray(steps) ? steps : [steps],
      favoritesCount: recipe.favorites.length,
      createdAt: recipe.id // Using id as creation indicator for now
    };

    return NextResponse.json({
      success: true,
      recipe: transformedRecipe
    });

  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { email, name, description, steps, ingredients, img, cookTime, difficulty, servings } = body;

    // Validate email is provided
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the recipe and check ownership
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: params.id },
      include: {
        profile: {
          include: {
            user: true
          }
        }
      }
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    if (existingRecipe.profile?.user.email !== email) {
      return NextResponse.json({ error: 'Forbidden: You can only edit your own recipes' }, { status: 403 });
    }

    // Update the recipe
    const updatedRecipe = await prisma.recipe.update({
      where: { id: params.id },
      data: {
        name: name || existingRecipe.name,
        description: description ? `${description} | Tempo: ${cookTime || 30}min | Dificuldade: ${difficulty || 'medium'} | Porções: ${servings || 2}` : existingRecipe.description,
        steps: steps ? JSON.stringify(Array.isArray(steps) ? steps : [steps]) : existingRecipe.steps,
        img: img !== undefined ? img : existingRecipe.img
      },
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        items: true,
        favorites: true
      }
    });

    return NextResponse.json({
      success: true,
      recipe: {
        id: updatedRecipe.id,
        title: updatedRecipe.name,
        subtitle: updatedRecipe.description,
        imageUrl: updatedRecipe.img || '/images/placeholder-recipe.jpg',
        author: updatedRecipe.profile?.user.name || 'Unknown',
        authorId: updatedRecipe.profile?.user.id
      }
    });

  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to update recipe' },
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

    // Find the recipe and check ownership
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: params.id },
      include: {
        profile: {
          include: {
            user: true
          }
        }
      }
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    if (existingRecipe.profile?.user.email !== email) {
      return NextResponse.json({ error: 'Forbidden: You can only delete your own recipes' }, { status: 403 });
    }

    // Delete associated items first
    await prisma.item.deleteMany({
      where: { recipeId: params.id }
    });

    // Delete the recipe
    await prisma.recipe.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Recipe deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    );
  }
}

// Helper functions
function extractCookTime(description: string): number {
  const timePattern = /Tempo:\s*(\d+)\s*min/i;
  const match = description.match(timePattern);
  return match ? parseInt(match[1]) : 30; // Default
}

function extractDifficulty(description: string): string {
  if (description.toLowerCase().includes('fácil') || description.toLowerCase().includes('easy')) return 'easy';
  if (description.toLowerCase().includes('difícil') || description.toLowerCase().includes('hard')) return 'hard';
  return 'medium';
}

function extractServings(description: string): number {
  const servingsPattern = /Porções:\s*(\d+)/i;
  const match = description.match(servingsPattern);
  return match ? parseInt(match[1]) : 2;
}

function extractCategory(description: string): string {
  const categoryPattern = /Categoria:\s*([^|]+)/i;
  const match = description.match(categoryPattern);
  if (match) {
    return match[1].trim();
  }
  
  // Fallback to old method for existing recipes
  if (description.toLowerCase().includes('sobremesa') || description.toLowerCase().includes('dessert')) return 'Sobremesa';
  if (description.toLowerCase().includes('sopa') || description.toLowerCase().includes('soup')) return 'Sopa';
  if (description.toLowerCase().includes('lanche') || description.toLowerCase().includes('snack')) return 'Lanche';
  if (description.toLowerCase().includes('acompanhamento') || description.toLowerCase().includes('side')) return 'Acompanhamento';
  if (description.toLowerCase().includes('entrada')) return 'Entrada';
  return 'Prato Principal';
}
