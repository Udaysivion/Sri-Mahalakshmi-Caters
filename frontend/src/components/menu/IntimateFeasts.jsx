import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users } from 'lucide-react';

const feasts = [
  {
    title: "The Executive Tasting",
    guests: "For 2 to 4 Guests",
    desc: "A meticulous 7-course journey through our signature creations, designed for intimate business closures or profound celebrations.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "The Maharaja's Table",
    guests: "For 6 to 8 Guests",
    desc: "Our most exclusive offering. A grand, communal centerpiece featuring whole roasted lamb and rare saffron-infused biryanis, strictly limited to tables of up to 8.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000"
  }
];

const IntimateFeasts = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-bg py-32 border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ Curated Gatherings ~</span>
          <h2 className="text-4xl md:text-6xl font-heading font-light text-white mb-6">Intimate Feasts</h2>
          <p className="text-text-muted font-light max-w-2xl mx-auto">
            Experience the pinnacle of our culinary artistry through curated sharing menus, exclusively designed for intimate tables of up to 8 guests.
          </p>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {feasts.map((feast, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
              }}
              className="group relative h-[500px] border border-luxury overflow-hidden cursor-pointer"
            >
              <img 
                src={feast.image} 
                alt={feast.title} 
                className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Users size={14} />
                  <span className="text-[10px] tracking-widest uppercase font-semibold">{feast.guests}</span>
                </div>
                <h3 className="text-3xl font-heading font-light text-white mb-4 group-hover:text-primary transition-colors duration-500">{feast.title}</h3>
                <p className="text-text-muted font-light leading-relaxed mb-8 max-w-md transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {feast.desc}
                </p>
                <button className="self-start border border-luxury px-8 py-3 text-xs tracking-[0.2em] uppercase text-white hover:border-primary hover:text-primary transition-colors backdrop-blur-sm">
                  Inquire Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default IntimateFeasts;
