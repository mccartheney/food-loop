import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');
    const cookTime = searchParams.get('cookTime');
    const servings = searchParams.get('servings');
    const quickFilter = searchParams.get('quickFilter'); // popular, quick, easy, top-rated
    const userId = searchParams.get('userId'); // For getting user's recipes
    const userEmail = searchParams.get('email'); // For favorite checking

    // Build filter conditions
    const where: any = {};

    if (category) {
      where.description = {
        contains: category,
        mode: 'insensitive'
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (difficulty) {
      where.description = {
        ...where.description,
        contains: difficulty === 'easy' ? 'fácil' : difficulty === 'hard' ? 'difícil' : 'médio',
        mode: 'insensitive'
      };
    }

    if (userId) {
      // Find user's profile first
      const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true }
      });

      if (userProfile?.profile) {
        where.profileId = userProfile.profile.id;
      }
    }

    const recipes = await prisma.recipe.findMany({
      where,
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

    // Get current user's profile for favorite checking (if email provided)
    let currentUser = null;
    if (userEmail) {
      currentUser = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { profile: true }
      });
    }

    // Transform recipes to match frontend interface
    let transformedRecipes = recipes.map(recipe => {
      const steps = typeof recipe.steps === 'string' ? JSON.parse(recipe.steps) : recipe.steps;
      const isFavorited = currentUser?.profile 
        ? recipe.favorites.some(fav => fav.id === currentUser.profile?.id)
        : false;

      return {
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
        favoritesCount: recipe.favorites.length
      };
    });

    // Apply frontend filters
    if (cookTime) {
      const [min, max] = cookTime.split('-').map(Number);
      transformedRecipes = transformedRecipes.filter(recipe => 
        max ? recipe.cookTime >= min && recipe.cookTime <= max : recipe.cookTime >= min
      );
    }

    if (servings) {
      const [min, max] = servings.split('-').map(Number);
      transformedRecipes = transformedRecipes.filter(recipe => 
        max ? recipe.servings >= min && recipe.servings <= max : recipe.servings >= min
      );
    }

    if (quickFilter) {
      switch (quickFilter) {
        case 'popular':
          transformedRecipes = transformedRecipes.filter(recipe => recipe.isPopular);
          break;
        case 'quick':
          transformedRecipes = transformedRecipes.filter(recipe => recipe.cookTime <= 20);
          break;
        case 'easy':
          transformedRecipes = transformedRecipes.filter(recipe => recipe.difficulty === 'easy');
          break;
        case 'top-rated':
          transformedRecipes = transformedRecipes.filter(recipe => recipe.favoritesCount > 0);
          break;
      }
    }

    console.log(transformedRecipes)
    return NextResponse.json({
      success: true,
      recipes: transformedRecipes
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, description, steps, ingredients, img, cookTime, difficulty, servings, category } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!name || !description || !steps) {
      return NextResponse.json(
        { error: 'Name, description, and steps are required' },
        { status: 400 }
      );
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

    // Create the recipe
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description: `${description} | Categoria: ${category || 'Prato Principal'} | Tempo: ${cookTime || 30}min | Dificuldade: ${difficulty || 'medium'} | Porções: ${servings || 2}`,
        steps: JSON.stringify(Array.isArray(steps) ? steps : [steps]),
        img: img || null,
        profileId: user.profile.id
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

    // If ingredients are provided, create items for the recipe
    if (ingredients && Array.isArray(ingredients)) {
      const itemsData = ingredients.map(ingredient => ({
        name: ingredient.name || ingredient,
        type: 'VEGETABLES' as const, // Default type
        quantity: parseInt(ingredient.quantity) || 1,
        dateBought: new Date(),
        expireDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        recipeId: recipe.id
      }));

      await prisma.item.createMany({
        data: itemsData
      });
    }

    return NextResponse.json({
      success: true,
      recipe: {
        id: recipe.id,
        title: recipe.name,
        subtitle: recipe.description,
        imageUrl: recipe.img || '/images/placeholder-recipe.jpg',
        author: recipe.profile?.user.name || 'Unknown',
        authorId: recipe.profile?.user.id
      }
    });

  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to create recipe' },
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
