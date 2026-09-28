import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChefHat, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MenuHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden border-b border-luxury">
      {/* Cinematic Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000" 
          alt="Culinary Masterpiece" 
          className="w-full h-[120vh] object-cover object-center opacity-40"
        />
        {/* Luxury Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      </motion.div>

      {/* Floating Particles/Dust (CSS Animation driven by tailwind if configured, or just static dots) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center mt-20"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <Star className="text-primary absolute -top-6 -left-6 opacity-50" size={24} strokeWidth={1} />
          <Star className="text-primary absolute -bottom-6 -right-6 opacity-50" size={24} strokeWidth={1} />
          <ChefHat size={48} className="text-primary mb-6 mx-auto opacity-80" strokeWidth={1} />
          <span className="text-primary tracking-[0.4em] uppercase text-xs font-semibold block">~ A Culinary Heritage ~</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-light text-white mb-8 leading-tight tracking-wide"
        >
          Crafted For <br />
          <i className="font-serif text-primary">Extraordinary Moments</i>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-text-muted font-light max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12"
        >
          Every dish represents generations of culinary heritage, refined through craftsmanship and passion. Designed exclusively for intimate dining experiences.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
        >
          <Link to="/reserve" className="border border-primary bg-primary/10 text-primary px-10 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-bg transition-all duration-500 backdrop-blur-sm">
            Reserve An Exclusive Table
          </Link>
          <div className="flex gap-4">
             <a href="https://www.swiggy.com/" target="_blank" rel="noopener noreferrer" className="border border-luxury px-8 py-4 text-xs tracking-widest uppercase hover:border-[#fc8019] text-text-muted hover:text-[#fc8019] transition-colors duration-500 backdrop-blur-sm">
               Swiggy
             </a>
             <a href="https://www.zomato.com/" target="_blank" rel="noopener noreferrer" className="border border-luxury px-8 py-4 text-xs tracking-widest uppercase hover:border-[#cb202d] text-text-muted hover:text-[#cb202d] transition-colors duration-500 backdrop-blur-sm">
               Zomato
             </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-[-15vh] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-primary text-[10px] tracking-[0.3em] uppercase font-semibold">Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent animate-pulse"></div>
          <ChevronDown className="text-primary animate-bounce" size={16} />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default MenuHero;
