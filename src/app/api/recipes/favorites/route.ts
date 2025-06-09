import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

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

    // Get user's favorite recipes
    const favoriteRecipes = await prisma.recipe.findMany({
      where: {
        favorites: {
          some: {
            id: user.profile.id
          }
        }
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
      },
      orderBy: {
        id: 'desc'
      }
    });

    // Transform recipes to match frontend interface
    const transformedRecipes = favoriteRecipes.map(recipe => {
      const steps = typeof recipe.steps === 'string' ? JSON.parse(recipe.steps) : recipe.steps;

      return {
        id: recipe.id,
        title: recipe.name,
        subtitle: recipe.description,
        imageUrl: recipe.img || '/images/placeholder-recipe.jpg',
        cookTime: extractCookTime(steps),
        rating: 85, // Default rating for now
        difficulty: extractDifficulty(recipe.description) as 'easy' | 'medium' | 'hard',
        servings: extractServings(recipe.description),
        isPopular: recipe.favorites.length > 2,
        isFavorited: true, // All recipes in this list are favorited
        category: extractCategory(recipe.description),
        author: recipe.profile?.user.name || 'Unknown',
        authorId: recipe.profile?.user.id,
        ingredients: recipe.items.map(item => item.name),
        steps: Array.isArray(steps) ? steps : [steps],
        favoritesCount: recipe.favorites.length
      };
    });

    return NextResponse.json({
      success: true,
      recipes: transformedRecipes,
      count: transformedRecipes.length
    });

  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favorite recipes' },
      { status: 500 }
    );
  }
}

// Helper functions
function extractCookTime(steps: any): number {
  if (Array.isArray(steps)) {
    const timePattern = /(\d+)\s*(min|minutos?|minutes?)/i;
    for (const step of steps) {
      const match = step.match?.(timePattern);
      if (match) return parseInt(match[1]);
    }
  }
  return 30; // Default
}

function extractDifficulty(description: string): string {
  if (description.toLowerCase().includes('fácil') || description.toLowerCase().includes('easy')) return 'easy';
  if (description.toLowerCase().includes('difícil') || description.toLowerCase().includes('hard')) return 'hard';
  return 'medium';
}

function extractServings(description: string): number {
  const servingsPattern = /(\d+)\s*(porções?|servings?)/i;
  const match = description.match(servingsPattern);
  return match ? parseInt(match[1]) : 2;
}

function extractCategory(description: string): string {
  if (description.toLowerCase().includes('sobremesa') || description.toLowerCase().includes('dessert')) return 'Sobremesa';
  if (description.toLowerCase().includes('sopa') || description.toLowerCase().includes('soup')) return 'Sopa';
  if (description.toLowerCase().includes('lanche') || description.toLowerCase().includes('snack')) return 'Lanche';
  if (description.toLowerCase().includes('acompanhamento') || description.toLowerCase().includes('side')) return 'Acompanhamento';
  return 'Prato Principal';
}
