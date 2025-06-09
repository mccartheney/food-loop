'use client';

import { motion } from 'framer-motion';
import { FiPlus, FiUpload, FiMapPin, FiTrendingUp, FiUsers, FiStar } from 'react-icons/fi';
import styles from '../../app/app/add/styles.module.css';

const AddListingHeader: React.FC = () => {
  // Mock data - em uma app real, viria de props ou API
  const stats = {
    totalListings: 247,
    activeUsers: 1834,
    avgRating: 4.8,
    itemsSaved: 156
  };

  const tips = [
    {
      icon: FiUpload,
      title: 'Fotos de Qualidade',
      description: 'Use fotos claras e bem iluminadas para atrair mais interessados'
    },
    {
      icon: FiMapPin,
      title: 'Localização Precisa',
      description: 'Defina sua localização no mapa para facilitar encontros'
    },
    {
      icon: FiStar,
      title: 'Descrição Detalhada',
      description: 'Inclua informações sobre quantidade, validade e condição'
    }
  ];

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
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <FiPlus className="text-blue-500" />
            </motion.div>
            Criar Nova Oferta
          </h1>
          <p className="text-gray-600">
            Compartilhe alimentos com sua comunidade e ajude a reduzir o desperdício
          </p>
        </div>
        
        {/* Quick Stats */}
        <motion.div 
          className="flex items-center gap-4 mt-4 lg:mt-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalListings}</div>
            <div className="text-xs text-gray-600">Ofertas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
            <div className="text-xs text-gray-600">Usuários</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.avgRating}⭐</div>
            <div className="text-xs text-gray-600">Avaliação</div>
          </div>
        </motion.div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-3"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FiPlus size={20} />
          </motion.div>
          <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalListings}</div>
          <div className="text-sm font-medium text-gray-800 mb-1">Total de Ofertas</div>
          <div className="text-xs text-gray-600">Na plataforma</div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-4 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white mb-3"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FiUsers size={20} />
          </motion.div>
          <div className="text-2xl font-bold text-green-600 mb-1">{stats.activeUsers}</div>
          <div className="text-sm font-medium text-gray-800 mb-1">Usuários Ativos</div>
          <div className="text-xs text-gray-600">Este mês</div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl p-4 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white mb-3"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FiStar size={20} />
          </motion.div>
          <div className="text-2xl font-bold text-orange-600 mb-1">{stats.avgRating}</div>
          <div className="text-sm font-medium text-gray-800 mb-1">Avaliação Média</div>
          <div className="text-xs text-gray-600">Da comunidade</div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-4 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white mb-3"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FiTrendingUp size={20} />
          </motion.div>
          <div className="text-2xl font-bold text-purple-600 mb-1">{stats.itemsSaved}</div>
          <div className="text-sm font-medium text-gray-800 mb-1">Itens Salvos</div>
          <div className="text-xs text-gray-600">Do desperdício</div>
        </motion.div>
      </div>

      {/* Tips Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {tips.map((tip, index) => (
          <motion.div 
            key={tip.title}
            className="bg-gradient-to-br from-white/80 to-gray-50/80 rounded-lg p-4 backdrop-blur-sm border border-white/30"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 + index * 0.2, duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <tip.icon size={16} />
              </motion.div>
              <div>
                <div className="font-semibold text-gray-800 text-sm mb-1">{tip.title}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{tip.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress Indicator */}
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progresso do Formulário</span>
          <span>0%</span>
        </div>
        <div className={`${styles.progressBar} h-2 rounded-full`}>
          <motion.div 
            className={`${styles.progressFill} h-full rounded-full`}
            initial={{ width: '0%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Preencha o formulário para ver o progresso
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200/50">
          <div className="text-sm font-medium text-gray-800 mb-1">
            💡 Dica Especial
          </div>
          <div className="text-xs text-gray-600">
            Ofertas com fotos de qualidade recebem 3x mais interesse da comunidade!
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default AddListingHeader;
