import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';

export interface SearchResult {
  type: 'recipe' | 'pantry_item';
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  metadata: any;
}

interface UseSearchOptions {
  category: 'all' | 'pantry' | 'recipes' | 'boxes' | 'history';
  minLength: number;
  debounceMs: number;
}

export const useSearch = (
  query: string, 
  options: UseSearchOptions = {
    category: 'all',
    minLength: 2,
    debounceMs: 300
  }
) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  // Debounce function
  const debouncedQuery = useMemo(() => {
    const timer = setTimeout(() => query, options.debounceMs);
    return () => clearTimeout(timer);
  }, [query, options.debounceMs]);

  useEffect(() => {
    const searchFunction = async () => {
      // Reset states
      setError(null);
      
      // Don't search if query is too short or no session
      if (query.length < options.minLength || !session?.user?.email) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const searchResults: SearchResult[] = [];

        // Search in recipes if category allows
        if (options.category === 'all' || options.category === 'recipes') {
          const recipesResponse = await fetch(
            `/api/recipes?search=${encodeURIComponent(query)}&email=${encodeURIComponent(session.user.email)}`
          );
          
          if (recipesResponse.ok) {
            const recipesData = await recipesResponse.json();
            
            if (recipesData.success && recipesData.recipes) {
              const recipeResults: SearchResult[] = recipesData.recipes.slice(0, 5).map((recipe: any) => ({
                type: 'recipe' as const,
                id: recipe.id,
                title: recipe.title,
                subtitle: `${recipe.cookTime}min • ${recipe.difficulty} • ${recipe.servings} porções`,
                image: recipe.imageUrl,
                metadata: {
                  cookTime: recipe.cookTime,
                  difficulty: recipe.difficulty,
                  servings: recipe.servings,
                  category: recipe.category,
                  ingredients: recipe.ingredients,
                  author: recipe.author
                }
              }));
              
              searchResults.push(...recipeResults);
            }
          }
        }

        // Search in pantry if category allows
        if (options.category === 'all' || options.category === 'pantry') {
          const pantryResponse = await fetch(
            `/api/pantry?email=${encodeURIComponent(session.user.email)}`
          );
          
          if (pantryResponse.ok) {
            const pantryData = await pantryResponse.json();
            
            if (pantryData.items) {
              // Filter items that match the search query
              const filteredItems = pantryData.items.filter((item: any) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.type.toLowerCase().includes(query.toLowerCase())
              );

              const pantryResults: SearchResult[] = filteredItems.slice(0, 5).map((item: any) => ({
                type: 'pantry_item' as const,
                id: item.id,
                title: item.name,
                subtitle: `${item.quantity}x • ${item.type} • Vence: ${new Date(item.expire_date).toLocaleDateString('pt-PT')}`,
                metadata: {
                  quantity: item.quantity,
                  type: item.type,
                  expireDate: item.expire_date,
                  dateBought: item.dateBought
                }
              }));
              
              searchResults.push(...pantryResults);
            }
          }
        }

        setResults(searchResults);
      } catch (err) {
        console.error('Search error:', err);
        setError('Erro ao buscar resultados');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(searchFunction, options.debounceMs);
    
    return () => clearTimeout(timeoutId);
  }, [query, options.category, options.minLength, options.debounceMs, session]);

  return {
    results,
    loading,
    error,
    hasResults: results.length > 0
  };
};
