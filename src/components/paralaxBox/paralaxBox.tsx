import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaBox } from "react-icons/fa";

// Array for food boxes
const foodBoxes = [
  { icon: <FaBox />, startX: '-10%', endX: '110%', startY: '10%', endY: '20%', color: 'text-green-500' },
  { icon: <FaBox />, startX: '110%', endX: '-10%', startY: '30%', endY: '40%', color: 'text-blue-500' },
  { icon: <FaBox />, startX: '-10%', endX: '110%', startY: '50%', endY: '60%', color: 'text-yellow-500' },
  { icon: <FaBox />, startX: '110%', endX: '-10%', startY: '70%', endY: '80%', color: 'text-red-500' },
];

// Component for food boxes passing across the screen
const PassingFoodBoxes = ({ scrollYProgress }: { scrollYProgress: any }) => {
  return (
    <>
      {foodBoxes.map((box, index) => {
        const x = useTransform(scrollYProgress, [0, 1], [box.startX, box.endX]);
        const y = useTransform(scrollYProgress, [0, 1], [box.startY, box.endY]);

        return (
          <motion.div
            key={index}
            style={{ x, y }}
            className={`absolute text-4xl ${box.color}`}
          >
            {box.icon}
          </motion.div>
        );
      })}
    </>
  );
};

const ParallaxBox = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={targetRef} className="min-h-screen bg-base-100 overflow-x-hidden">
      {/* Parallax food items */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Replace with your ParallaxFood component */}
        <PassingFoodBoxes scrollYProgress={scrollYProgress} />
      </div>

      {/* Floating food items */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Replace with your FloatingFood component */}
      </div>

      {/* Passing food boxes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <PassingFoodBoxes scrollYProgress={scrollYProgress} />
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
          </motion.div>
        </div>
      </section>

      {/* Other sections */}
    </div>
  );
};

export default ParallaxBox;
