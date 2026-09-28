import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight, CheckCircle, MapPin, Phone, User, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setStep('cart'), 300); // Reset after close animation
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 flex flex-col shadow-2xl bg-white"
          >
            
            {/* Header */}
            <div className="p-5 flex items-center justify-between bg-[#112A1F]">
              {step === 'checkout' ? (
                <button onClick={() => setStep('cart')} className="text-white hover:text-[#D4731A] transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <h2 className="text-lg font-bold flex items-center gap-2 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <ShoppingBag size={20} className="text-[#D4731A]" />
                  Your Order
                </h2>
              )}
              <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-[#F9F9F9] relative">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: CART */}
                {step === 'cart' && (
                  <motion.div key="cart" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="h-full flex flex-col">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <ShoppingBag size={64} className="mb-6 text-gray-300" />
                        <p className="text-xl font-bold text-[#112A1F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Your cart is empty</p>
                        <p className="text-gray-500 text-sm">Looks like you haven't added any authentic dishes yet!</p>
                        <button onClick={handleClose} className="mt-8 bg-[#112A1F] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1E4A35] transition-all">
                          Start Ordering
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 flex flex-col gap-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                            <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="flex justify-between items-start gap-2">
                                <h3 className="font-bold text-[#112A1F] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                  <X size={16} />
                                </button>
                              </div>
                              <div className="flex justify-between items-center mt-3">
                                <p className="font-bold text-[#112A1F]">₹{item.price}</p>
                                <div className="flex items-center gap-3 bg-gray-50 rounded-full border border-gray-200 px-2 py-1">
                                  <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-black">
                                    <Minus size={14} />
                                  </button>
                                  <span className="font-bold text-sm text-[#112A1F] w-4 text-center">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-black">
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: CHECKOUT */}
                {step === 'checkout' && (
                  <motion.div key="checkout" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} className="p-6 h-full bg-white">
                    <h3 className="text-2xl font-bold text-[#112A1F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Delivery Details</h3>
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                      
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#D4731A] focus:ring-1 focus:ring-[#D4731A] transition-all text-sm" />
                      </div>
                      
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <input required type="tel" placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#D4731A] focus:ring-1 focus:ring-[#D4731A] transition-all text-sm" />
                      </div>
                      
                      <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <textarea required placeholder="Complete Delivery Address" rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#D4731A] focus:ring-1 focus:ring-[#D4731A] transition-all text-sm resize-none"></textarea>
                      </div>

                      <div className="pt-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Payment Method</p>
                        <div className="grid grid-cols-2 gap-3">
                          <label className="flex flex-col items-center justify-center p-4 border-2 border-[#D4731A] bg-[#D4731A]/5 rounded-xl cursor-pointer">
                            <input type="radio" name="payment" value="cod" defaultChecked className="hidden" />
                            <span className="font-bold text-[#112A1F] text-sm mt-1">Cash on Delivery</span>
                          </label>
                          <label className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all opacity-50">
                            <input type="radio" name="payment" value="online" disabled className="hidden" />
                            <CreditCard size={20} className="text-gray-400" />
                            <span className="font-bold text-gray-400 text-sm mt-1">Online (Soon)</span>
                          </label>
                        </div>
                      </div>

                    </form>
                  </motion.div>
                )}

                {/* STEP 3: SUCCESS */}
                {step === 'success' && (
                  <motion.div key="success" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="h-full flex flex-col items-center justify-center text-center p-8 bg-white">
                    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring", delay:0.2}} className="w-20 h-20 bg-[#112A1F] rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-[#D4731A]" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-[#112A1F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Order Placed!</h2>
                    <p className="text-gray-500 mb-8">Your authentic meal is being prepared. We will deliver it to you shortly.</p>
                    <div className="bg-gray-50 w-full p-4 rounded-xl border border-gray-100 mb-8">
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                      <p className="font-mono font-bold text-[#112A1F]">#SMK-{Math.floor(Math.random() * 90000) + 10000}</p>
                    </div>
                    <button onClick={handleClose} className="w-full bg-[#112A1F] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1E4A35] transition-all">
                      Continue Browsing
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer / CTA (Only shows on Cart and Checkout) */}
            {cartItems.length > 0 && step !== 'success' && (
              <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-xl text-[#112A1F]">₹{cartTotal}</span>
                </div>
                
                {step === 'cart' ? (
                  <button onClick={() => setStep('checkout')} className="w-full py-4 bg-[#D4731A] hover:bg-[#B05D10] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" form="checkout-form" className="w-full py-4 bg-[#112A1F] hover:bg-[#1E4A35] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                    Confirm Order • ₹{cartTotal}
                  </button>
                )}
              </div>
            )}
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
