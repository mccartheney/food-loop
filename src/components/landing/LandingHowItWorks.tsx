'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiHome, FiShoppingBag, FiUser, FiArrowRight,
  FiCamera, FiShare, FiDollarSign, FiPackage, FiHeart, FiBarChart
} from 'react-icons/fi';
import styles from './styles.module.css';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const individualSteps: Step[] = [
  {
    icon: <FiCamera size={24} />,
    title: "Digitaliza a tua despensa",
    description: "Digitaliza recibos ou adiciona produtos manualmente. Recebe alertas antes dos prazos de validade."
  },
  {
    icon: <FiShare size={24} />,
    title: "Partilha o excesso",
    description: "Conecta-te com vizinhos para trocar ou doar alimentos que não vais conseguir usar."
  },
  {
    icon: <FiDollarSign size={24} />,
    title: "Poupa dinheiro",
    description: "Compra caixas com desconto de produtos próximos do prazo em lojas locais."
  }
];

const businessSteps: Step[] = [
  {
    icon: <FiPackage size={24} />,
    title: "Lista produtos excedentes",
    description: "Cria caixas de produtos próximos do prazo para vender com desconto à comunidade."
  },
  {
    icon: <FiHeart size={24} />,
    title: "Faz doações facilmente",
    description: "Conecta-te com ONGs locais para doar alimentos que iam ser desperdiçados."
  },
  {
    icon: <FiBarChart size={24} />,
    title: "Analisa e otimiza",
    description: "Acompanha padrões de desperdício e melhora a sustentabilidade do teu negócio."
  }
];

const LandingHowItWorks: React.FC = () => {
  return (
    <section className={styles.section} id="como-funciona">
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
            <FiArrowRight size={16} className="text-purple-400" />
            <span className="text-white/90 text-sm font-medium">
              📋 Como Funciona
            </span>
          </motion.div>

          <h2 className={styles.sectionTitle}>
            Simples para{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              todos utilizarem
            </span>
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Quer sejas uma pessoa individual ou uma empresa, temos a solução perfeita 
            para reduzires o desperdício alimentar de forma eficaz.
          </p>
        </motion.div>

        {/* How It Works Grid */}
        <div className={styles.howItWorksGrid}>
          {/* For Individuals */}
          <motion.div
            className={styles.glassCard}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <FiHome size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Para Pessoas</h3>
                <p className="text-white/70 text-sm">Indivíduos e famílias</p>
              </div>
            </div>

            {/* Steps */}
            <ul className={styles.stepsList}>
              {individualSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className={styles.stepItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className={styles.stepNumber}>
                    <div className="text-blue-500">
                      {step.icon}
                    </div>
                  </div>
                  <div className={styles.stepContent}>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/auth/register"
                  className={`${styles.heroButton} ${styles.heroButtonPrimary} w-full justify-center`}
                >
                  <FiUser size={18} />
                  Registar como Pessoa
                  <FiArrowRight size={18} />
                </Link>
              </motion.div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-white/60 text-sm">
                <span>✓ Grátis para sempre</span>
                <span>✓ Sem cartão necessário</span>
              </div>
            </motion.div>
          </motion.div>

          {/* For Businesses */}
          <motion.div
            className={styles.glassCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <FiShoppingBag size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Para Empresas</h3>
                <p className="text-white/70 text-sm">Restaurantes e lojas</p>
              </div>
            </div>

            {/* Steps */}
            <ul className={styles.stepsList}>
              {businessSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className={styles.stepItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className={styles.stepNumber}>
                    <div className="text-emerald-500">
                      {step.icon}
                    </div>
                  </div>
                  <div className={styles.stepContent}>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/auth/register"
                  className={`${styles.heroButton} ${styles.heroButtonSecondary} w-full justify-center border-2 border-emerald-400/50 hover:border-emerald-400`}
                >
                  <FiShoppingBag size={18} />
                  Registar Empresa
                  <FiArrowRight size={18} />
                </Link>
              </motion.div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-white/60 text-sm">
                <span>✓ Teste grátis 30 dias</span>
                <span>✓ Suporte dedicado</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ainda não tens a certeza qual é a melhor opção?
            </h3>
            <p className="text-white/80 mb-8">
              Não te preocupes! Podes começar como pessoa individual e mais tarde 
              fazer upgrade para empresa. O importante é começares a fazer a diferença hoje.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiUser size={24} className="text-blue-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Pessoa Individual</h4>
                <p className="text-white/70 text-sm">Perfeito para casas e famílias</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiShoppingBag size={24} className="text-emerald-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Pequena Empresa</h4>
                <p className="text-white/70 text-sm">Ideal para restaurantes locais</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiPackage size={24} className="text-purple-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Grande Empresa</h4>
                <p className="text-white/70 text-sm">Soluções enterprise completas</p>
              </div>
            </div>

            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/auth/register"
                className={`${styles.heroButton} ${styles.heroButtonPrimary}`}
              >
                Começar Gratuitamente
                <FiArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingHowItWorks;
