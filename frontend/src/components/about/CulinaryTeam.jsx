import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const teamData = [
  {
    name: "Arjun Mehta",
    role: "Chef de Cuisine",
    bio: "With over 15 years mastering regional Indian spices, Arjun brings an innovative yet deeply respectful approach to our daily tasting menus.",
    image: "/images/chef.png"
  },
  {
    name: "Priya Singh",
    role: "Head Pastry Chef",
    bio: "Priya bridges the gap between traditional Indian mithai and classical French pastry techniques, resulting in extraordinary desserts.",
    image: "/images/pastry_chef.png"
  },
  {
    name: "Vikram Desai",
    role: "Director of Hospitality",
    bio: "Vikram ensures every guest experiences anticipatory, flawless service. His philosophy: 'Hospitality is invisible until it is felt.'",
    image: "/images/founder.png"
  }
];

const CulinaryTeam = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-32 bg-bg border-b border-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">~ The Artisans ~</span>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-white mb-6">Our Culinary Team</h2>
          <p className="text-text-muted font-light max-w-2xl mx-auto text-lg">
            Meet the passionate individuals who dedicate their lives to executing our vision flawlessly, day in and day out.
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mt-12"></div>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamData.map((member, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[3/4] border border-luxury mb-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-heading font-light text-white mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                <span className="text-primary tracking-[0.2em] uppercase text-[10px] font-semibold block mb-4">{member.role}</span>
                <p className="text-text-muted font-light text-sm leading-relaxed max-w-sm mx-auto opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default CulinaryTeam;
