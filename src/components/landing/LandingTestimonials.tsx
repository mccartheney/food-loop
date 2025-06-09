'use client';

import { motion } from 'framer-motion';
import { FiStar, FiUsers, FiMessageSquare } from 'react-icons/fi';
import styles from './styles.module.css';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  impact: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ana Silva",
    role: "Mãe de família",
    company: "Lisboa",
    avatar: "AS",
    rating: 5,
    quote: "O Food Loop mudou completamente a forma como giro a minha despensa. Já poupei mais de 200€ este mês e ainda ajudei 3 famílias da minha zona!",
    impact: "200€ poupados • 15kg salvos"
  },
  {
    name: "João Santos",
    role: "Chef Proprietário",
    company: "Restaurante Sabores",
    avatar: "JS",
    rating: 5,
    quote: "Antes desperdiçávamos 30% da nossa produção. Com o Food Loop conseguimos reduzir para 5% e ainda criámos uma nova fonte de receita com as caixas de desconto.",
    impact: "25% menos desperdício • +500€/mês"
  },
  {
    name: "Maria Costa",
    role: "Coordenadora",
    company: "ONG Alimentar Mais",
    avatar: "MC",
    rating: 5,
    quote: "A plataforma facilitou imenso o nosso trabalho. Recebemos doações regulares de 12 empresas locais e conseguimos alimentar mais 200 pessoas por semana.",
    impact: "200 pessoas/semana • 12 parcerias"
  },
  {
    name: "Pedro Oliveira",
    role: "Gestor de Sustentabilidade",
    company: "SuperMercado Verde",
    avatar: "PO",
    rating: 5,
    quote: "Os relatórios do Food Loop ajudaram-nos a identificar padrões de desperdício. Reduzimos custos em 15% e melhorámos a nossa imagem junto dos clientes.",
    impact: "15% redução custos • +40% satisfação"
  },
  {
    name: "Carla Ferreira",
    role: "Estudante Universitária",
    company: "Porto",
    avatar: "CF",
    rating: 5,
    quote: "Como estudante, cada euro conta. Conseguir comida de qualidade a preços acessíveis através das caixas de desconto tem sido uma bênção!",
    impact: "150€ poupados • 20 refeições/mês"
  },
  {
    name: "Rui Marques",
    role: "Proprietário",
    company: "Padaria Central",
    avatar: "RM",
    rating: 4,
    quote: "Excelente forma de dar uma segunda vida aos nossos produtos do dia anterior. Os clientes adoram e nós reduzimos o desperdício a zero!",
    impact: "Zero desperdício • +50 clientes/dia"
  }
];

const LandingTestimonials: React.FC = () => {
  return (
    <section className={styles.section} id="testemunhos">
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
            <FiUsers size={16} className="text-green-400" />
            <span className="text-white/90 text-sm font-medium">
              💬 Testemunhos Reais
            </span>
          </motion.div>

          <h2 className={styles.sectionTitle}>
            O que a nossa{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              comunidade diz
            </span>
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Histórias reais de pessoas e empresas que estão a fazer a diferença 
            através do Food Loop. Junta-te a mais de 500 utilizadores satisfeitos.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className={styles.testimonialsGrid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1 + 0.3,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Quote Icon */}
              <motion.div
                className="absolute top-4 right-4 text-white/20"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.3 }}
              >
                <FiMessageSquare size={24} />
              </motion.div>

              {/* Header with Avatar and Info */}
              <div className={styles.testimonialHeader}>
                <motion.div 
                  className={styles.testimonialAvatar}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div className={styles.testimonialInfo}>
                  <h4>{testimonial.name}</h4>
                  <p className="text-white/60 text-sm">
                    {testimonial.role}
                  </p>
                  <p className="text-white/50 text-xs">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className={styles.testimonialRating}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1 + 0.5 + i * 0.1,
                      duration: 0.3
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <FiStar 
                      size={16} 
                      className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'} 
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className={styles.testimonialQuote}>
                "{testimonial.quote}"
              </blockquote>

              {/* Impact Metrics */}
              <motion.div
                className="mt-4 pt-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.8 }}
              >
                <div className="text-center">
                  <div className="text-xs text-white/50 mb-1">Impacto Real:</div>
                  <div className="text-sm font-medium text-emerald-400">
                    {testimonial.impact}
                  </div>
                </div>
              </motion.div>

              {/* Verification Badge */}
              <motion.div
                className="absolute bottom-4 right-4"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 1 }}
              >
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">
              Junta-te a uma comunidade em crescimento
            </h3>
            
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-emerald-400 mb-1">500+</div>
                <div className="text-white/70 text-sm">Utilizadores Activos</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-1">50+</div>
                <div className="text-white/70 text-sm">Empresas Parceiras</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-purple-400 mb-1">2.5T</div>
                <div className="text-white/70 text-sm">Comida Salva</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-amber-400 mb-1">4.8★</div>
                <div className="text-white/70 text-sm">Avaliação Média</div>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Verificado por utilizadores reais</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Dados atualizados em tempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Comunidade activa e crescente</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingTestimonials;
