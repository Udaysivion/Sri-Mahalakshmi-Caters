import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';
import { useMenuData } from '../../hooks/useMenuData';

const SignatureDishShowcase = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { menuItems, loading } = useMenuData();

  // Dynamically pick the icon showcase dish from live menu data
  const iconDish = (menuItems || []).find(item => item.special || item.is_signature) || (menuItems || [])[0] || {
    name: "Ghee Karam Dosa",
    desc: "A quintessential South Indian specialty. Golden-brown, crispy fermented rice crepe roasted to perfection on a traditional tawa, lavishly brushed with pure cow ghee and our signature stone-ground spicy karam podi.",
    img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=2000"
  };

  return (
    <section className="bg-bg py-32 border-y border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden border border-luxury group"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={iconDish.img || iconDish.imageUrl || iconDish.image} 
              alt={iconDish.name} 
              className="w-full h-full object-cover transform transition-transform duration-[3000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full lg:w-1/2 p-8 md:p-16">
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ The Icon ~</span>
            <h2 className="text-5xl md:text-7xl font-heading font-light text-white mb-6 leading-tight">
              {iconDish.name}
            </h2>
            <p className="text-white/80 font-light text-lg leading-relaxed mb-8 max-w-md">
              {iconDish.desc || iconDish.description}
            </p>
            
            <div className="flex gap-4">
               <Quote className="text-primary opacity-50" size={32} strokeWidth={1} />
               <p className="text-text-muted font-light italic text-sm leading-relaxed max-w-sm mt-2">
                 "The moment the rich aroma of pure desi ghee and roasted spices hits the table, it evokes memories of home and pure culinary mastery."
                 <span className="block mt-2 text-primary uppercase tracking-widest text-[8px] font-semibold">Sri Mahalakshmi Heritage Recipe</span>
               </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default SignatureDishShowcase;
