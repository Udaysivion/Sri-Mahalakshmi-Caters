import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const tabs = ['All', 'Interior', 'Culinary', 'Events'];

  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800', category: 'Interior', title: 'Main Dining Hall' },
    { id: 2, src: 'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=800', category: 'Culinary', title: 'Aromatic Biryani' },
    { id: 3, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', category: 'Interior', title: 'Family Dining Area' },
    { id: 4, src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800', category: 'Culinary', title: 'Spicy Biryani Feast' },
    { id: 5, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800', category: 'Culinary', title: 'Traditional Thali' },
    { id: 6, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', category: 'Events', title: 'Family Celebrations' },
    { id: 7, src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800', category: 'Events', title: 'Event Gathering' },
    { id: 8, src: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800', category: 'Culinary', title: 'Paneer Butter Masala' },
    { id: 9, src: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800', category: 'Culinary', title: 'Chicken Dum Biryani' },
    { id: 10, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', category: 'Interior', title: 'Outdoor Seating' },
    { id: 11, src: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=800', category: 'Culinary', title: 'Tandoori Specialties' },
    { id: 12, src: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800', category: 'Interior', title: 'Ambient Dining Setting' },
  ];

  const filteredImages = activeTab === 'All' ? images : images.filter(img => img.category === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: '#FDF6E3', minHeight: '100vh' }}
    >
      <Helmet>
        <title>Gallery | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Moments from Sri Mahalakshmi Kitchen & Caterers — our beautiful ambience and delicious food." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-20 overflow-hidden" style={{ background: '#1B4332' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, #C8A84B, transparent)' }} />
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.9), rgba(27,67,50,0.95))' }} />

        <div className="relative z-10 text-center py-14 px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-bold mb-2 tracking-widest uppercase"
            style={{ color: '#C8A84B' }}
          >
            ~ Visual Journey ~
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-4xl md:text-6xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm"
            style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 500, margin: '0 auto' }}
          >
            Moments from our restaurant — beautiful ambience and delicious food.
          </motion.p>
        </div>

        <div style={{ height: '40px', background: '#FDF6E3', clipPath: 'ellipse(100% 100% at 50% 100%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Tab Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-2.5 text-sm font-bold rounded transition-all"
              style={{
                background: activeTab === tab ? '#C8A84B' : 'white',
                color: activeTab === tab ? '#1B4332' : '#2C1A0E',
                border: `1px solid ${activeTab === tab ? '#C8A84B' : 'rgba(200,168,75,0.3)'}`,
                fontFamily: "'Lato', sans-serif",
                letterSpacing: '0.05em',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative group aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                style={{ border: '2px solid rgba(200,168,75,0.25)' }}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(27,67,50,0.7)' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ background: '#C8A84B' }}
                  >
                    <Maximize2 size={20} style={{ color: '#1B4332' }} />
                  </div>
                  <span
                    className="text-xs font-bold uppercase px-3 py-1 rounded mb-2"
                    style={{ background: 'rgba(200,168,75,0.2)', color: '#C8A84B', border: '1px solid rgba(200,168,75,0.4)' }}
                  >
                    {img.category}
                  </span>
                  <h3 className="text-white font-bold text-base text-center px-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {img.title}
                  </h3>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-0 transition-opacity">
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#C8A84B', color: '#1B4332' }}>
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4"
            style={{ background: 'rgba(13,40,24,0.95)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Top gold border on lightbox */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, #C8A84B, transparent)' }} />

            <button
              className="absolute top-6 right-6 flex items-center gap-2 text-sm font-bold transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setSelectedImage(null)}
            >
              Close <X size={20} />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)', border: '2px solid rgba(200,168,75,0.4)' }}
              onClick={e => e.stopPropagation()}
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-center"
            >
              <h3
                className="text-white text-xl font-bold mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {selectedImage.title}
              </h3>
              <p className="text-xs font-bold uppercase" style={{ color: '#C8A84B', letterSpacing: '0.1em' }}>
                {selectedImage.category}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery;