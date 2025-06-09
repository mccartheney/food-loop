'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiShoppingBag, FiShare2, FiCalendar, FiUsers, FiHeart, 
  FiDatabase, FiArrowRight, FiShield, FiTrendingUp 
} from 'react-icons/fi';
import styles from './styles.module.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const features: Feature[] = [
  {
    icon: <FiShoppingBag size={32} />,
    title: "Despensa Digital",
    description: "Gira o teu inventário alimentar com alertas de validade inteligentes e sugestões de receitas.",
    color: "text-blue-400",
    delay: 0.1
  },
  {
    icon: <FiShare2 size={32} />,
    title: "Partilha Comunitária", 
    description: "Conecta-te com vizinhos para trocar ou doar alimentos que não vais usar.",
    color: "text-emerald-400",
    delay: 0.2
  },
  {
    icon: <FiCalendar size={32} />,
    title: "Caixas com Desconto",
    description: "Compra produtos próximos do prazo de validade com descontos até 70%.",
    color: "text-amber-400",
    delay: 0.3
  },
  {
    icon: <FiUsers size={32} />,
    title: "Rede Sustentável",
    description: "Junta-te a uma comunidade activa que luta contra o desperdício alimentar.",
    color: "text-purple-400",
    delay: 0.4
  },
  {
    icon: <FiHeart size={32} />,
    title: "Doações Simples",
    description: "Faz doações fáceis para ONGs locais e acompanha o teu impacto social.",
    color: "text-rose-400",
    delay: 0.5
  },
  {
    icon: <FiDatabase size={32} />,
    title: "Ferramentas Empresariais",
    description: "Analíticas avançadas para empresas reduzirem desperdício e custos operacionais.",
    color: "text-cyan-400",
    delay: 0.6
  },
  {
    icon: <FiShield size={32} />,
    title: "Segurança Alimentar",
    description: "Verificações de qualidade e rastreabilidade completa dos alimentos partilhados.",
    color: "text-indigo-400",
    delay: 0.7
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: "Impacto Mensurável",
    description: "Visualiza o teu contributo ambiental com relatórios detalhados de sustentabilidade.",
    color: "text-green-400",
    delay: 0.8
  }
];

const LandingFeatures: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.section} id="funcionalidades">
      <div className={styles.sectionContainer}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FiShoppingBag size={16} className="text-emerald-400" />
            <span className="text-white/90 text-sm font-medium">
              🚀 Funcionalidades Principais
            </span>
          </motion.div>

          <h2 className={styles.sectionTitle}>
            Tudo o que precisas para{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              eliminar desperdícios
            </span>
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Ferramentas poderosas e intuitivas para indivíduos, empresas e organizações 
            transformarem a forma como gerem os seus recursos alimentares.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.glassCard}
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3 }
              }}
            >
              {/* Icon */}
              <motion.div 
                className={styles.cardIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div className={feature.color}>
                  {feature.icon}
                </div>
              </motion.div>

              {/* Content */}
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>

              {/* Hover Effect */}
              <motion.div
                className="mt-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para começar a fazer a diferença?
            </h3>
            <p className="text-white/80 mb-6">
              Junta-te a centenas de pessoas e empresas que já estão a transformar 
              o desperdício alimentar em oportunidades.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/auth/register"
                  className={`${styles.heroButton} ${styles.heroButtonPrimary}`}
                >
                  Experimentar Grátis
                  <FiArrowRight size={18} />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/auth/login"
                  className={`${styles.heroButton} ${styles.heroButtonSecondary}`}
                >
                  Já tenho conta
                </Link>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/70">
                <FiShield size={16} />
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <FiUsers size={16} />
                <span className="text-sm">500+ Utilizadores</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <FiHeart size={16} />
                <span className="text-sm">Impacto Real</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingFeatures;
