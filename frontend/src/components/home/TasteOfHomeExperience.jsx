import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const journeySteps = [
  "Reservation",
  "Arrival",
  "Welcome Drink",
  "Chef Experience",
  "Premium Dining",
  "Signature Dessert",
  "Memorable Goodbye"
];

export const TasteOfHomeExperience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative min-h-screen bg-bg border-b border-luxury overflow-hidden flex flex-col justify-center py-24">
      {/* Background large text / noise */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.02]">
        <h2 className="text-[15rem] font-heading font-black whitespace-nowrap text-white">THE EXPERIENCE</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Large Cinematic Image */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative group"
        >
          <div className="absolute inset-0 bg-primary/20 transform -translate-x-4 translate-y-4 border border-luxury transition-transform duration-700 group-hover:translate-x-0 group-hover:translate-y-0 z-0"></div>
          <div className="relative z-10 overflow-hidden border border-luxury">
            <img 
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Dining Experience" 
              className="w-full h-[600px] object-cover opacity-90 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"></div>
          </div>
        </motion.div>

        {/* Right: The Journey Content */}
        <div className="w-full lg:w-1/2">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}>
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ The Taste of Home Experience ~</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-8 leading-tight">
              A Journey of <br/><i className="font-serif text-primary">Sensory Luxury</i>
            </h2>
            <div className="w-16 h-px bg-primary mb-8"></div>
            <p className="text-text-muted font-light leading-relaxed mb-12 text-sm md:text-base max-w-lg">
              We do not merely serve food; we orchestrate an unforgettable evening. From the moment you step through our doors to the lingering taste of our signature desserts, every second is designed to elevate your senses.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" 
            animate={inView ? "visible" : "hidden"} 
            variants={staggerContainer}
            className="mb-12"
          >
            <div className="flex flex-col gap-4">
              {journeySteps.map((step, index) => (
                <motion.div key={index} variants={fadeUp} className="flex items-center gap-6 group">
                  <span className="text-primary font-heading italic text-xl w-6 opacity-50 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                  <div className="flex-1 h-px bg-luxury relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </div>
                  <span className="text-white text-xs tracking-[0.2em] uppercase font-light w-40 text-right group-hover:text-primary transition-colors">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp}>
            <Link to="/reserve" className="inline-flex items-center gap-4 border border-luxury text-white px-8 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-bg hover:border-primary transition-all duration-500 group">
              Reserve Your Experience
              <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
