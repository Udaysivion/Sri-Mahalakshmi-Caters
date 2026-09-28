import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Footer = () => (
  <footer style={{ background:'#1A3A1C', color:'white' }} className="relative overflow-hidden">
    {/* Top saffron stripe */}
    <div style={{ height:'4px', background:'linear-gradient(to right,#D4731A,#C4960A,#E0B030,#C4960A,#D4731A)' }}/>

    {/* Subtle dot pattern */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage:'radial-gradient(rgba(212,115,26,0.08) 1.5px, transparent 1.5px)', backgroundSize:'28px 28px', opacity:1 }}/>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background:'rgba(212,115,26,0.2)',border:'2px solid rgba(212,115,26,0.5)' }}>
              <span style={{ fontSize:'1.4rem' }}>🪔</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Playfair Display',sans-serif",color:'white',fontSize:'1.05rem',fontWeight:800 }}>
                Sri Mahalakshmi
              </div>
              <div style={{ color:'#E0B030',fontSize:'0.55rem',letterSpacing:'0.15em',fontWeight:600 }}>
                KITCHEN &amp; CATERERS
              </div>
            </div>
          </Link>

          <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.65)',fontFamily:"'Inter',sans-serif" }}>
            Authentic authentic style cooking with traditional recipes, fresh ingredients, and warm family hospitality since 2010.
          </p>

          <div className="flex gap-3">
            {[{icon:'📘',href:'#'},{icon:'📷',href:'#'},{icon:'▶️',href:'#'}].map((s,i)=>(
              <a key={i} href={s.href} className="text-xl hover:scale-110 transition-transform inline-block">{s.icon}</a>
            ))}
          </div>

          {/* Delivery Links */}
          <div className="flex gap-2">
            <a href="https://www.swiggy.com/" target="_blank" rel="noreferrer"
              className="flex-1 flex justify-center items-center py-2 rounded-lg text-xs font-bold"
              style={{ background:'rgba(252,128,25,0.15)',border:'1.5px solid rgba(252,128,25,0.45)',color:'#fc8019',fontFamily:"'Playfair Display',sans-serif" }}>
              SWIGGY
            </a>
            <a href="https://www.zomato.com/" target="_blank" rel="noreferrer"
              className="flex-1 flex justify-center items-center py-2 rounded-lg text-xs font-bold"
              style={{ background:'rgba(203,32,45,0.15)',border:'1.5px solid rgba(203,32,45,0.4)',color:'#cb202d',fontFamily:"'Playfair Display',sans-serif" }}>
              zomato
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold mb-5 uppercase"
            style={{ color:'#E0B030',letterSpacing:'0.18em',fontFamily:"'Playfair Display',sans-serif" }}>
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {[{label:'Home',path:'/'},{label:'Our Story',path:'/about'},{label:'The Menu',path:'/menu'},{label:'Gallery',path:'/gallery'},{label:'Contact Us',path:'/contact'}].map(l=>(
              <li key={l.label}>
                <Link to={l.path} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
                  className="text-sm inline-flex items-center gap-1 hover:translate-x-1 transition-all"
                  style={{ color:'rgba(255,255,255,0.7)',fontFamily:"'Inter',sans-serif" }}>
                  <span style={{ color:'#D4731A' }}>›</span> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold mb-5 uppercase"
            style={{ color:'#E0B030',letterSpacing:'0.18em',fontFamily:"'Playfair Display',sans-serif" }}>
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm" style={{ color:'rgba(255,255,255,0.7)' }}>
            <li className="flex items-start gap-3">
              <MapPin size={15} style={{ color:'#D4731A',flexShrink:0,marginTop:2 }}/>
              <span>Warangal, Telangana, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} style={{ color:'#D4731A',flexShrink:0 }}/>
              <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={15} style={{ color:'#D4731A',flexShrink:0 }}/>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Chat on WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} style={{ color:'#D4731A',flexShrink:0 }}/>
              <span>info@srimahalakshmi.com</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-xs font-bold mb-5 uppercase"
            style={{ color:'#E0B030',letterSpacing:'0.18em',fontFamily:"'Playfair Display',sans-serif" }}>
            Opening Hours
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3" style={{ color:'#E0B030' }}>
              <Clock size={15}/> <span className="font-bold text-sm" style={{ fontFamily:"'Playfair Display',sans-serif" }}>All Days</span>
            </div>
            <div className="rounded-xl p-4" style={{ background:'rgba(212,115,26,0.12)',border:'1.5px solid rgba(224,176,48,0.25)' }}>
              <p className="font-bold text-white text-lg" style={{ fontFamily:"'Playfair Display',sans-serif" }}>11:00 AM – 11:00 PM</p>
              <p className="text-xs mt-1" style={{ color:'rgba(255,255,255,0.5)' }}>Monday – Sunday (All Days)</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color:'rgba(255,255,255,0.5)',fontFamily:"'Inter',sans-serif" }}>
              Dine-in, Takeaway & Home Delivery. Catering for events & functions.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height:'1.5px',background:'linear-gradient(to right,transparent,rgba(212,115,26,0.45),transparent)',marginBottom:'1.25rem' }}/>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs" style={{ color:'rgba(255,255,255,0.4)' }}>
        <p>&copy; {new Date().getFullYear()} Sri Mahalakshmi Kitchen &amp; Caterers. All Rights Reserved.</p>
        <div className="flex gap-5">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </div>

    <div style={{ height:'3px',background:'linear-gradient(to right,transparent,#D4731A,transparent)' }}/>
  </footer>
);

export default Footer;
