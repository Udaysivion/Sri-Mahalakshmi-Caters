import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChefHat } from 'lucide-react';
import { useMenuData } from '../../hooks/useMenuData';

const ChefsCuratedCollection = () => {
  const { menuItems, loading } = useMenuData();

  // Dynamically select signature dishes from the database
  const signatureDishes = (menuItems || [])
    .filter(item => item.special || item.is_signature)
    .slice(0, 2);

  const displayDishes = signatureDishes.length >= 2 
    ? signatureDishes 
    : (menuItems || []).slice(0, 2);

  return (
    <section className="py-24 bg-[#1B4332] text-white border-b border-amber-900/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative z-10">
          <ChefHat size={32} className="text-[#D4731A] mx-auto mb-4 opacity-90" strokeWidth={1.5} />
          <span className="text-[#D4731A] tracking-[0.3em] uppercase text-[11px] font-bold mb-3 block">
            ~ Sri Mahalakshmi Signatures ~
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white">
            Chef's Curated Masterpieces
          </h2>
          <div className="w-16 h-0.5 bg-[#D4731A] mx-auto mt-6" />
        </div>

        {loading && displayDishes.length === 0 ? (
          <div className="text-center py-12 text-emerald-200">Loading chef selections...</div>
        ) : (
          <div className="space-y-20">
            {displayDishes.map((dish, idx) => (
              <DishEditorial 
                key={dish.id || idx} 
                dish={{
                  ...dish,
                  origin: dish.cat ? `${dish.cat} Specialty` : 'Traditional Heritage',
                  image: dish.img || dish.imageUrl || dish.image,
                  desc: dish.desc || dish.description,
                  reverse: idx % 2 === 1,
                  ingredients: `${dish.type || 'Fresh'} ingredients, traditional aromatics & pure desi ghee`,
                  pairing: 'Served fresh with homemade chutneys, sambar, and cooling raita.'
                }} 
                idx={idx} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const DishEditorial = ({ dish, idx }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`flex flex-col ${dish.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
    >
      <motion.div
        initial={{ opacity: 0, x: dish.reverse ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-[#1B4332]/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#D4731A] rounded-md border border-[#D4731A]/30">
            {dish.origin}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: dish.reverse ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 space-y-4"
      >
        <span className="text-xs uppercase font-bold tracking-widest text-[#D4731A]">
          Signature Recipe #{idx + 1}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold font-serif text-white">
          {dish.name}
        </h3>
        <p className="text-xs text-amber-200/80 font-mono tracking-wide">
          Ingredients: {dish.ingredients}
        </p>
        <p className="text-stone-300 text-sm leading-relaxed">
          {dish.desc}
        </p>
        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-[#D4731A] font-semibold italic">
            {dish.pairing}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ChefsCuratedCollection;
