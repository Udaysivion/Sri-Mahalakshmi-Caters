import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'Our Story', path: '/about' },
    { name: 'Menu',      path: '/menu' },
    { name: 'Catering',  path: '/catering' },
    { name: 'Gallery',   path: '/gallery' },
    { name: 'Contact',   path: '/contact' },
  ];

  // Dynamic styling based on scroll state
  const navBg = isScrolled ? 'rgba(255, 248, 236, 0.98)' : '#1B4332'; // Cream vs Deep Green
  const textColor = isScrolled ? '#1B4332' : '#FFFFFF';
  const textMuted = isScrolled ? '#2C1A00' : 'rgba(255,255,255,0.9)';
  const goldAccent = isScrolled ? '#B05D10' : '#E0B030';
  const shadow = isScrolled ? '0 10px 30px rgba(27,67,50,0.08)' : 'none';
  const paddingY = isScrolled ? 'py-1.5' : 'py-3';

  return (
    <>
      <nav
        className="fixed w-full z-50 transition-all duration-500 backdrop-blur-sm"
        style={{
          background: navBg,
          boxShadow: shadow,
          borderBottom: isScrolled ? '1px solid rgba(27,67,50,0.1)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex justify-between items-center transition-all duration-500 ${paddingY}`}>
            
            {/* ── LOGO ── */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 z-50 group transition-transform duration-300 hover:scale-105"
            >
              <img 
                src="/logo-sm.svg" 
                alt="Logo" 
                className="h-12 md:h-14 w-auto object-contain rounded-md" 
              />
              <div className="flex flex-col">
                <div
                  className="font-extrabold leading-none mb-1 transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif", color: textColor, fontSize: '1.25rem', letterSpacing: '0.02em' }}
                >
                  Sri Mahalakshmi
                </div>
                <div
                  className="leading-none transition-colors duration-300"
                  style={{ color: '#D4731A', fontSize: '0.65rem', letterSpacing: '0.15em', fontFamily: "'Inter', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}
                >
                  Kitchen & Caterers
                </div>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-[13px] uppercase tracking-widest font-semibold transition-all relative group pb-1"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: location.pathname === link.path ? goldAccent : textMuted,
                  }}
                >
                  {link.name}
                  <span
                    className="absolute bottom-0 left-0 w-full h-[1px] rounded-full transition-transform duration-300 origin-left"
                    style={{
                      background: goldAccent,
                      transform: location.pathname === link.path ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                  <span className="absolute bottom-0 left-0 w-full h-[1px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: goldAccent }} />
                </Link>
              ))}
            </div>

            {/* ── DESKTOP ACTIONS ── */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: textColor, fontFamily: "'Inter', sans-serif" }}
              >
                <Phone size={16} style={{ color: goldAccent }} />
                98765 43210
              </a>

              <div className="h-5 w-[1px]" style={{ background: isScrolled ? 'rgba(27,67,50,0.2)' : 'rgba(255,255,255,0.2)' }}></div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative transition-transform hover:scale-105"
                style={{ color: textColor }}
              >
                <ShoppingCart size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                    style={{ background: '#D4731A', color: 'white' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* ── MOBILE ACTIONS ── */}
            <div className="lg:hidden flex items-center gap-4">
              <button onClick={() => setIsCartOpen(true)} className="relative transition-transform hover:scale-105" style={{ color: textColor }}>
                <ShoppingCart size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                    style={{ background: '#D4731A', color: 'white' }}>
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="p-1 rounded transition-colors"
                style={{ color: textColor }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col pt-[72px]"
            style={{ background: '#FFF8EC' }}
          >
            <div className="flex flex-col gap-0 px-6 pt-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="block py-4 text-2xl border-b"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: location.pathname === link.path ? '#D4731A' : '#1B4332',
                      borderColor: 'rgba(27,67,50,0.1)',
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto p-6 flex flex-col gap-3 pb-12 bg-white" style={{ borderTop: '1px solid rgba(27,67,50,0.1)' }}>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 py-3.5 rounded-none font-medium text-sm transition-colors hover:bg-gray-50"
                style={{ color: '#1B4332', border: '1px solid #1B4332', fontFamily: "'Inter', sans-serif" }}
              >
                <Phone size={18} style={{ color: '#1B4332' }} />
                Call: +91 98765 43210
              </a>
              <Link
                to="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-none font-medium text-sm transition-colors"
                style={{ background: '#1B4332', color: 'white', fontFamily: "'Inter', sans-serif" }}
              >
                <UtensilsCrossed size={18} />
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
