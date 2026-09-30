import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMenuData } from '../../hooks/useMenuData';

const TodaysSpecial = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { menuItems, loading } = useMenuData();

  // Dynamically pick the daily special from live menu data
  const specialDish = (menuItems || []).find(item => item.special || item.is_signature) || (menuItems || [])[0] || {
    name: 'Special Chicken Dum Biryani',
    desc: "Crafted specifically for today's service using tender farm-fresh chicken slow-cooked with aged fragrant basmati rice, stone-ground spices, and pure desi ghee.",
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1200'
  };

  return (
    <section className="bg-bg py-32 border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative border border-luxury p-8 md:p-16 overflow-hidden group"
        >
          {/* Animated Background Spotlight */}
          <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-colors duration-1000 pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 bg-primary text-bg px-4 py-2 font-semibold text-xs tracking-widest uppercase flex items-center gap-2 z-20 shadow-xl">
                <Sparkles size={14} /> Limited Availability
              </div>
              <div className="relative overflow-hidden aspect-square border border-luxury">
                <img 
                  src={specialDish.img || specialDish.imageUrl || specialDish.image} 
                  alt={specialDish.name} 
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ Chef's Daily Creation ~</span>
              
              <h2 className="text-4xl md:text-6xl font-heading font-light text-white mb-6">
                {specialDish.name}
              </h2>
              
              <p className="text-text-muted font-light text-lg leading-relaxed mb-8">
                {specialDish.desc || specialDish.description}
              </p>

              <div className="flex flex-col gap-6 items-center lg:items-start mb-10 border-l-2 border-primary/30 pl-6 ml-2">
                <Quote className="text-primary/50" size={24} />
                <p className="text-white font-light italic text-xl">
                  "This dish represents the absolute soul of our kitchen. It is not just a meal; it is generations of authentic culinary heritage on a plate."
                </p>
                <span className="text-text-muted text-[10px] uppercase tracking-widest">— Sri Mahalakshmi Master Chef</span>
              </div>

              <Link to="/menu" className="inline-block border border-primary bg-primary text-bg px-10 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-transparent hover:text-primary transition-all duration-500">
                Explore Full Menu
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TodaysSpecial;
