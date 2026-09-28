import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const FinalEmotionalCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-32 bg-bg relative overflow-hidden">
      {/* Cinematic Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000" 
          alt="Dining Experience" 
          className="w-full h-full object-cover opacity-30 transform transition-transform duration-[5000ms] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5 }}
        >
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ The Invitation ~</span>
          <h2 className="text-5xl md:text-7xl font-heading font-light text-white mb-8 leading-tight">
            Become Part Of <br/><i className="font-serif text-primary">Our Story</i>
          </h2>
          <p className="text-text-muted font-light text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether it is an intimate anniversary or a critical business closure, allow us the absolute privilege of hosting your most meaningful moments.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/reserve" className="border border-primary bg-primary/10 text-primary px-10 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-bg transition-all duration-500 backdrop-blur-sm">
              Reserve A Table
            </Link>
            <Link to="/contact" className="border border-luxury px-10 py-4 text-xs tracking-widest uppercase text-white hover:border-white transition-all duration-500 backdrop-blur-sm">
              Contact Concierge
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalEmotionalCTA;
