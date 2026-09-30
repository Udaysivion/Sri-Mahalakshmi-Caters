import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useMenuData } from '../hooks/useMenuData';

const ChefsSpecial = () => {
  const { menuItems } = useMenuData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamically get the chef's special dish from the database
  const specialDish = (menuItems || []).find(item => item.special || item.is_signature) || (menuItems || [])[0] || {
    name: 'Special Chicken Dum Biryani',
    desc: 'Slow-cooked over gentle dum with fragrant aged basmati rice, farm-fresh chicken, and secret heritage spices.',
    price: 220
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pt-24 pb-20"
    >
      <Helmet>
        <title>Specials | Taste of Home | Authentic authentic style</title>
        <meta name="description" content="Discover our authentic village specials, crafted with love." />
      </Helmet>

      {/* Hero */}
      <div className="bg-white text-dark py-32 relative overflow-hidden border-b border-gray-200 mb-24 shadow-sm">
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <span className="text-secondary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">~ Authentic Flavours ~</span>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-dark">Chef Specials</h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">Experience the heartiest traditional recipes curated specially for you.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center pb-20">
        <h2 className="text-3xl font-heading font-bold text-dark mb-6">Today's Highlight</h2>
        <p className="text-lg text-gray-700 font-medium mb-10">Our kitchen is preparing fresh, seasonal delicacies using farm-sourced ingredients. Ask your server about today's fresh specials when you visit!</p>
        <div className="bg-white p-10 border border-gray-200 rounded-lg shadow-sm">
           <h3 className="text-2xl font-heading font-bold text-dark mb-4">{specialDish.name}</h3>
           <p className="text-gray-600 font-medium mb-6">{specialDish.desc || specialDish.description}</p>
           <span className="text-secondary font-bold text-xl block">₹{specialDish.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChefsSpecial;
