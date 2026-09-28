import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const AboutHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden border-b border-luxury">
      {/* Cinematic Video/Image Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2070" 
          alt="Cinematic Heritage" 
          className="w-full h-[120vh] object-cover object-center opacity-40"
        />
        {/* Luxury Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-transparent to-transparent"></div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center mt-20"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="text-primary tracking-[0.4em] uppercase text-xs font-semibold block mb-8">~ Our Heritage ~</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-light text-white mb-8 leading-tight">
            A Legacy Of <br />
            <i className="font-serif text-primary">Culinary Excellence</i>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-text-muted font-light max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12"
        >
          For over two decades, we have transformed dining into unforgettable memories. Uncompromising quality, meticulous craftsmanship, and profound hospitality.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-[-20vh] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent animate-pulse"></div>
          <ChevronDown className="text-primary animate-bounce" size={16} />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default AboutHero;
