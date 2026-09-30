import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award } from 'lucide-react';
import { useMenuData } from '../../hooks/useMenuData';

const MostOrdered = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { menuItems, loading } = useMenuData();

  // Dynamically select popular dishes from database
  const popularDishes = (menuItems || [])
    .filter(item => item.best || item.is_popular)
    .slice(0, 3);

  const topDishes = (popularDishes.length >= 3 ? popularDishes : (menuItems || []).slice(0, 3)).map((item, idx) => ({
    rank: `0${idx + 1}`,
    name: item.name,
    desc: item.desc || item.description,
    image: item.img || item.imageUrl || item.image
  }));

  return (
    <section className="bg-bg py-32 border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/3">
            <Award className="text-primary mb-6 opacity-80" size={32} strokeWidth={1} />
            <h2 className="text-4xl md:text-5xl font-heading font-light text-white mb-6">Guest Favorites</h2>
            <p className="text-text-muted font-light leading-relaxed mb-8">
              The dishes that have defined our legacy. Consistently requested, universally praised, and fundamentally essential to the Taste of Home experience.
            </p>
            <div className="w-16 h-px bg-primary"></div>
          </div>

          <motion.div 
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="w-full md:w-2/3 flex flex-col gap-6"
          >
            {topDishes.map((dish, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                }}
                className="flex items-center gap-6 border border-luxury p-4 group hover:border-primary transition-colors duration-500 bg-cream/5"
              >
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden border border-luxury">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-heading font-light text-white group-hover:text-primary transition-colors duration-500">{dish.name}</h3>
                  <p className="text-text-muted font-light text-sm mt-1">{dish.desc}</p>
                </div>
                <div className="hidden sm:block pr-6">
                  <span className="text-primary font-serif italic text-4xl opacity-20 group-hover:opacity-100 transition-opacity duration-500">{dish.rank}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default MostOrdered;
