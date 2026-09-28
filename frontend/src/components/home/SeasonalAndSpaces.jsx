import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const spaces = [
  { name: "Grand Dining Hall", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000", desc: "Our magnificent main hall featuring acoustic perfection and opulent seating." },
  { name: "Private Dining Suite", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000", desc: "Exclusive, secluded dining rooms for intimate celebrations." },
  { name: "Rooftop Lounge", img: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=1000", desc: "Panoramic city views accompanied by our signature mixology." }
];

export const LuxurySpaces = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="bg-bg border-b border-luxury py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ The Architecture ~</span>
            <h2 className="text-4xl md:text-6xl font-heading font-light text-white leading-tight">
              Luxury Dining <br/><i className="font-serif text-primary">Spaces</i>
            </h2>
          </div>
          <p className="text-text-muted font-light text-sm max-w-sm mt-8 md:mt-0 pb-2">
            Every room is designed with a unique narrative, blending modern acoustics with heritage aesthetics.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaces.map((space, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group cursor-pointer relative h-[500px] border border-luxury overflow-hidden"
            >
              <img src={space.img} alt={space.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-heading text-2xl mb-2">{space.name}</h3>
                <p className="text-text-muted font-light text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{space.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const EventsAndCelebrations = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-bg border-b border-luxury py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-fixed opacity-[0.03]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ Intimate Gatherings ~</motion.span>
        <motion.h2 ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-6xl font-heading font-light text-white mb-6">
          Exclusive Dining
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-text-muted font-light max-w-2xl mx-auto mb-16 text-sm">
          We curate unparalleled culinary journeys for intimate groups. Please note that our restaurant is designed for personal dining experiences and we accommodate a maximum of 8 guests per table to maintain our standard of luxury service.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {['Curated Birthday Menus', 'Anniversary Dinners', 'Executive Business Dining', 'Intimate Family Gatherings'].map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15 }}
              className="border border-luxury p-8 bg-cream/5 hover:border-primary transition-colors duration-500 group cursor-pointer h-full flex items-center justify-center min-h-[120px]"
            >
              <h3 className="text-white font-heading text-lg group-hover:text-primary transition-colors text-center">{event}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="mt-16">
          <Link to="/reserve" className="inline-block border border-primary text-primary px-10 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-bg transition-all duration-500">
            Reserve An Exclusive Table
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
