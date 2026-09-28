import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Star } from 'lucide-react';

const featuredAwards = [
  { year: "2024", title: "Two Michelin Stars", body: "Michelin Guide" },
  { year: "2023", title: "World's 50 Best - #14", body: "William Reed" },
  { year: "2021", title: "Exceptional Hospitality", body: "James Beard Foundation" }
];

const FeaturedAwards = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 bg-bg border-b border-luxury relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <Award size={32} className="text-primary mx-auto mb-4 opacity-80" strokeWidth={1} />
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ Global Recognition ~</span>
          <h2 className="text-3xl md:text-5xl font-heading font-light text-white">Award-Winning Excellence</h2>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {featuredAwards.map((award, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="bg-cream/5 border border-luxury p-8 text-center group hover:border-primary transition-colors duration-500 relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                <Star size={48} className="text-primary" strokeWidth={1} />
              </div>
              
              <span className="text-primary font-serif italic text-3xl block mb-4">{award.year}</span>
              <h3 className="text-xl font-heading font-light text-white mb-2 group-hover:text-primary transition-colors duration-500">{award.title}</h3>
              <p className="text-text-muted text-[10px] tracking-widest uppercase font-semibold">{award.body}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedAwards;
