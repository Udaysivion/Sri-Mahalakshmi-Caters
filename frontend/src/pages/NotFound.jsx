import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center bg-bg relative overflow-hidden"
    >
      <Helmet>
        <title>Taste of Home | Not Found</title>
      </Helmet>
      
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
        <span className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-6 block">~ 404 Error ~</span>
        <h1 className="text-5xl md:text-7xl font-heading font-light text-white mb-6">Page Not Found</h1>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-10"></div>
        <p className="text-text-muted font-light text-lg leading-relaxed mb-10">The page you are looking for has been removed or relocated.</p>
        <a href="/" className="inline-block border border-luxury text-white px-10 py-4 font-semibold text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-bg transition-all duration-500">
          Return to Home
        </a>
      </div>
    </motion.div>
  );
};

export default NotFound;