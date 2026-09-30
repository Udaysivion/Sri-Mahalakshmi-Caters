import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FloatingButtons from '../../components/layout/FloatingButtons';
import CartDrawer from '../../components/cart/CartDrawer';

export const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#FFF8EC' }}>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
      <CartDrawer />
    </div>
  );
};

export default AppLayout;
