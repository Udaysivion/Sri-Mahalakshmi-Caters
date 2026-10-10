import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle, Heart, Navigation } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // The 4 Official Social Media Accounts (tailored to domain: smahalakshmikitchen)
  const socialAccounts = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/smahalakshmikitchen/',
      hoverColor: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/smahalakshmikitchen/',
      hoverColor: 'hover:bg-[#1877F2] hover:border-transparent',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.64l.36-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@smahalakshmikitchen',
      hoverColor: 'hover:bg-[#FF0000] hover:border-transparent',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/917794800042?text=Hello%20Sri%20Mahalakshmi%20Kitchen%20%26%20Caterers!%20I%20would%20like%20to%20inquire%20about%20ordering%20and%20catering.',
      hoverColor: 'hover:bg-[#25D366] hover:border-transparent',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#112A1F] to-[#0A1A13] text-white pt-8 pb-5 border-t border-[#D4731A]/30 relative z-10 font-sans">
      {/* Top subtle golden hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E0B030] to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Grid: 4 Clean Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-6 border-b border-white/10 text-xs sm:text-[13px]">

          {/* Column 1: Brand & Domain Socials (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="inline-flex items-center gap-2.5 mb-2.5 transition-transform hover:scale-[1.01]"
            >
              <img 
                src="/logo-sm.svg" 
                alt="Sri Mahalakshmi Logo" 
                className="h-10 w-auto object-contain rounded-lg bg-white/10 p-1 border border-white/10" 
              />
              <div className="flex flex-col text-left">
                <span 
                  className="font-extrabold leading-tight text-[#E0B030] text-base tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sri Mahalakshmi
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A]">
                  Kitchen &amp; Caterers
                </span>
              </div>
            </Link>

            <p className="text-gray-300/80 text-xs leading-relaxed mb-3 max-w-sm">
              Authentic South Indian culinary experiences, traditional recipes, and premier catering in Hyderabad.
            </p>

            {/* Official Domain Social Icons */}
            <div className="flex items-center gap-2">
              {socialAccounts.map((account) => (
                <a
                  key={account.name}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${account.name} - @smahalakshmikitchen`}
                  aria-label={`Official ${account.name} Page`}
                  className={`w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 ${account.hoverColor}`}
                >
                  {account.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold text-[#E0B030] uppercase tracking-wider mb-2.5">
              Explore
            </h4>
            <ul className="space-y-1.5 text-xs">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Story', path: '/about' },
                { name: 'Menu & Order', path: '/menu' },
                { name: "Chef's Special", path: '/chefs-special' },
                { name: 'Event Catering', path: '/catering' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gray-300/80 hover:text-[#E0B030] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialties (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold text-[#E0B030] uppercase tracking-wider mb-2.5">
              Specialties
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300/80">
              <li>South Indian Breakfast Tiffins</li>
              <li>Authentic Biryani &amp; Meals</li>
              <li>Grand Wedding Feast Catering</li>
              <li>Corporate &amp; Party Orders</li>
              <li>Live Counter Catering Setup</li>
              <li>
                <Link to="/digital-menu" className="hover:text-[#E0B030] transition-colors">
                  Digital QR Fast Ordering
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold text-[#E0B030] uppercase tracking-wider mb-2.5">
              Visit &amp; Contact
            </h4>
            <ul className="space-y-2 text-xs text-gray-300/85">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#D4731A] shrink-0 mt-1" />
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-gray-200 text-xs leading-tight font-medium">
                    Bahadurpally, Hyderabad, TS 500043
                  </span>
                  <a
                    href="https://www.google.com/maps/dir//SRI+MAHALAKSHMI+KITCHEN+%26+CATERERS,+HC5R%2B7R2,+Bahadurpally,+Hyderabad,+Telangana+500043/@17.5581314,78.4419977,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E0B030] hover:text-white bg-white/10 hover:bg-[#D4731A] border border-[#E0B030]/30 hover:border-transparent px-2.5 py-1 rounded-lg transition-all duration-200 shadow-xs group"
                    title="Open Google Maps for turn-by-turn directions"
                  >
                    <Navigation size={11} className="text-[#E0B030] group-hover:text-white transition-colors" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink size={10} className="opacity-70 group-hover:opacity-100" />
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-[#D4731A] shrink-0" />
                <a href="tel:+917794800042" className="hover:text-[#E0B030] font-semibold transition-colors">
                  +91 77948 00042
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={13} className="text-[#25D366] shrink-0" />
                <a href="https://wa.me/917794800042" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={13} className="text-[#E0B030] shrink-0" />
                <span>Mon – Sun: 07:00 AM – 11:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Compact Bottom Bar (with safe right margin to prevent overlap with floating scroll-to-top button) */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-gray-400 pr-0 md:pr-16">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p>&copy; {currentYear} Sri Mahalakshmi Kitchen &amp; Caterers.</p>
          </div>

          {/* SIVION GLOBAL TECHNOLOGIES ANCHOR LINK */}
          <div className="flex items-center gap-1 text-center">
            <span>Developed with</span>
            <Heart size={11} className="text-red-500 fill-red-500 inline" />
            <span>by</span>
            <a
              href="https://sivionglobaltechnologies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E0B030] hover:text-white font-bold transition-colors inline-flex items-center gap-1 underline underline-offset-2 decoration-[#E0B030]/60 hover:decoration-white"
            >
              <span>Sivion Global Technologies</span>
              <ExternalLink size={10} className="opacity-80" />
            </a>
          </div>

          {/* Legal / Policies Links (Placed safely away from bottom-right floating button) */}
          <div className="flex items-center gap-4 text-gray-400">
            <Link 
              to="/privacy-policy" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="hover:text-[#E0B030] transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link 
              to="/terms" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="hover:text-[#E0B030] transition-colors"
            >
              Terms of Service
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
