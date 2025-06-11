'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiClock, 
  FiFilter, 
  FiSearch, 
  FiCalendar, 
  FiArrowLeft,
  FiRefreshCw,
  FiTrendingUp,
  FiActivity
} from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface HistoryActivity {
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

interface HistoryResponse {
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

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchHistory = async (reset = false) => {
    if (!session?.user?.email) return;

    try {
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const offset = reset ? 0 : (historyData?.activities.length || 0);
      const response = await fetch(
        `/api/history?email=${encodeURIComponent(session.user.email)}&type=${selectedType}&days=${selectedDays}&limit=20&offset=${offset}`
      );

      if (response.ok) {
        const data = await response.json();
        if (reset) {
          setHistoryData(data);
        } else {
          setHistoryData(prev => prev ? {
            ...data,
            activities: [...prev.activities, ...data.activities]
          } : data);
        }
      } else {
        console.error('Failed to fetch history');
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchHistory(true);
  }, [session, selectedType, selectedDays]);

  const filteredActivities = historyData?.activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatDateTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Ontem';
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'TRADE_CREATED': 
      case 'TRADE_COMPLETED': return 'bg-blue-500';
      case 'ITEM_ADDED': return 'bg-green-500';
      case 'RECIPE_CREATED': return 'bg-purple-500';
      case 'FRIEND_ADDED': 
      case 'FRIEND_REQUEST_SENT': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'TRADE_CREATED': 
      case 'TRADE_COMPLETED': return 'bg-blue-100 text-blue-700';
      case 'ITEM_ADDED': return 'bg-green-100 text-green-700';
      case 'RECIPE_CREATED': return 'bg-purple-100 text-purple-700';
      case 'FRIEND_ADDED': 
      case 'FRIEND_REQUEST_SENT': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleActivityClick = (activity: HistoryActivity) => {
    switch (activity.type) {
      case 'TRADE_CREATED':
      case 'TRADE_COMPLETED':
        if (activity.metadata.tradeId) {
          router.push(`/app/marketplace/${activity.metadata.tradeId}`);
        }
        break;
      case 'RECIPE_CREATED':
        if (activity.metadata.recipeId) {
          router.push(`/app/recipes/${activity.metadata.recipeId}`);
        }
        break;
      case 'ITEM_ADDED':
        router.push('/app/pantry');
        break;
      case 'FRIEND_ADDED':
      case 'FRIEND_REQUEST_SENT':
        router.push('/app/friends');
        break;
    }
  };

  const typeOptions = [
    { value: 'all', label: 'Todas as Atividades', icon: '📊' },
    { value: 'trades', label: 'Trades', icon: '🤝' },
    { value: 'items', label: 'Items da Despensa', icon: '📦' },
    { value: 'recipes', label: 'Receitas', icon: '👨‍🍳' },
    { value: 'friends', label: 'Amigos', icon: '👥' }
  ];

  const dayOptions = [
    { value: 7, label: 'Última semana' },
    { value: 30, label: 'Último mês' },
    { value: 90, label: 'Últimos 3 meses' },
    { value: 365, label: 'Último ano' }
  ];

  return (
    <DashboardLayout>
      <motion.div 
        className="container mx-auto p-4 md:p-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft size={20} className="text-gray-600" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FiClock className="text-orange-600" />
                Histórico de Atividades
              </h1>
              <p className="text-gray-600">Acompanhe todas as suas ações na plataforma</p>
            </div>
          </div>

          <motion.button
            onClick={() => fetchHistory(true)}
            disabled={loading}
            className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </motion.button>
        </motion.div>

        {/* Summary Stats */}
        {historyData?.summary && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🤝</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Trades</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{historyData.summary.trades}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">📦</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Items</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{historyData.summary.items}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">👨‍🍳</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Receitas</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{historyData.summary.recipes}</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">👥</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Amigos</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{historyData.summary.friends}</div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Pesquisar atividades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="md:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div className="md:w-40">
              <select
                value={selectedDays}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {dayOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Activities Timeline */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow-sm border text-center">
              <FiActivity size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma atividade encontrada</h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? 'Tente ajustar os filtros ou termo de pesquisa'
                  : 'Suas atividades aparecerão aqui conforme você usar a plataforma'
                }
              </p>
            </div>
          ) : (
            <>
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-12 h-12 ${getTypeColor(activity.type)} rounded-xl flex items-center justify-center text-white shadow-sm`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-lg">{activity.icon}</span>
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(activity.type)}`}>
                          {activity.type.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{activity.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          <span>{formatDateTime(activity.timestamp)}</span>
                        </div>
                        
                        {activity.metadata.itemQuantity && (
                          <div className="flex items-center gap-1">
                            <span>Quantidade: {activity.metadata.itemQuantity}</span>
                          </div>
                        )}
                        
                        {activity.metadata.favoritesCount !== undefined && (
                          <div className="flex items-center gap-1">
                            <span>❤️ {activity.metadata.favoritesCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Load More Button */}
              {historyData?.hasMore && (
                <motion.div 
                  className="text-center pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={() => fetchHistory(false)}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loadingMore ? (
                      <div className="flex items-center gap-2">
                        <FiRefreshCw size={16} className="animate-spin" />
                        Carregando...
                      </div>
                    ) : (
                      'Carregar Mais'
                    )}
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
