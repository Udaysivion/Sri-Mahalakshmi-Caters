import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: "Fine Dining",
    desc: "An intimate evening of culinary artistry.",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Family Celebrations",
    desc: "Create legacy moments with your loved ones.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Executive Dinners",
    desc: "Impress clients with Michelin-star hospitality.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Exclusive Gatherings",
    desc: "Intimate settings for up to 8 guests.",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800"
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const SignatureExperiences = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="pt-32 pb-12 bg-bg border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="max-w-2xl">
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ Curated Moments ~</span>
            <h2 className="text-4xl md:text-6xl font-heading font-light text-white leading-tight">
              Signature <br/><i className="font-serif text-primary">Experiences</i>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.4 }} className="mt-8 md:mt-0">
            <Link to="/reserve" className="text-xs tracking-[0.2em] uppercase text-text-muted hover:text-primary transition-colors border-b border-luxury pb-1 hover:border-primary">
              Reserve Your Table
            </Link>
          </motion.div>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden" 
          animate={inView ? "visible" : "hidden"} 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {experiences.map((exp) => (
            <motion.div key={exp.id} variants={fadeUp} className="group cursor-pointer relative h-[380px] overflow-hidden border border-luxury">
              <div className="absolute inset-0 bg-bg z-0">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover opacity-80 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 transition-transform duration-500 group-hover:-translate-y-4">
                <div className="w-8 h-8 rounded-full border border-luxury/50 flex items-center justify-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-bg/50 backdrop-blur-sm">
                  <ArrowUpRight size={14} className="text-primary" />
                </div>
                <h3 className="text-2xl font-heading text-white mb-2">{exp.title}</h3>
                <p className="text-text-muted text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
