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
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'Our Story', path: '/about' },
    { name: 'Menu',      path: '/menu' },
    { name: 'Gallery',   path: '/gallery' },
    { name: 'Contact',   path: '/contact' },
  ];

  return (
    <>
      <nav
        className="fixed w-full z-50 transition-all duration-300"
        style={{
          background: '#1B4332',
          boxShadow: isScrolled ? '0 4px 20px rgba(27,67,50,0.4)' : 'none',
        }}
      >
        {/* Top saffron stripe */}
        <div style={{ height: '4px', background: 'linear-gradient(to right, #D4731A, #C4960A, #E0B030, #C4960A, #D4731A)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-2.5">

            {/* ── LOGO ── */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 z-50"
            >
              {/* Diya icon */}
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(212,115,26,0.18)', border: '1.5px solid rgba(212,115,26,0.5)' }}>
                <span style={{ fontSize: '1.3rem' }}>🪔</span>
              </div>
              <div>
                <div
                  className="font-extrabold leading-tight"
                  style={{ fontFamily: "'Baloo 2', sans-serif", color: 'white', fontSize: '1.05rem', letterSpacing: '0.01em' }}
                >
                  Sri Mahalakshmi
                </div>
                <div
                  className="leading-tight"
                  style={{ color: '#E0B030', fontSize: '0.58rem', letterSpacing: '0.15em', fontFamily: "'Hind', sans-serif", fontWeight: 600 }}
                >
                  KITCHEN &amp; CATERERS
                </div>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-sm font-semibold transition-all relative group pb-0.5"
                  style={{
                    fontFamily: "'Hind', sans-serif",
                    color: location.pathname === link.path ? '#E0B030' : 'rgba(255,255,255,0.92)',
                  }}
                >
                  {link.name}
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-transform duration-300 origin-left"
                    style={{
                      background: '#E0B030',
                      transform: location.pathname === link.path ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                  <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: '#E0B030' }} />
                </Link>
              ))}
            </div>

            {/* ── DESKTOP ACTIONS ── */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                <Phone size={15} style={{ color: '#E0B030' }} />
                <span>98765 43210</span>
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative"
                style={{ color: 'white' }}
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                    style={{ background: '#D4731A', color: 'white' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                to="/menu"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{ background: '#D4731A', color: 'white', fontFamily: "'Baloo 2', sans-serif", boxShadow: '0 2px 8px rgba(212,115,26,0.4)' }}
              >
                <UtensilsCrossed size={15} />
                Order Now
              </Link>
            </div>

            {/* ── MOBILE ACTIONS ── */}
            <div className="lg:hidden flex items-center gap-3">
              <button onClick={() => setIsCartOpen(true)} className="relative text-white">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                    style={{ background: '#D4731A', color: 'white' }}>
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="p-1.5 text-white rounded"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom saffron stripe */}
        <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, rgba(212,115,26,0.6), transparent)' }} />
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col pt-20"
            style={{ background: '#1B4332' }}
          >
            <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, #D4731A, transparent)' }} />

            <div className="flex flex-col gap-1 px-6 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-3 text-xl font-bold border-b"
                  style={{
                    fontFamily: "'Baloo 2', sans-serif",
                    color: location.pathname === link.path ? '#E0B030' : 'white',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto mx-6 mb-12 flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}
              >
                <Phone size={16} style={{ color: '#E0B030' }} />
                Call: +91 98765 43210
              </a>
              <Link
                to="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm"
                style={{ background: '#D4731A', color: 'white' }}
              >
                <UtensilsCrossed size={16} />
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
