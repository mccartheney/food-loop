'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiShare2, FiShoppingBag, FiUsers, FiHeart, FiCalendar,
  FiPackage, FiShoppingCart, FiDollarSign, FiClock, FiHome, FiAward,
  FiPieChart, FiTruck, FiGift, FiDatabase, FiBarChart2, FiLayers,
  FiBox, FiCoffee, FiMeh, FiSmile, FiPhoneCall, FiMail, FiMapPin,
  FiRefreshCw // Add this import
} from 'react-icons/fi';
import { FaAppleAlt, FaCarrot, FaBreadSlice, FaCheese, FaFish, FaIceCream } from 'react-icons/fa';

const FoodLoopLanding = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Food item animations
  const appleX = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const carrotX = useTransform(scrollYProgress, [0, 1], ['100%', '-50%']);
  const breadY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const cheeseRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const fishScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const bounce = {
    initial: { y: -20 },
    animate: {
      y: 20,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Floating food items
  const FloatingFood = () => (
    <>
      <motion.div
        style={{ x: appleX, top: '10%' }}
        className="absolute left-0 text-4xl text-red-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <FaAppleAlt />
      </motion.div>

      <motion.div
        style={{ x: carrotX, top: '30%' }}
        className="absolute right-0 text-4xl text-orange-500"
        animate={{ rotate: -180 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <FaCarrot />
      </motion.div>

      <motion.div
        style={{ y: breadY, left: '20%' }}
        className="absolute top-0 text-4xl text-amber-700"
        animate={{ rotate: 90 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <FaBreadSlice />
      </motion.div>

      <motion.div
        style={{ rotate: cheeseRotate, right: '15%', top: '60%' }}
        className="absolute text-4xl text-yellow-400"
      >
        <FaCheese />
      </motion.div>

      <motion.div
        style={{ scale: fishScale, left: '40%', top: '80%' }}
        className="absolute text-4xl text-blue-400"
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaFish />
      </motion.div>
    </>
  );

  // Add this array for parallax food items
  const parallaxFoodItems = [
    { icon: <FaAppleAlt />, startX: '-10%', endX: '110%', startY: '20%', endY: '20%', color: 'text-red-500' },
    { icon: <FaCarrot />, startX: '110%', endX: '-10%', startY: '40%', endY: '40%', color: 'text-orange-500' },
    { icon: <FaBreadSlice />, startX: '-10%', endX: '110%', startY: '60%', endY: '60%', color: 'text-amber-700' },
    { icon: <FaCheese />, startX: '110%', endX: '-10%', startY: '80%', endY: '80%', color: 'text-yellow-400' },
    { icon: <FaFish />, startX: '-10%', endX: '110%', startY: '50%', endY: '50%', color: 'text-blue-400' },
  ];



  return (
    <div ref={targetRef} className="min-h-screen bg-base-100 overflow-x-hidden">
      {/* Parallax food items */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      </div>

      {/* Floating food items */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <FloatingFood />
      </div>

      {/* Hero Section */}
      <section className="hero min-h-screen relative z-10">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="max-w-4xl"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h1 className="mb-5 text-5xl md:text-7xl font-bold">
                Join the <span className="text-accent">Food Loop</span> Revolution
              </h1>
            </motion.div>

            <motion.p
              className="mb-5 text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <FiRefreshCw className="inline mr-2 animate-spin" /> Connecting people, businesses and NGOs to eliminate food waste
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <motion.button
                className="btn btn-accent btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <FiArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                className="btn btn-outline btn-lg text-white hover:bg-white hover:text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-base-100 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16"
          >
            <FiAward className="inline mr-2" /> How Food Loop Works
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
                whileHover={{ y: -10 }}
              >
                <div className="card-body items-center text-center">
                  <motion.div
                    className="p-4 rounded-full mb-4"
                    style={{ background: `rgba(${feature.color}, 0.2)`, color: `rgb(${feature.color})` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="card-title text-2xl mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-8 bg-base-200 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16"
          >
            <FiUsers className="inline mr-2" /> For Individuals & Businesses
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Individuals */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <h3 className="card-title text-3xl mb-6 text-primary">
                  <FiHome className="inline mr-2" /> For Individuals
                </h3>
                <ul className="space-y-4">
                  {individualSteps.map((step, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="badge badge-primary badge-lg mt-1">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-lg">{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="card-actions justify-end mt-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <button className="btn btn-primary">
                    Sign Up as Individual <FiArrowRight className="ml-2" />
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Businesses */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <h3 className="card-title text-3xl mb-6 text-secondary">
                  <FiShoppingBag className="inline mr-2" /> For Businesses
                </h3>
                <ul className="space-y-4">
                  {businessSteps.map((step, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="badge badge-secondary badge-lg mt-1">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-lg">{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="card-actions justify-end mt-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <button className="btn btn-secondary">
                    Register Your Business <FiArrowRight className="ml-2" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8 bg-primary text-primary-content relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16"
          >
            <FiBarChart2 className="inline mr-2" /> The Impact of Food Waste
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={item}
                className="p-6 bg-primary-focus rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-6xl font-bold mb-4 flex justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.icon}
                  </motion.div>
                  {stat.value}
                </div>
                <p className="text-xl">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 bg-base-100 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16"
          >
            <FiSmile className="inline mr-2" /> What Our Community Says
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card bg-base-200 shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span>{testimonial.initials}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.2 }}
                            animate={{
                              scale: i < testimonial.rating ? [1, 1.2, 1] : 1,
                              opacity: i < testimonial.rating ? 1 : 0.5
                            }}
                            transition={{ delay: i * 0.1 }}
                          >
                            ★
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>"{testimonial.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-base-200 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <FiGift className="inline mr-2" /> Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8">
              Join Food Loop today and be part of the solution to food waste. Whether you're an individual, business, or NGO, we have tools to help you reduce waste and connect with your community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="btn btn-accent btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now <FiArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                className="btn btn-outline btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="footer-title">
                <FaAppleAlt className="inline mr-2" /> Food Loop
              </span>
              <p>Connecting communities to eliminate food waste through technology and collaboration.</p>
            </div>
            <div>
              <span className="footer-title">
                <FiHome className="inline mr-2" /> For Individuals
              </span>
              <a className="link link-hover flex items-center gap-2"><FiShoppingBag /> Digital Pantry</a>
              <a className="link link-hover flex items-center gap-2"><FiShare2 /> Food Sharing</a>
              <a className="link link-hover flex items-center gap-2"><FiDollarSign /> Discount Boxes</a>
            </div>
            <div>
              <span className="footer-title">
                <FiShoppingBag className="inline mr-2" /> For Businesses
              </span>
              <a className="link link-hover flex items-center gap-2"><FiPackage /> Surplus Management</a>
              <a className="link link-hover flex items-center gap-2"><FiHeart /> Donation Platform</a>
              <a className="link link-hover flex items-center gap-2"><FiPieChart /> Analytics</a>
            </div>
            <div>
              <span className="footer-title">
                <FiPhoneCall className="inline mr-2" /> Contact
              </span>
              <a className="link link-hover flex items-center gap-2"><FiMail /> info@foodloop.com</a>
              <a className="link link-hover flex items-center gap-2"><FiMapPin /> 123 Green St, Eco City</a>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-neutral-focus text-center">
            <p>© {new Date().getFullYear()} Food Loop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data arrays
const features = [
  {
    icon: <FiShoppingBag size={32} />,
    title: "Digital Pantry",
    description: "Track your food inventory with expiration alerts",
    color: "59, 130, 246" // blue-500
  },
  {
    icon: <FiShare2 size={32} />,
    title: "Food Sharing",
    description: "Connect with others to trade or donate food",
    color: "16, 185, 129" // emerald-500
  },
  {
    icon: <FiCalendar size={32} />,
    title: "Discount Boxes",
    description: "Buy affordable near-expiration items",
    color: "245, 158, 11" // amber-500
  },
  {
    icon: <FiUsers size={32} />,
    title: "Community",
    description: "Join a network fighting food waste",
    color: "139, 92, 246" // violet-500
  },
  {
    icon: <FiHeart size={32} />,
    title: "NGO Partnerships",
    description: "Easy donations to local organizations",
    color: "244, 63, 94" // rose-500
  },
  {
    icon: <FiDatabase size={32} />,
    title: "Enterprise Tools",
    description: "Manage and reduce business food waste",
    color: "20, 184, 166" // teal-500
  }
];

const individualSteps = [
  {
    title: "Track Your Food",
    description: "Scan receipts to create a digital pantry with expiration alerts"
  },
  {
    title: "Share Surplus",
    description: "Connect with neighbors to trade or donate food you won't use"
  },
  {
    title: "Save Money",
    description: "Buy discounted boxes of near-expiration items from local stores"
  }
];

const businessSteps = [
  {
    title: "List Surplus Items",
    description: "Create boxes of near-expiration items to sell at a discount"
  },
  {
    title: "Donate Easily",
    description: "Connect with local NGOs to donate food that would go to waste"
  },
  {
    title: "Gain Insights",
    description: "Track your food waste patterns and improve sustainability"
  }
];

const stats = [
  {
    icon: <FaBreadSlice />,
    value: "30%",
    description: "of all food produced is wasted globally"
  },
  {
    icon: <FaCarrot />,
    value: "8%",
    description: "of global greenhouse gas emissions come from food waste"
  },
  {
    icon: <FaAppleAlt />,
    value: "1.3B",
    description: "tons of food wasted annually worldwide"
  }
];

const testimonials = [
  {
    initials: "JS",
    name: "Jane Smith",
    rating: 5,
    quote: "Food Loop helped me reduce my grocery bill by 30% while helping my community!"
  },
  {
    initials: "MB",
    name: "Mike Brown",
    rating: 4,
    quote: "As a restaurant owner, I've cut food waste in half using Food Loop's tools."
  },
  {
    initials: "AD",
    name: "Anna Davis",
    rating: 5,
    quote: "I love being able to share extra food with neighbors rather than throwing it away."
  }
];

export default FoodLoopLanding;
