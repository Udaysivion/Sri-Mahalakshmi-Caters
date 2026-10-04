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
const Catering = lazy(() => import('./pages/Catering'));

const Testimonials = lazy(() => import('./pages/Testimonials'));
const Payment = lazy(() => import('./pages/Payment'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const DigitalMenu = lazy(() => import('./pages/DigitalMenu'));

// Admin Feature Module Pages (Modular Monolithic Architecture)
const AdminDashboardPage = lazy(() => import('./features/admin/pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminLoginPage = lazy(() => import('./features/admin/pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));

// Common UI Components
import LogoLoader from './components/common/LogoLoader';

const Loader = () => (
  <LogoLoader 
    fullScreen 
    size="lg" 
    message="Sri Mahalakshmi Caters" 
    subtext="Authentic Homely & Village Cuisine" 
  />
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
        <Route path="/catering" element={<Catering />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/digital-menu" element={<DigitalMenu />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen" style={{ background:'#FFF8EC' }}>
      <ScrollToTop />
      <Toaster 
        position="bottom-center" 
        toastOptions={{ 
          style: { background: '#1A1A1A', color: '#F7E8D0', borderRadius: '16px', padding: '14px 22px' } 
        }} 
      />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingButtons />}
      {!isAdminRoute && <CartDrawer />}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <AppLayout />
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
