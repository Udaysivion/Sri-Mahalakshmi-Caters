import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Video } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const SectionHeader = ({ title, subtitle }) => (
  <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
    <span className="text-secondary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">~ {subtitle} ~</span>
    <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark">{title}</h2>
    <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
  </motion.div>
);

const Testimonials = () => {
  const allReviews = [
    { name: "Priya Sharma", type: "Google Review", rating: 5, text: "The most authentic Indian food I have ever tasted outside of my grandmother's kitchen." },
    { name: "Rahul Verma", type: "Food Critic", rating: 5, text: "A masterful display of spices and traditional cooking methods. The Mutton Biryani is absolute perfection." },
    { name: "Ananya Desai", type: "Family Dinner", rating: 5, text: "We celebrated our parent's 50th anniversary here. The staff treated us like family. Unforgettable experience." },
    { name: "Karan Singh", type: "Corporate Event", rating: 5, text: "Hosted our annual company dinner here. Flawless execution, brilliant food, and top-tier service." },
    { name: "Neha Gupta", type: "Celebrity", rating: 5, text: "My absolute favorite spot in the city. The Dal Makhani is to die for!" },
    { name: "Amit Patel", type: "Google Review", rating: 4, text: "Great food, family feel. Highly recommend reserving a table in advance because they are always booked." },
    { name: "Sneha Reddy", type: "Private Dining Experience", rating: 5, text: "They went out of their way to make our family dinner absolutely magical. Thank you Taste of Home!" },
    { name: "Vikram Malhotra", type: "Food Blogger", rating: 5, text: "A 5-star experience from the moment you walk through the doors." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-50 min-h-screen pt-24 pb-20">
      <Helmet>
        <title>Testimonials | Taste of Home</title>
        <meta name="description" content="Read what our guests have to say about their dining experience." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-32 pb-24 flex items-center justify-center min-h-[40vh] overflow-hidden mb-24 border-b border-gray-200 bg-white">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2000')" }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-secondary tracking-[0.2em] uppercase text-sm font-bold mb-6 block drop-shadow-md">
            ~ The Legacy ~
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl md:text-7xl font-heading font-bold mb-6 text-dark drop-shadow-sm">
            Guest Stories
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Don't just take our word for it. Hear from the thousands of happy families who have dined with us and experienced our authentic food.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Video Testimonial Placeholder */}
        <section className="mb-24">
           <SectionHeader title="Watch Our Stories" subtitle="Featured Reviews" />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
              ].map((img, i) => (
                <div key={i} className="relative aspect-video bg-white border border-gray-200 overflow-hidden rounded-md shadow-sm group cursor-pointer">
                  <img src={img} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white text-dark rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Video size={24} strokeWidth={2} />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white z-20">
                    <h4 className="font-heading font-bold text-2xl tracking-wide mb-1 drop-shadow-md">Authentic Taste</h4>
                    <p className="text-primary text-xs uppercase font-bold drop-shadow-md">Family Dinner</p>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* Written Reviews */}
        <section>
          <SectionHeader title="Wall of Love" subtitle="Customer Reviews" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allReviews.map((rev, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: (idx % 4) * 0.1, duration: 0.3 }} 
                className="bg-white px-6 py-8 rounded-md border border-gray-200 h-full flex flex-col relative group hover:border-secondary hover:shadow-md transition-all duration-300 overflow-hidden items-center text-center shadow-sm"
              >
                <div className="flex justify-center text-primary mb-4 gap-1">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} fill="currentColor" stroke="none" size={14}/>)}
                </div>
                
                <p className="text-gray-600 font-medium text-sm leading-relaxed mb-6 flex-grow">
                  "{rev.text}"
                </p>
                
                <div className="flex flex-col items-center mt-auto w-full z-10 relative border-t border-gray-100 pt-4">
                  <h4 className="text-lg text-dark font-bold mb-1">{rev.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{rev.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default Testimonials;
