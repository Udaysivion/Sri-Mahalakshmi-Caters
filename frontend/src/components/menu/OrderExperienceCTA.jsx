import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderExperienceCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-bg py-32 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">~ Your Journey Awaits ~</span>
          <h2 className="text-4xl md:text-6xl font-heading font-light text-white mb-8">Secure Your Experience</h2>
          <p className="text-text-muted font-light text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether dining within our walls or experiencing our culinary artistry at home, we ensure flawless execution.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mb-12">
            <Link to="/reserve" className="flex-1 border border-primary bg-primary/10 text-primary px-10 py-6 font-semibold text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-bg transition-all duration-500 backdrop-blur-sm">
              Reserve A Table
            </Link>
            
            <a href="https://www.swiggy.com/" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center border border-luxury py-6 hover:border-[#fc8019] hover:bg-[#fc8019]/5 transition-all duration-500 bg-bg/50 group backdrop-blur-sm">
               <svg viewBox="0 0 100 30" className="h-4 text-text-muted group-hover:text-[#fc8019] transition-colors">
                 <text x="50" y="22" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="currentColor">SWIGGY</text>
               </svg>
            </a>
            
            <a href="https://www.zomato.com/" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center border border-luxury py-6 hover:border-[#cb202d] hover:bg-[#cb202d]/5 transition-all duration-500 bg-bg/50 group backdrop-blur-sm">
               <svg viewBox="0 0 100 30" className="h-4 text-text-muted group-hover:text-[#cb202d] transition-colors">
                 <text x="50" y="22" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontStyle="italic" fontSize="26" fill="currentColor">zomato</text>
               </svg>
            </a>
          </div>

          {/* Concierge Connect */}
          <div className="pt-12 border-t border-luxury flex flex-col md:flex-row items-center justify-center gap-8">
            <span className="text-text-muted font-light text-sm uppercase tracking-widest">Connect with our Concierge:</span>
            <div className="flex gap-6">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-white hover:text-primary transition-colors font-light text-sm">
                <Phone size={16} className="text-primary" /> +91 98765 43210
              </a>
              <a href="https://wa.me/919876543210" className="flex items-center gap-2 text-white hover:text-green-500 transition-colors font-light text-sm">
                <MessageCircle size={16} className="text-green-500" /> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrderExperienceCTA;
