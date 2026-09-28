import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const seasons = [
  {
    name: "Summer Collection",
    desc: "Light, vibrant, and cooling ingredients sourced directly from coastal farms.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1200",
    color: "from-[#F7E8D0]/10"
  },
  {
    name: "Monsoon Reserve",
    desc: "Earthy, robust flavors featuring wild mushrooms and aged spices.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    color: "from-primary/10"
  }
];

const SeasonalCollections = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-bg py-32 border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20 relative z-10">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ The Ephemeral Menu ~</span>
          <h2 className="text-4xl md:text-6xl font-heading font-light text-white">Seasonal Collections</h2>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {seasons.map((season, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } }
              }}
              className="group relative overflow-hidden h-[600px] border border-luxury cursor-pointer"
            >
              <img 
                src={season.image} 
                alt={season.name} 
                className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-110"
              />
              
              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-90 transition-opacity duration-1000 group-hover:opacity-100"></div>
              <div className={`absolute inset-0 bg-gradient-to-b ${season.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="text-primary tracking-widest uppercase text-[10px] font-semibold mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 opacity-0 group-hover:opacity-100">Limited Time</span>
                <h3 className="text-4xl font-heading font-light text-white mb-4 transform transition-transform duration-700 group-hover:-translate-y-2">{season.name}</h3>
                <p className="text-text-muted font-light leading-relaxed transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100">
                  {season.desc}
                </p>
                <div className="w-0 group-hover:w-full h-px bg-primary mt-8 transition-all duration-1000 ease-in-out"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SeasonalCollections;
