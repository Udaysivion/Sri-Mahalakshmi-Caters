import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary opacity-20 mb-6">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
  </svg>
);

export const FounderEditorial = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-bg border-b border-luxury pt-12 pb-32 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 transform skew-x-12 translate-x-32 pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div ref={ref} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1 }} className="w-full lg:w-1/2 relative">
            <div className="relative border border-luxury p-2 bg-cream/10 backdrop-blur-sm z-10">
              <img src="/images/founder.png" alt="The Founder" className="w-full h-[600px] object-cover contrast-110" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-primary/30 z-0"></div>
          </motion.div>

          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ The Heritage ~</span>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-white mb-2">Vikram Singhania</h2>
            <p className="text-text-muted text-xs tracking-widest uppercase mb-10">Founder & Visionary</p>
            
            <QuoteIcon />
            <p className="text-2xl text-white font-light italic leading-relaxed mb-10 font-heading">
              "True luxury is not loud. It is the quiet anticipation of a guest's needs, the immaculate plating of a heritage recipe, and the profound feeling of coming home."
            </p>
            
            <p className="text-text-muted font-light leading-relaxed mb-10 max-w-md">
              Established in 1998, Vikram's vision was never just to open a restaurant. It was to build a sanctuary where the lost arts of traditional Indian gastronomy could be celebrated in a world-class, Michelin-standard environment.
            </p>

            {/* SVG Signature */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" className="h-16 text-primary opacity-50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M40 70 C 40 40, 60 20, 80 40 C 100 60, 50 80, 40 70 C 30 60, 70 30, 90 50 C 110 70, 140 40, 130 50 C 120 60, 150 70, 170 50 C 190 30, 160 80, 180 70 C 200 60, 220 30, 210 50 C 200 70, 240 80, 260 50" />
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export const MasterChefEditorial = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-bg border-b border-luxury py-32 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/5 transform -skew-x-12 -translate-x-32 pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          
          <motion.div ref={ref} initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1 }} className="w-full lg:w-5/12 relative">
            <img src="/images/chef.png" alt="Master Chef" className="w-full h-[700px] object-cover contrast-110 border border-luxury" />
            
            {/* Overlay Badge */}
            <div className="absolute bottom-8 -left-8 bg-bg border border-luxury p-6 shadow-2xl">
              <Award className="text-primary mb-3" size={32} strokeWidth={1} />
              <p className="text-white font-heading text-lg">3x Michelin Star</p>
              <p className="text-text-muted text-[10px] tracking-widest uppercase mt-1">Culinary Excellence</p>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className="w-full lg:w-7/12 flex flex-col justify-center">
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ The Artisan ~</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-2 leading-tight">
              Meet Master Chef <br/><i className="font-serif text-primary">Rajeev Sharma</i>
            </h2>
            <div className="w-16 h-px bg-primary my-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
              <div>
                <h4 className="text-white font-semibold tracking-widest text-xs uppercase mb-4 border-b border-luxury pb-2">Experience</h4>
                <ul className="space-y-3">
                  <li className="text-text-muted text-sm font-light flex justify-between"><span>Le Bernardin, NY</span> <span className="text-primary">2010</span></li>
                  <li className="text-text-muted text-sm font-light flex justify-between"><span>Gaggan, Bangkok</span> <span className="text-primary">2015</span></li>
                  <li className="text-text-muted text-sm font-light flex justify-between"><span>Taste of Home</span> <span className="text-primary">Present</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold tracking-widest text-xs uppercase mb-4 border-b border-luxury pb-2">Philosophy</h4>
                <p className="text-text-muted text-sm font-light leading-relaxed">
                  "Respect the ingredient. Do not mask its true nature. We forage, we source ethically, and we plate with the precision of a watchmaker."
                </p>
              </div>
            </div>

            <div className="p-6 border border-luxury/50 bg-cream/5 backdrop-blur-sm relative overflow-hidden group cursor-default">
               <div className="absolute inset-0 bg-primary/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
               <h4 className="text-white text-xs tracking-widest uppercase mb-2 relative z-10">Signature Masterpiece</h4>
               <p className="text-primary font-heading text-xl mb-1 relative z-10">Truffle Infused Dal Bukhara</p>
               <p className="text-text-muted font-light text-sm relative z-10">Slow-cooked over charcoal for 48 hours, finished with 24k gold leaf and black winter truffle.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
