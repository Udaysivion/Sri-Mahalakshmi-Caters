import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Compass, Leaf, Award, Shield } from 'lucide-react';

const values = [
  { icon: <Leaf size={32} strokeWidth={1} />, title: "Sourcing", desc: "We procure 100% organic, farm-to-table ingredients daily from local artisans, ensuring unparalleled freshness." },
  { icon: <Compass size={32} strokeWidth={1} />, title: "Authenticity", desc: "Our recipes remain untouched by modern shortcuts, preserving the pure heritage of Indian gastronomy." },
  { icon: <Award size={32} strokeWidth={1} />, title: "Excellence", desc: "A Michelin-star level commitment to flawless execution and meticulous presentation in every dish." },
  { icon: <Shield size={32} strokeWidth={1} />, title: "Hospitality", desc: "Anticipatory, invisible service that treats every single guest as if they were royalty in our own home." }
];

const OurPhilosophy = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-32 bg-bg border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24 relative z-10">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ The Foundation ~</span>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-white mb-6">Our Philosophy</h2>
          <p className="text-text-muted font-light max-w-2xl mx-auto text-lg leading-relaxed">
            The unyielding principles that guide every decision we make, from the soil where our ingredients grow to the moment a plate reaches your table.
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mt-12"></div>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((val, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="bg-transparent p-12 border border-luxury text-center group hover:border-primary transition-colors duration-500 relative overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto border border-luxury flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-bg transition-colors duration-500 rounded-full">
                  {val.icon}
                </div>
                <h4 className="text-white font-light text-2xl mb-4 group-hover:text-primary transition-colors">{val.title}</h4>
                <p className="text-text-muted font-light text-sm leading-relaxed">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default OurPhilosophy;
