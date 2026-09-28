import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Star } from 'lucide-react';

const awardsData = [
  {
    year: "2024",
    title: "Two Michelin Stars",
    body: "Michelin Guide",
    significance: "Awarded for exceptional cooking, requiring profound culinary skill and carefully crafted dishes of outstanding quality.",
    requirement: "Maintained a flawless consistency of taste, technique, and ingredient quality over 10 consecutive unannounced visits."
  },
  {
    year: "2023",
    title: "World's 50 Best Restaurants - #14",
    body: "William Reed Business Media",
    significance: "Recognized as the 14th best dining destination globally, standing among the titans of international gastronomy.",
    requirement: "Voted by an academy of over 1,000 international restaurant industry experts."
  },
  {
    year: "2021",
    title: "Exceptional Hospitality Award",
    body: "James Beard Foundation",
    significance: "Celebrated for anticipating guest needs and creating a flawless, emotionally resonant dining journey.",
    requirement: "Demonstrated an unparalleled commitment to guest satisfaction and service choreography."
  }
];

const AwardsTimeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-32 bg-bg border-b border-luxury relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-24">
          <Award size={40} className="text-primary mx-auto mb-6 opacity-80" strokeWidth={1} />
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ Global Recognition ~</span>
          <h2 className="text-4xl md:text-6xl font-heading font-light text-white mb-6">Awards & Distinctions</h2>
          <p className="text-text-muted font-light max-w-2xl mx-auto text-lg">
            Our relentless pursuit of perfection has been recognized by the most prestigious culinary institutions in the world.
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mt-12"></div>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {awardsData.map((award, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="bg-cream/5 border border-luxury p-10 group hover:border-primary transition-colors duration-500 relative"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                <Star size={64} className="text-primary" strokeWidth={1} />
              </div>
              
              <span className="text-primary font-serif italic text-4xl block mb-6">{award.year}</span>
              <h3 className="text-2xl font-heading font-light text-white mb-2">{award.title}</h3>
              <p className="text-primary text-[10px] tracking-widest uppercase font-semibold mb-8">{award.body}</p>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="text-white text-xs tracking-widest uppercase mb-2">The Significance</h4>
                  <p className="text-text-muted font-light text-sm leading-relaxed">{award.significance}</p>
                </div>
                <div>
                  <h4 className="text-white text-xs tracking-widest uppercase mb-2">The Requirement</h4>
                  <p className="text-text-muted font-light text-sm leading-relaxed">{award.requirement}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AwardsTimeline;
