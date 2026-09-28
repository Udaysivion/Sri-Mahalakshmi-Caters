import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChefHat, Quote } from 'lucide-react';

const curatedDishes = [
  {
    id: 1,
    name: "Saffron Sea Bass",
    origin: "Coastal Kerala",
    ingredients: "Fresh Catch, Kashmiri Saffron, Coconut Emulsion",
    desc: "A masterpiece of coastal flavors, pan-seared to absolute perfection and resting on a bed of delicate coconut emulsion. Sourced daily from local fishers and elevated with the rarest saffron threads.",
    pairing: "Pairs exquisitely with our house-fermented Mango Kombucha.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=1200",
    reverse: false
  },
  {
    id: 2,
    name: "Smoked Lamb Chops",
    origin: "Royal Awadhi Cuisine",
    ingredients: "New Zealand Lamb, Himalayan Pink Salt, Applewood Smoke",
    desc: "Cured on a Himalayan salt block for 24 hours before being slow-smoked over aged applewood. The result is a tender, melt-in-your-mouth experience that pays homage to royal feasts of the past.",
    pairing: "Best enjoyed with a robust, full-bodied mocktail.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200",
    reverse: true
  }
];

const ChefsCuratedCollection = () => {
  return (
    <section className="py-32 bg-bg border-b border-luxury relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-32 relative z-10">
          <ChefHat size={32} className="text-primary mx-auto mb-6 opacity-80" strokeWidth={1} />
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ The Masterpiece Series ~</span>
          <h2 className="text-4xl md:text-6xl font-heading font-light text-white">Chef's Curated Collection</h2>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mt-8"></div>
        </div>

        <div className="space-y-32">
          {curatedDishes.map((dish, idx) => (
            <DishEditorial key={dish.id} dish={dish} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

const DishEditorial = ({ dish, idx }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className={`flex flex-col ${dish.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
      
      {/* Image Block */}
      <motion.div 
        initial={{ opacity: 0, x: dish.reverse ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full lg:w-1/2 relative group"
      >
        <div className="relative z-10 overflow-hidden border border-luxury aspect-[4/5] md:aspect-[16/10] lg:aspect-square">
          <img 
            src={dish.image} 
            alt={dish.name} 
            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"></div>
        </div>
        
        {/* Decorative Offset Frame */}
        <div className={`absolute -bottom-6 ${dish.reverse ? '-left-6' : '-right-6'} w-full h-full border border-primary/30 z-0 transition-transform duration-1000 group-hover:translate-x-2 group-hover:-translate-y-2`}></div>
      </motion.div>

      {/* Editorial Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full lg:w-1/2 relative z-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px bg-primary"></div>
          <span className="text-primary text-[10px] tracking-widest uppercase font-semibold">Origin: {dish.origin}</span>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-heading font-light text-white mb-4 leading-tight">
          {dish.name}
        </h3>
        
        <p className="text-text-muted font-light text-base md:text-lg leading-relaxed mb-6">
          {dish.desc}
        </p>
        
        <div className="border border-luxury p-5 md:p-6 bg-cream/5 mb-6 hover:border-primary transition-colors duration-500">
          <h4 className="text-white text-xs tracking-widest uppercase mb-2 md:mb-3">Signature Ingredients</h4>
          <p className="text-text-muted font-light text-sm italic">{dish.ingredients}</p>
        </div>

        <div className="flex items-start gap-4 p-4 md:p-5 bg-primary/5 border-l-2 border-primary">
          <Quote className="text-primary flex-shrink-0 mt-1" size={16} />
          <div>
            <span className="block text-white text-[10px] tracking-widest uppercase font-semibold mb-1 md:mb-2">Sommelier Suggestion</span>
            <p className="text-text-muted font-light text-sm italic">{dish.pairing}</p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ChefsCuratedCollection;
