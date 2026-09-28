const fs = require('fs');
const pages = ['About', 'Menu', 'Gallery', 'Contact', 'PrivacyPolicy', 'Terms', 'NotFound'];

pages.forEach(page => {
  const content = `import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ${page} = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen text-center flex flex-col items-center justify-center bg-bg"
    >
      <Helmet>
        <title>Taste of Home | ${page}</title>
      </Helmet>
      <h1 className="text-5xl font-heading font-bold text-primary mb-4">${page} Page</h1>
      <p className="text-gray-600 text-lg">We are preparing something delicious for you.</p>
    </motion.div>
  );
};

export default ${page};`;

  fs.writeFileSync(`c:/Users/ADMIN/Desktop/restaurant/frontend/src/pages/${page}.jsx`, content);
});
