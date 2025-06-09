'use client';

import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardStatsHeader from '@/components/dashboard/DashboardStatsHeader';
import DashboardSearchBar from '@/components/dashboard/DashboardSearchBar';
import PantryItemsCard from '@/components/dashboard/cards/PantryItemsCard';
import RecipesCard from '@/components/dashboard/cards/RecipesCard';
import BoxesCard from '@/components/dashboard/cards/BoxesCard';
import HistoricCard from '@/components/dashboard/cards/HistoricCard';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div 
        className="container mx-auto p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Stats Header */}
        <DashboardStatsHeader />

        {/* Search Bar */}
        <DashboardSearchBar />

        {/* Dashboard Cards */}
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {/* First Row */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <PantryItemsCard />
            </motion.div>
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <RecipesCard />
            </motion.div>
          </motion.div>
          
          {/* Second Row */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.3 }}
            >
              <BoxesCard />
            </motion.div>
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.3 }}
            >
              <HistoricCard />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
