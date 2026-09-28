import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: "15k+", label: "Happy Guests" },
  { value: "12+", label: "Years Legacy" },
  { value: "50+", label: "Signature Dishes" },
  { value: "4.8", label: "Google Rating", star: true }
];

export const LuxuryStatistics = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-6 bg-cream/5 border-b border-luxury overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center relative"
            >
              {idx !== 0 && (
                <div className="hidden md:block absolute -left-6 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-luxury to-transparent"></div>
              )}
              
              <div className="text-5xl md:text-6xl font-heading font-light text-primary mb-4 flex items-center gap-2">
                {stat.value}
                {stat.star && <span className="text-2xl">★</span>}
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-text-muted font-semibold">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
