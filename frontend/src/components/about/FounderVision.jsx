import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const FounderVision = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-32 bg-bg border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center"
        >
          {/* Portrait Image */}
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute inset-0 bg-primary/5 transform -skew-x-12 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000"></div>
            <div className="relative border border-luxury overflow-hidden aspect-[3/4]">
              <img 
                src="/images/chef.png" 
                alt="Executive Chef Rajeev Sharma" 
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            
            {/* SVG Signature */}
            <div className="absolute -bottom-10 -right-10 w-48 bg-bg p-4 border border-luxury shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" className="h-12 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M40 70 C 40 40, 60 20, 80 40 C 100 60, 50 80, 40 70 C 30 60, 70 30, 90 50 C 110 70, 140 40, 130 50 C 120 60, 150 70, 170 50 C 190 30, 160 80, 180 70 C 200 60, 220 30, 210 50 C 200 70, 240 80, 260 50" />
              </svg>
            </div>
          </div>

          {/* Vision Text */}
          <div className="w-full lg:w-7/12">
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ The Visionary ~</span>
            <h2 className="text-4xl md:text-6xl font-heading font-light text-white mb-4">Rajeev Sharma</h2>
            <h3 className="text-xl text-text-muted font-light mb-10 italic">Founder & Executive Head Chef</h3>

            <div className="flex gap-6 mb-10">
              <Quote className="text-primary opacity-50 flex-shrink-0" size={40} strokeWidth={1} />
              <p className="text-white font-light text-xl md:text-2xl leading-relaxed italic">
                "Cooking is not merely about feeding the body; it is an art form that speaks directly to the soul. My mission has always been to transport our guests back to their roots, honoring the sacrifices of the generations before us."
              </p>
            </div>

            <div className="space-y-6 text-text-muted font-light leading-relaxed">
              <p>
                When I opened our first doors in 1998, I made a promise to my family: we would never compromise on authenticity. In an era where shortcuts in the kitchen have become the norm, we chose the harder path. We still grind our spices by hand daily. We still ferment our batters overnight in clay vessels.
              </p>
              <p>
                Our journey wasn't easy. Sourcing the exact strain of saffron from Kashmir, or the specific aged basmati required for our biryani, meant building relationships with farmers across the subcontinent. But seeing the emotion on a guest's face when they taste a flavor they haven't experienced since their childhood—that makes every challenge worth it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderVision;
