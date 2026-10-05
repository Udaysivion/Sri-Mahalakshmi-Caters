import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3 items-end">


      {/* WhatsApp */}
      <a href={`https://wa.me/917794800042?text=${encodeURIComponent('Namaste Sri Mahalakshmi Caters! I would like to inquire about food ordering & catering services.')}`} target="_blank" rel="noreferrer"
        className="group flex items-center gap-2" aria-label="Chat on WhatsApp">
        <span className="text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap"
          style={{ background:'#1A3A1C',color:'#E0B030',border:'1px solid rgba(224,176,48,0.4)',fontFamily:"'Playfair Display',sans-serif" }}>
          Chat on WhatsApp
        </span>
        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          style={{ background:'#25D366',boxShadow:'0 4px 14px rgba(37,211,102,0.45)' }}>
          <MessageCircle size={22} color="white"/>
        </div>
      </a>

      {/* Call */}
      <a href="tel:+917794800042" className="group flex items-center gap-2" aria-label="Call us">
        <span className="text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap"
          style={{ background:'#1A3A1C',color:'#E0B030',border:'1px solid rgba(224,176,48,0.4)',fontFamily:"'Playfair Display',sans-serif" }}>
          Call Now
        </span>
        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          style={{ background:'#D4731A',boxShadow:'0 4px 14px rgba(212,115,26,0.5)' }}>
          <Phone size={20} color="white"/>
        </div>
      </a>

      {/* Scroll Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}
            onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background:'#1B4332',border:'2px solid rgba(224,176,48,0.5)',color:'#E0B030',boxShadow:'0 4px 12px rgba(27,67,50,0.3)' }}
            aria-label="Scroll to top">
            <ArrowUp size={20}/>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingButtons;
