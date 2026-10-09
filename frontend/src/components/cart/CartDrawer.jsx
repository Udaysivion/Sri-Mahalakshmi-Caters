import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight, CheckCircle, MapPin, Phone, User, CreditCard, Utensils, Navigation, Loader2, ExternalLink } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { findCurrentLocation } from '../../utils/locationService';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    checkoutDetails,
    updateCheckoutDetails 
  } = useCart();

  const [step, setStep] = useState('cart'); // 'cart' | 'checkout'
  const [formData, setFormData] = useState({
    name: checkoutDetails?.name || '',
    phone: checkoutDetails?.phone || '',
    address: (checkoutDetails?.address || '').replace(/📍\s*Map Pin:\s*https?:\/\/[^\s]+/gi, '').replace(/https?:\/\/[^\s]+/gi, '').trim(),
    notes: checkoutDetails?.notes || ''
  });
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (checkoutDetails) {
      const cleanAddr = (checkoutDetails.address || '')
        .replace(/📍\s*Map Pin:\s*https?:\/\/[^\s]+/gi, '')
        .replace(/https?:\/\/[^\s]+/gi, '')
        .trim();

      setFormData(prev => ({
        name: prev.name || checkoutDetails.name || '',
        phone: prev.phone || checkoutDetails.phone || '',
        address: prev.address || cleanAddr || '',
        notes: prev.notes || checkoutDetails.notes || ''
      }));
    }
  }, [checkoutDetails, isCartOpen]);

  const handleGetLocation = async () => {
    setIsLocating(true);
    const toastId = toast.loading('Acquiring high-accuracy GPS position...');
    try {
      const loc = await findCurrentLocation();
      const cleanAddr = loc.cleanAddress;

      setFormData(prev => {
        const existing = (prev.address || '').trim();
        const flatMatch = existing.match(/^(?:flat|apt|apartment|door|d\.no|plot|house|villa|#)\s*[^,\n]+/i);
        let finalAddr = cleanAddr;
        if (flatMatch && !cleanAddr.toLowerCase().includes(flatMatch[0].toLowerCase())) {
          finalAddr = `${flatMatch[0]}, ${cleanAddr}`;
        }
        return {
          ...prev,
          address: finalAddr
        };
      });

      updateCheckoutDetails({
        address: cleanAddr,
        coordinates: { latitude: loc.latitude, longitude: loc.longitude },
        mapsUrl: loc.mapsUrl
      });

      if (loc.accuracy && loc.accuracy <= 50) {
        toast.success(`📍 Pinned: ${loc.shortArea} (±${loc.accuracy}m)`, { id: toastId });
      } else {
        toast.success(`📍 Detected: ${loc.shortArea}. Please add Flat / House No.`, { id: toastId });
      }
    } catch (err) {
      console.error('Location detection error:', err);
      toast.error(err.message || 'Unable to detect current location.', { id: toastId });
    } finally {
      setIsLocating(false);
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setStep('cart'), 300);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    const finalAddress = (formData.address || '')
      .replace(/📍\s*Map Pin:\s*https?:\/\/[^\s]+/gi, '')
      .replace(/https?:\/\/[^\s]+/gi, '')
      .trim();

    if (!finalAddress) {
      toast.error('Please enter complete delivery address.');
      return;
    }

    updateCheckoutDetails({
      ...formData,
      address: finalAddress
    });
    setIsCartOpen(false);
    navigate('/payment');
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
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#1B4332]/5 flex items-center justify-center shrink-0">
                              {item.img ? (
                                <img 
                                  src={item.img} 
                                  alt={item.name} 
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const placeholder = e.currentTarget.parentElement.querySelector('.cart-dish-placeholder');
                                    if (placeholder) placeholder.style.display = 'flex';
                                  }}
                                  className="w-full h-full object-cover" 
                                />
                              ) : null}
                              <div 
                                className="cart-dish-placeholder flex-col items-center justify-center text-[#1B4332]/40"
                                style={{ display: item.img ? 'none' : 'flex' }}
                              >
                                <Utensils size={20} strokeWidth={1.5} />
                              </div>
                            </div>
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
                    <h3 className="text-2xl font-bold text-[#112A1F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Delivery Details</h3>
                    <p className="text-xs text-gray-500 mb-6">Enter your address to proceed to the secure payment screen.</p>
                    
                    <form id="checkout-form" onSubmit={handleProceedToPayment} className="space-y-4">
                      
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <input 
                          required 
                          type="text" 
                          placeholder="Full Name" 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#D4731A] focus:ring-1 focus:ring-[#D4731A] transition-all text-sm" 
                        />
                      </div>
                      
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <input 
                          required 
                          type="tel" 
                          placeholder="Phone Number (10 Digits)" 
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#D4731A] focus:ring-1 focus:ring-[#D4731A] transition-all text-sm" 
                        />
                      </div>
                      
                      {/* Delivery Address Field with Find My Location */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#112A1F] flex items-center gap-1.5">
                            <MapPin size={15} className="text-[#D4731A]" />
                            Delivery Address <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={handleGetLocation}
                            disabled={isLocating}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#112A1F] bg-[#FFF8EC] hover:bg-[#D4731A] hover:text-white border border-[#D4731A]/40 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
                            title="Automatically detect current GPS location"
                          >
                            {isLocating ? (
                              <>
                                <Loader2 size={13} className="animate-spin text-[#D4731A]" />
                                <span>Locating...</span>
                              </>
                            ) : (
                              <>
                                <Navigation size={13} className="text-[#D4731A]" />
                                <span>Find My Location</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="relative">
                          <textarea 
                            required 
                            placeholder="Flat/House No, Building, Street, Area, Landmark..." 
                            rows="3" 
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-3.5 focus:outline-none focus:border-[#D4731A] focus:ring-1 focus:ring-[#D4731A] transition-all text-sm resize-none"
                          ></textarea>
                        </div>

                        {(() => {
                          const activeMapsUrl = checkoutDetails?.mapsUrl || 
                            (checkoutDetails?.coordinates?.latitude ? `https://www.google.com/maps?q=${checkoutDetails.coordinates.latitude},${checkoutDetails.coordinates.longitude}` : 
                            (formData.address?.trim() ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address.trim())}` : null));
                          
                          if (!activeMapsUrl) return null;

                          return (
                            <div className="flex items-center justify-between pt-1 px-1">
                              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle size={12} className="text-emerald-600" />
                                {checkoutDetails?.mapsUrl ? 'GPS Location Pinned' : 'Address Identified'}
                              </span>
                              <a
                                href={activeMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B4332] hover:text-[#D4731A] transition-colors"
                                title="Open and verify in Google Maps"
                              >
                                <Navigation size={11} className="text-[#D4731A]" />
                                <span>View on Google Maps</span>
                                <ExternalLink size={10} />
                              </a>
                            </div>
                          );
                        })()}
                      </div>

                    </form>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer / CTA (Only shows on Cart and Checkout) */}
            {cartItems.length > 0 && (
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
                    Confirm & Proceed to Payment • ₹{cartTotal} <ArrowRight size={16} />
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
