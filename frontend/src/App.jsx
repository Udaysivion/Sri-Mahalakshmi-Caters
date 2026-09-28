import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/layout/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/cart/CartDrawer';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ChefsSpecial = lazy(() => import('./pages/ChefsSpecial'));
const Menu = lazy(() => import('./pages/Menu'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

const Testimonials = lazy(() => import('./pages/Testimonials'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen" style={{ background:'#FFF8EC' }}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 rounded-full animate-spin"
        style={{ borderColor:'#1B4332',borderTopColor:'#D4731A' }}/>
      <p className="font-bold text-lg tracking-widest" style={{ color:'#1B4332',fontFamily:"'Baloo 2',sans-serif" }}>
        🪔 Sri Mahalakshmi
      </p>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chefs-special" element={<ChefsSpecial />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
        <ScrollToTop />
        <Toaster position="bottom-center" toastOptions={{ style: { background: '#1A1A1A', color: '#F7E8D0', borderRadius: '100px', padding: '16px 24px' } }} />
        <div className="flex flex-col min-h-screen" style={{ background:'#FFF8EC' }}>
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<Loader />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
          <FloatingButtons />
          <CartDrawer />
        </div>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
