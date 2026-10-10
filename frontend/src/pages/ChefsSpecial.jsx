import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const ChefsSpecial = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pt-24 pb-20"
    >
      <Helmet>
        <title>Chef's Specials &amp; Signature Dishes | Sri Mahalakshmi Kitchen</title>
        <meta name="description" content="Discover our chef's signature South Indian dishes and authentic delicacies at Sri Mahalakshmi Kitchen (smahalakshmikitchen.com)." />
        <link rel="canonical" href="https://smahalakshmikitchen.com/chefs-special" />
        <meta property="og:title" content="Chef's Specials | Sri Mahalakshmi Kitchen" />
        <meta property="og:url" content="https://smahalakshmikitchen.com/chefs-special" />
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
           <h3 className="text-2xl font-heading font-bold text-dark mb-4">Wood-fired Handi Mutton</h3>
           <p className="text-gray-600 font-medium mb-6">Slow-cooked over a wood fire for 6 hours, infused with traditional spices and love.</p>
           <span className="text-secondary font-bold text-xl block">₹650</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChefsSpecial;
