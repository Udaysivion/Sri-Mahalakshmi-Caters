import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timeline = [
  { year: "1998", title: "The Inception", desc: "Chef Rajeev Sharma opens a 4-table eatery in Old Delhi, focusing solely on preserving his grandmother's slow-cooked recipes." },
  { year: "2005", title: "The Expansion", desc: "Moving to a larger space, the restaurant begins importing rare spices directly from Kashmir, establishing our farm-to-table supply chain." },
  { year: "2012", title: "First Star", desc: "Awarded our first Michelin Star, recognizing the uncompromising dedication to traditional Indian gastronomy." },
  { year: "2018", title: "The Grand Estate", desc: "Relocation to our current architectural masterpiece, blending opulent dining halls with intimate, exclusive suites." },
  { year: "2025", title: "Global Recognition", desc: "Named in the top 50 restaurants worldwide, cementing our legacy as a pioneer of luxury Indian dining." }
];

const OriginTimeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-32 bg-bg relative border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24 relative z-10">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ The Journey ~</span>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-white">Our Origin Story</h2>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mt-8"></div>
        </div>

        <motion.div 
          ref={ref}
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-luxury"></div>

          <div className="space-y-16 md:space-y-32">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full z-10 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>

                <div className={`w-full md:w-1/2 pl-12 ${idx % 2 === 0 ? 'md:pl-16 md:pr-0' : 'md:pl-0 md:pr-16'}`}>
                  <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                    <span className="text-primary font-serif italic text-6xl opacity-30 mb-4">{item.year}</span>
                    <h3 className="text-2xl font-heading font-light text-white mb-4">{item.title}</h3>
                    <p className="text-text-muted font-light leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/2"></div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default OriginTimeline;
