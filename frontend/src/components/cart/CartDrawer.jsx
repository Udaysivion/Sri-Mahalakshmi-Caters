import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 flex flex-col shadow-2xl"
            style={{ background: '#FDF6E3', borderLeft: '2px solid #C8A84B' }}
          >
            <div className="p-5 flex items-center justify-between" style={{ background: '#1B4332', borderBottom: '2px solid #C8A84B' }}>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                <ShoppingBag size={22} style={{ color: '#C8A84B' }} />
                Your Order
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-dark transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5" style={{ background: '#F5EDD0' }}>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingBag size={56} className="mb-4" style={{ color: '#C8A84B', opacity: 0.5 }} />
                  <p className="text-base font-bold" style={{ color: '#1B4332', fontFamily: "'Playfair Display', serif" }}>Your cart is empty</p>
                  <p className="text-sm mt-2" style={{ color: '#6B5533' }}>Add some delicious dishes!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-lg" style={{ background: 'white', border: '1px solid rgba(200,168,75,0.25)' }}>
                      <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md" style={{ border: '1px solid rgba(200,168,75,0.2)' }} />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-sm" style={{ color: '#2C1A0E', fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="transition-colors" style={{ color: '#8B0000' }}>
                              <X size={15} />
                            </button>
                          </div>
                          <p className="font-bold text-sm mt-0.5" style={{ color: '#1B4332' }}>₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                            style={{ border: '1px solid #C8A84B', color: '#1B4332' }}>
                            <Minus size={13} />
                          </button>
                          <span className="font-bold text-sm" style={{ color: '#1B4332' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: '#1B4332', color: 'white' }}>
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-5" style={{ borderTop: '2px solid rgba(200,168,75,0.4)', background: 'white' }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold" style={{ color: '#1B4332', fontSize: '1rem' }}>Total</span>
                  <span className="font-bold text-lg" style={{ color: '#1B4332' }}>₹{cartTotal}</span>
                </div>
                <button
                  onClick={() => {
                    alert('Order placed successfully! This is a demo.');
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3 font-bold text-sm uppercase rounded-md transition-all"
                  style={{ background: '#1B4332', color: 'white', letterSpacing: '0.05em' }}
                >
                  ✓ Place Order
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
