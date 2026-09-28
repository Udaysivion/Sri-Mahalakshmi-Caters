import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const WeekendExperience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-32 bg-bg border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative overflow-hidden border border-luxury p-12 md:p-24 text-center group"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000" 
              alt="Weekend Experience" 
              className="w-full h-full object-cover transform transition-transform duration-[3000ms] group-hover:scale-105 opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg"></div>
          </div>

          <div className="relative z-10">
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ Exclusive Offering ~</span>
            <h2 className="text-4xl md:text-6xl font-heading font-light text-white mb-6">The Weekend Degustation</h2>
            <p className="text-text-muted font-light text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Available strictly on Friday and Saturday evenings. An immersive 9-course blind tasting menu showcasing the absolute limits of our culinary creativity, featuring ingredients flown in weekly.
            </p>
            <Link to="/reserve" className="inline-block border border-primary text-primary px-10 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-bg transition-all duration-500 backdrop-blur-sm">
              Reserve Your Friday/Saturday
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeekendExperience;
