import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useMenuData } from '../../hooks/useMenuData';

export const SignatureCollection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { menuItems, loading } = useMenuData();

  // Dynamically select signature and popular dishes from the database
  const signatureDishes = (menuItems || [])
    .filter(item => item.special || item.best || item.is_signature || item.is_popular)
    .slice(0, 4);

  // If no items flagged, dynamically fall back to the first available dishes
  const displayDishes = signatureDishes.length > 0 ? signatureDishes : (menuItems || []).slice(0, 4);

  return (
    <section className="bg-bg border-b border-luxury py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ The Masterpieces ~</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-heading font-light text-white mb-8">
            Signature Collection
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto"></motion.div>
        </div>

        {loading && displayDishes.length === 0 ? (
          <div className="text-center py-12 text-stone-400">Loading signature collection...</div>
        ) : (
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {displayDishes.map((dish, idx) => (
              <motion.div 
                key={dish.id || idx} 
                initial={{ opacity: 0, y: 50 }} 
                animate={inView ? { opacity: 1, y: 0 } : {}} 
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden border border-luxury mb-6">
                  <div className="absolute top-4 right-4 z-20 bg-bg/80 backdrop-blur-md border border-luxury px-4 py-1">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                      {dish.special ? 'Chef Signature' : (dish.best ? 'Best Seller' : 'Popular')}
                    </span>
                  </div>
                  <img 
                    src={dish.img || dish.imageUrl || dish.image} 
                    alt={dish.name} 
                    className="w-full h-[400px] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-heading text-white mb-2 group-hover:text-primary transition-colors">{dish.name}</h3>
                    <p className="text-text-muted font-light text-sm max-w-sm">{dish.desc || dish.description}</p>
                  </div>
                  <span className="text-primary font-serif italic text-xl">₹{dish.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1 }} className="mt-20 text-center">
          <Link to="/menu" className="inline-block border border-primary text-primary px-10 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-bg transition-all duration-500">
            View Full Menu
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
