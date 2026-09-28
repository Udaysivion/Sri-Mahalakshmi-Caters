import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Star, Users, MapPin, Coffee, Utensils, Music, Video, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const SectionHeader = ({ title, subtitle, light = true }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-24 relative z-10">
      <span className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">~ {subtitle} ~</span>
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-light ${light ? 'text-white' : 'text-primary'}`}>{title}</h2>
      <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mt-8"></div>
    </motion.div>
  );
};

export const FamilyCombos = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const combos = [
    { title: "Weekend Family Feast", desc: "A massive spread of biryani, starters, desserts, and beverages meant for a family of 4.", icon: <Users size={24}/> },
    { title: "Kids Special Combo", desc: "Non-spicy chicken nuggets, french fries, sweet corn, and a surprise dessert toy.", icon: <Star size={24}/> },
    { title: "Grand Celebration", desc: "Perfect for birthdays. Includes a premium 1kg cake, full course meal for 10 people.", icon: <Award size={24}/> }
  ];

  return (
    <section className="py-32 bg-bg relative border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Exclusive Packages" subtitle="Private Dining" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={ref}>
          {combos.map((combo, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: idx * 0.2, duration: 1, ease: "easeOut" }} className="bg-transparent border border-luxury p-10 hover:border-primary transition-colors duration-700 group relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 transform translate-x-10 -translate-y-10 group-hover:bg-primary/10 transition-colors duration-700"></div>
               <div className="text-primary mb-8 relative z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500">{combo.icon}</div>
               <h3 className="text-2xl font-heading font-light text-white mb-4 relative z-10 leading-tight">{combo.title}</h3>
               <p className="text-text-muted mb-10 relative z-10 font-light text-sm leading-relaxed">{combo.desc}</p>
               <div className="flex gap-4 relative z-10 border-t border-luxury pt-8 mt-auto">
                 <a href="https://www.swiggy.com/" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center border border-luxury py-2 hover:border-[#fc8019] hover:bg-[#fc8019]/5 transition-all duration-500 bg-bg/50 group">
                   <svg viewBox="0 0 100 30" className="h-3 md:h-4 text-text-muted group-hover:text-[#fc8019] transition-colors">
                     <text x="50" y="22" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="currentColor">SWIGGY</text>
                   </svg>
                 </a>
                 <a href="https://www.zomato.com/" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center border border-luxury py-2 hover:border-[#cb202d] hover:bg-[#cb202d]/5 transition-all duration-500 bg-bg/50 group">
                   <svg viewBox="0 0 100 30" className="h-3 md:h-4 text-text-muted group-hover:text-[#cb202d] transition-colors">
                     <text x="50" y="22" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontStyle="italic" fontSize="26" fill="currentColor">zomato</text>
                   </svg>
                 </a>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RestaurantExperience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const features = [
    { title: "Luxury Dining Hall", icon: <Star strokeWidth={1} size={32} /> },
    { title: "Private VIP Rooms", icon: <Award strokeWidth={1} size={32} /> },
    { title: "Outdoor Seating", icon: <MapPin strokeWidth={1} size={32} /> },
    { title: "Live Kitchen", icon: <Utensils strokeWidth={1} size={32} /> },
    { title: "Kids Play Area", icon: <Users strokeWidth={1} size={32} /> },
    { title: "Live Music", icon: <Music strokeWidth={1} size={32} /> },
  ];

  return (
    <section className="py-32 bg-bg text-white relative overflow-hidden border-b border-luxury">
       <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 bg-fixed filter grayscale"></div>
       <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg z-10"></div>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
         <SectionHeader title="The Grand Experience" subtitle="Atmosphere" />
         <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-luxury">
           {features.map((f, i) => (
             <motion.div key={i} variants={fadeUp} className={`flex flex-col items-center justify-center p-12 bg-transparent hover:bg-white/5 transition-colors text-center ${i !== 0 ? 'border-l border-luxury' : ''} ${i > 2 ? 'border-t border-luxury lg:border-t-0' : ''}`}>
               <div className="text-primary mb-6 opacity-80">{f.icon}</div>
               <span className="font-heading font-light text-xs tracking-[0.2em] uppercase">{f.title}</span>
             </motion.div>
           ))}
         </motion.div>
       </div>
    </section>
  );
};

export const FounderSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section className="py-32 bg-bg relative border-b border-luxury">
       <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-20">
         <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="w-full md:w-5/12 relative">
            <div className="relative overflow-hidden border border-luxury p-2 bg-cream/20">
               <img src="/images/chef.png" alt="Executive Chef" className="w-full object-cover aspect-[4/5] filter grayscale contrast-125" />
               <div className="absolute inset-2 bg-gradient-to-t from-bg via-transparent to-transparent flex items-end p-8">
                 <div className="text-white">
                   <h3 className="font-heading font-light tracking-wide text-3xl">Rajeev Sharma</h3>
                   <p className="text-primary text-xs tracking-[0.2em] uppercase mt-2">Executive Chef</p>
                 </div>
               </div>
            </div>
         </motion.div>
         <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }} className="w-full md:w-7/12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white mb-10 leading-tight">
              "Food is not just sustenance; it's a bridge to our most cherished <i className="font-serif text-primary">memories.</i>"
            </h2>
            <div className="w-12 h-px bg-primary mb-10"></div>
            <p className="text-text-muted text-lg leading-relaxed mb-8 font-light">
              When I established Taste of Home, my vision was simple: to create a space where families could gather, leave their worries at the door, and share a meal that tasted exactly like a royal Indian feast. 
            </p>
            <p className="text-text-muted text-lg leading-relaxed mb-12 font-light">
              Every recipe we serve has been passed down through generations. We don't compromise on ingredients, and we certainly don't compromise on hospitality. Welcome to our home.
            </p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Stylized_signature_sample.svg" alt="Signature" className="h-16 opacity-30 filter invert" />
         </motion.div>
       </div>
    </section>
  );
};

export const JourneyTimeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const milestones = [
    { year: "2006", title: "The Beginning", desc: "Started as a highly exclusive 20-seater dining room in New Delhi." },
    { year: "2012", title: "First Expansion", desc: "Moved to a luxury dining hall featuring an open culinary theater." },
    { year: "2018", title: "National Award", desc: "Awarded 'Best Fine Dining' in the Culinary Excellence Awards." },
    { year: "2024", title: "Global Recognition", desc: "Opened our 5th premium branch and achieved Michelin recognition." },
  ];

  return (
    <section className="py-32 bg-bg border-b border-luxury relative">
      <SectionHeader title="Our Heritage" subtitle="The Legacy" />
      <div className="max-w-5xl mx-auto px-4" ref={ref}>
        <div className="relative border-l border-luxury md:border-none">
           {/* Desktop center line */}
           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-luxury transform -translate-x-1/2"></div>
           
           {milestones.map((m, i) => (
             <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.3, duration: 1, ease: "easeOut" }} className={`mb-16 md:mb-32 flex justify-between items-center w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12"></div>
                <div className="absolute -left-[5px] md:relative md:left-0 z-10 w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(212,175,55,0.8)] md:mx-auto"></div>
                <div className="w-full md:w-5/12 pl-10 md:pl-0">
                  <div className={`p-8 border border-luxury bg-cream/10 backdrop-blur-sm hover:border-primary/50 transition-colors duration-500 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'text-left md:pl-10'}`}>
                    <span className="text-primary font-light text-sm tracking-[0.3em] block mb-4">{m.year}</span>
                    <h3 className="text-3xl font-heading font-light text-white mb-4">{m.title}</h3>
                    <p className="text-text-muted text-sm font-light leading-relaxed">{m.desc}</p>
                  </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export const FestivalBanner = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-bg border-b border-luxury">
       <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] filter grayscale"></div>
       <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 border border-luxury p-16 bg-cream/5 backdrop-blur-sm">
         <div className="text-white text-center md:text-left">
           <span className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Exclusive Event</span>
           <h2 className="text-4xl md:text-5xl font-heading font-light mb-6">Grand Weekend Feast</h2>
           <p className="text-lg text-text-muted font-light max-w-xl">Join us every Saturday and Sunday for an unlimited royal feast featuring over 50 premium signature dishes curated by our executive chef.</p>
         </div>
         <div className="flex-shrink-0">
           <Link to="/reserve" className="inline-block border border-primary text-primary px-10 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-bg transition-all duration-500">
             Reserve Your Table
           </Link>
         </div>
       </div>
    </section>
  );
};
