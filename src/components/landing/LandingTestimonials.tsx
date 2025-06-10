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
    role: "Family Mom",
    company: "Lisbon",
    avatar: "AS",
    rating: 5,
    quote: "Food Loop completely changed how I manage my pantry. I've already saved over €200 this month and helped 3 families in my area!",
    impact: "€200 saved • 15kg rescued"
  },
  {
    name: "João Santos",
    role: "Chef Owner",
    company: "Flavors Restaurant",
    avatar: "JS",
    rating: 5,
    quote: "Before, we wasted 30% of our production. With Food Loop we've reduced this to 5% and even created a new revenue stream with discount boxes.",
    impact: "25% less waste • +€500/month"
  },
  {
    name: "Maria Costa",
    role: "Coordinator",
    company: "Feed More NGO",
    avatar: "MC",
    rating: 5,
    quote: "The platform has made our work so much easier. We receive regular donations from 12 local businesses and can feed an additional 200 people each week.",
    impact: "200 people/week • 12 partnerships"
  },
  {
    name: "Pedro Oliveira",
    role: "Sustainability Manager",
    company: "Green Supermarket",
    avatar: "PO",
    rating: 5,
    quote: "Food Loop reports helped us identify waste patterns. We reduced costs by 15% and improved our image with customers.",
    impact: "15% cost reduction • +40% satisfaction"
  },
  {
    name: "Carla Ferreira",
    role: "University Student",
    company: "Porto",
    avatar: "CF",
    rating: 5,
    quote: "As a student, every euro counts. Getting quality food at affordable prices through discount boxes has been a blessing!",
    impact: "€150 saved • 20 meals/month"
  },
  {
    name: "Rui Marques",
    role: "Owner",
    company: "Central Bakery",
    avatar: "RM",
    rating: 4,
    quote: "Excellent way to give our day-old products a second life. Customers love it and we've reduced waste to zero!",
    impact: "Zero waste • +50 customers/day"
  }
];

const LandingTestimonials: React.FC = () => {
  return (
    <section className={styles.section} id="testimonials">
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
              💬 Real Testimonials
            </span>
          </motion.div>

          <h2 className={styles.sectionTitle}>
            What our{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              community says
            </span>
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Real stories from people and businesses making a difference 
            through Food Loop. Join over 500 satisfied users.
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
                  <div className="text-xs text-white/50 mb-1">Real Impact:</div>
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
              Join a growing community
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
                <div className="text-white/70 text-sm">Active Users</div>
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
                <div className="text-white/70 text-sm">Partner Businesses</div>
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
                <div className="text-white/70 text-sm">Food Saved</div>
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
                <div className="text-white/70 text-sm">Average Rating</div>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Verified by real users</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Data updated in real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Active and growing community</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingTestimonials;