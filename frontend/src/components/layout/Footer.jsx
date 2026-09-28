import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#112A1F] text-white pt-12 pb-6 border-t border-white/5 relative z-10">
    <div className="max-w-7xl mx-auto px-6">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-10">
        
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3">
          <Link to="/" onClick={()=>window.scrollTo(0,0)} className="mb-4 inline-block">
            <img src="/logo-icon.jpg" alt="Sri Mahalakshmi" className="h-14 w-auto object-contain mix-blend-screen opacity-90 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="text-gray-400 text-xs leading-relaxed max-w-[250px] mb-6">
            Authentic South Indian culinary experiences and premium event catering since 2010.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#D4731A] hover:border-[#D4731A] transition-all shadow-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#D4731A] hover:border-[#D4731A] transition-all shadow-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.64l.36-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Links Grid (2 Columns on mobile for compactness) */}
        <div className="grid grid-cols-2 gap-8 md:gap-16 w-full md:w-auto text-center md:text-left">
          
          {/* Menu */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-5 opacity-80">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'The Menu', 'Catering', 'Gallery'].map(link => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(' ','-')}`} onClick={()=>window.scrollTo(0,0)} className="text-xs text-gray-400 hover:text-[#D4731A] transition-colors font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-5 opacity-80">Visit Us</h4>
            <ul className="space-y-3 text-xs text-gray-400 flex flex-col items-center md:items-start">
              <li className="flex items-center gap-2"><MapPin size={13} className="text-[#D4731A]" /> Warangal, India</li>
              <li className="flex items-center gap-2"><Phone size={13} className="text-[#D4731A]" /> +91 98765 43210</li>
              <li className="pt-2">
                <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Hours</span>
                <span className="font-bold text-white/90">11:00 AM – 11:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 tracking-wider">
        <p>&copy; {new Date().getFullYear()} Sri Mahalakshmi. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
      
    </div>
  </footer>
);

export default Footer;
