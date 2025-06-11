import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface HistoryActivity {
  id: string;
  type: 'TRADE_CREATED' | 'TRADE_COMPLETED' | 'ITEM_ADDED' | 'RECIPE_CREATED' | 'FRIEND_ADDED' | 'FRIEND_REQUEST_SENT';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  metadata: {
    itemName?: string;
    itemQuantity?: number;
    tradeName?: string;
    tradeId?: string;
    recipeName?: string;
    recipeId?: string;
    friendName?: string;
    friendId?: string;
    [key: string]: any;
  };
}

export interface HistoryResponse {
  activities: HistoryActivity[];
  total: number;
  hasMore: boolean;
  summary: {
    trades: number;
    items: number;
    recipes: number;
    friends: number;
  };
}

interface UseHistoryOptions {
  type?: string;
  days?: number;
  limit?: number;
  autoFetch?: boolean;
}

export function useHistory(options: UseHistoryOptions = {}) {
  const {
    type = 'all',
    days = 30,
    limit = 20,
    autoFetch = true
  } = options;

  const [data, setData] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const fetchHistory = async (offset = 0, reset = false) => {
    if (!session?.user?.email) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        email: session.user.email,
        type,
        days: days.toString(),
        limit: limit.toString(),
        offset: offset.toString()
      });

      const response = await fetch(`/api/history?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const newData = await response.json();

      if (reset || offset === 0) {
        setData(newData);
      } else {
        setData(prev => prev ? {
          ...newData,
          activities: [...prev.activities, ...newData.activities]
        } : newData);
      }

    } catch (err) {
      console.error('Error fetching history:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => fetchHistory(0, true);
  
  const loadMore = () => {
    if (data && data.hasMore) {
      fetchHistory(data.activities.length, false);
    }
  };

  useEffect(() => {
    if (autoFetch && session?.user?.email) {
      fetchHistory(0, true);
    }
  }, [session, type, days, autoFetch]);

  return {
    data,
    loading,
    error,
    refresh,
    loadMore,
    fetchHistory
  };
}

// Helper functions for formatting
export function formatTimeAgo(timestamp: Date): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'agora';
  if (diffInHours < 24) return `${diffInHours}h atrás`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'ontem';
  if (diffInDays < 7) return `${diffInDays} dias atrás`;
  
  return date.toLocaleDateString('pt-PT');
}

export function getActivityTypeColor(type: string): string {
  switch (type) {
    case 'TRADE_CREATED': 
    case 'TRADE_COMPLETED': return 'bg-blue-500';
    case 'ITEM_ADDED': return 'bg-green-500';
    case 'RECIPE_CREATED': return 'bg-purple-500';
    case 'FRIEND_ADDED': 
    case 'FRIEND_REQUEST_SENT': return 'bg-orange-500';
    default: return 'bg-gray-400';
  }
}

export function getActivityTypeBadgeColor(type: string): string {
  switch (type) {
    case 'TRADE_CREATED': 
    case 'TRADE_COMPLETED': return 'bg-blue-100 text-blue-700';
    case 'ITEM_ADDED': return 'bg-green-100 text-green-700';
    case 'RECIPE_CREATED': return 'bg-purple-100 text-purple-700';
    case 'FRIEND_ADDED': 
    case 'FRIEND_REQUEST_SENT': return 'bg-orange-100 text-orange-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}
