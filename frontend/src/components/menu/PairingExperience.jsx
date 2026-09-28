import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wine, Coffee } from 'lucide-react';

const pairings = [
  {
    icon: <Wine size={24} />,
    title: "Artisanal Mocktails",
    desc: "House-fermented kombuchas, botanical infusions, and distilled non-alcoholic spirits designed to cut through rich spices.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: <Coffee size={24} />,
    title: "Single Origin Teas",
    desc: "Rare flushes from the estates of Darjeeling, brewed table-side at exactly 85 degrees for the perfect post-dining digestion.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800"
  }
];

const PairingExperience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-bg py-32 border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ The Accompaniments ~</span>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-white">Curated Pairings</h2>
          </div>
          <p className="text-text-muted font-light max-w-sm mt-6 md:mt-0">
            Elevate your culinary journey with our selection of artisanal beverages, crafted specifically to complement our complex flavor profiles.
          </p>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {pairings.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="group flex flex-col sm:flex-row border border-luxury bg-cream/5 hover:border-primary transition-colors duration-500 overflow-hidden"
            >
              <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="w-full sm:w-3/5 p-8 flex flex-col justify-center">
                <div className="text-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-heading font-light text-white mb-4">{item.title}</h3>
                <p className="text-text-muted font-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default PairingExperience;
