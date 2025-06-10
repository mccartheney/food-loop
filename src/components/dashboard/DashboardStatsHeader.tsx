'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiHome, FiPackage, FiBookOpen, FiBox, FiActivity, FiTrendingUp } from 'react-icons/fi';
import styles from '../../app/app/styles.module.css';

interface DashboardStats {
  pantryItems: number;
  availableRecipes: number;
  recentActivity: number;
  economySaved: number;
}

const DashboardStatsHeader: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    pantryItems: 0,
    availableRecipes: 0,
    recentActivity: 0,
    economySaved: 0
  });
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        // Fetch pantry items count
        const pantryResponse = await fetch(`/api/pantry?email=${encodeURIComponent(session.user.email)}`);
        const pantryData = await pantryResponse.json();
        const pantryItemsCount = pantryData.items ? pantryData.items.length : 0;

        // Fetch recipes count
        const recipesResponse = await fetch(`/api/recipes?email=${encodeURIComponent(session.user.email)}`);
        const recipesData = await recipesResponse.json();
        const recipesCount = recipesData.recipes ? recipesData.recipes.length : 0;

        // Calculate recent activity (last 7 days)
        const recentActivityCount = pantryData.items ? 
          pantryData.items.filter((item: any) => {
            const itemDate = new Date(item.dateBought);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return itemDate >= sevenDaysAgo;
          }).length : 0;

        // Calculate estimated economy (basic calculation)
        const estimatedEconomy = pantryItemsCount * 2.5; // €2.5 per item saved from waste

        setStats({
          pantryItems: pantryItemsCount,
          availableRecipes: recipesCount,
          recentActivity: recentActivityCount + recipesCount, // Add recent recipes
          economySaved: estimatedEconomy
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [session]);

  const statsConfig = [
    {
      id: 'pantry',
      label: 'Itens na Despensa',
      value: loading ? '...' : stats.pantryItems,
      subValue: 'Produtos disponíveis',
      icon: FiPackage,
      color: 'text-blue-600',
      bgClass: styles.statsPantry,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'recipes',
      label: 'Receitas Disponíveis',
      value: loading ? '...' : stats.availableRecipes,
      subValue: 'Criadas por você',
      icon: FiBookOpen,
      color: 'text-purple-600',
      bgClass: styles.statsRecipes,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'activity',
      label: 'Atividade Recente',
      value: loading ? '...' : stats.recentActivity,
      subValue: 'Últimos 7 dias',
      icon: FiActivity,
      color: 'text-orange-600',
      bgClass: styles.statsActivity,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'economy',
      label: 'Economia Estimada',
      value: loading ? '...' : `€${stats.economySaved.toFixed(2)}`,
      subValue: 'Desperdício evitado',
      icon: FiTrendingUp,
      color: 'text-emerald-600',
      bgClass: styles.statsEconomy,
      gradient: 'from-emerald-500 to-emerald-600'
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getUserName = () => {
    if (session?.user?.name) {
      const firstName = session.user.name.split(' ')[0];
      return firstName;
    }
    return 'Usuário';
  };

  return (
    <motion.header 
      className={`${styles.headerGlass} rounded-2xl p-6 mb-6`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className={`text-3xl font-bold ${styles.gradientText} mb-2 flex items-center gap-3`}>
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <FiHome className="text-blue-500" />
            </motion.div>
            {getGreeting()}, {getUserName()}!
          </h1>
          <p className="text-gray-600">
            Aqui está um resumo da sua atividade no FoodLoop
          </p>
        </div>
        
        {/* Quick Summary */}
        <motion.div 
          className="flex items-center gap-4 mt-4 lg:mt-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {loading ? '...' : stats.pantryItems}
            </div>
            <div className="text-xs text-gray-600">Itens</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {loading ? '...' : stats.availableRecipes}
            </div>
            <div className="text-xs text-gray-600">Receitas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {loading ? '...' : `€${stats.economySaved.toFixed(2)}`}
            </div>
            <div className="text-xs text-gray-600">Economia</div>
          </div>
        </motion.div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.id}
            className={`${styles.statsCard} ${stat.bgClass} rounded-xl p-4 text-center`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1 + 0.5, 
              duration: 0.4,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${stat.gradient} text-white mb-3`}
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <stat.icon size={20} />
            </motion.div>
            
            <motion.div 
              className={`text-2xl font-bold ${stat.color} mb-1`}
              key={stat.value}
              initial={{ scale: 1.2, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {stat.value}
            </motion.div>
            
            <div className="text-sm font-medium text-gray-800 mb-1">
              {stat.label}
            </div>
            
            <div className="text-xs text-gray-600">
              {stat.subValue}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dashboard Insights */}
      <motion.div 
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Pantry Status */}
        <motion.div 
          className={`${styles.alertInfo} rounded-lg p-4`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <FiPackage className="text-blue-600" size={20} />
            <div>
              <div className="font-medium">Status da Despensa</div>
              <div className="text-sm opacity-80">
                {loading ? 'Carregando...' : `${stats.pantryItems} itens disponíveis, ${Math.floor(stats.pantryItems * 0.3)} próximos do vencimento`}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recipe Opportunities */}
        <motion.div 
          className={`${styles.alertSuccess} rounded-lg p-4`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <FiBookOpen className="text-green-600" size={20} />
            <div>
              <div className="font-medium">Receitas Criadas</div>
              <div className="text-sm opacity-80">
                {loading ? 'Carregando...' : `${stats.availableRecipes} receitas no seu perfil`}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sustainability Impact */}
        <motion.div 
          className={`${styles.alertWarning} rounded-lg p-4 md:col-span-2 lg:col-span-1`}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <FiTrendingUp className="text-orange-600" size={20} />
            <div>
              <div className="font-medium">Impacto Sustentável 🌱</div>
              <div className="text-sm opacity-80">
                {loading ? 'Carregando...' : `€${stats.economySaved.toFixed(2)} em desperdício evitado`}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default DashboardStatsHeader;
