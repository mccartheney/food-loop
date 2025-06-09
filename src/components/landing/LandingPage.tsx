'use client';

import { motion } from 'framer-motion';
import LandingNavbar from './LandingNavbar';
import LandingHero from './LandingHero';
import LandingFeatures from './LandingFeatures';
import LandingHowItWorks from './LandingHowItWorks';
import LandingStats from './LandingStats';
import LandingTestimonials from './LandingTestimonials';
import LandingCTA from './LandingCTA';
import FloatingElements from './FloatingElements';
import styles from './styles.module.css';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingBackground}>
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Navigation */}
      <LandingNavbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <LandingHero />
        
        {/* Stats/About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <LandingStats />
        </motion.div>
        
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <LandingFeatures />
        </motion.div>
        
        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <LandingHowItWorks />
        </motion.div>
        
        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <LandingTestimonials />
        </motion.div>
        
        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <LandingCTA />
        </motion.div>
      </main>
      
      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🍃</span>
                <span className="text-xl font-bold text-white">Food Loop</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md">
                Conectamos pessoas, empresas e ONGs para eliminar o desperdício alimentar 
                e criar um futuro mais sustentável.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Facebook</span>
                  📘
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Instagram</span>
                  📷
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">LinkedIn</span>
                  💼
                </motion.a>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Produto</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Empresa</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 Food Loop. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Termos
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
