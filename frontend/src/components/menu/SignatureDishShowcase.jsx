import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const SignatureDishShowcase = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

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
              src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=2000" 
              alt="Signature Dish" 
              className="w-full h-full object-cover transform transition-transform duration-[3000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full lg:w-1/2 p-8 md:p-16">
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ The Icon ~</span>
            <h2 className="text-5xl md:text-7xl font-heading font-light text-white mb-6 leading-tight">
              Truffle Butter <br/><i className="font-serif text-primary">Naan</i>
            </h2>
            <p className="text-white/80 font-light text-lg leading-relaxed mb-8 max-w-md">
              A modern interpretation of a classic. Fermented sourdough naan baked in our 500-degree clay oven, brushed with cultured French butter and shaved black truffle.
            </p>
            
            <div className="flex gap-4">
               <Quote className="text-primary opacity-50" size={32} strokeWidth={1} />
               <p className="text-text-muted font-light italic text-sm leading-relaxed max-w-sm mt-2">
                 "The moment the earthy scent of the truffle hits the warm bread, it completely redefines what Indian bread can be."
                 <span className="block mt-2 text-primary uppercase tracking-widest text-[8px] font-semibold">Food & Wine Magazine</span>
               </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default SignatureDishShowcase;
