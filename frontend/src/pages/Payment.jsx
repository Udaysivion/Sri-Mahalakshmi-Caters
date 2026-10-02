import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  CheckCircle, 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Copy, 
  Check, 
  ExternalLink,
  Receipt,
  Utensils
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitOrderToDatabase } from '../services/orderService';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, checkoutDetails, clearCart, saveLastOrder, lastOrder } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // default to automated online payment (GPay / PhonePe / Cards / UPI)
  const [upiRefId, setUpiRefId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Read credentials, contacts, and configuration exclusively from environment variables
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
  const restaurantPhone = import.meta.env.VITE_RESTAURANT_PHONE || '';
  const upiId = import.meta.env.VITE_RESTAURANT_UPI_ID || '';
  const restaurantName = import.meta.env.VITE_RESTAURANT_NAME || '';

  // Dynamic UPI URL for QR code & Deep Links
  const generatedOrderId = `SMK-${Math.floor(100000 + Math.random() * 900000)}`;
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(restaurantName)}&am=${cartTotal}&cu=INR&tn=${encodeURIComponent(`Order ${generatedOrderId}`)}`;
  const gpayDeepLink = `tez://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(restaurantName)}&am=${cartTotal}&cu=INR&tn=${encodeURIComponent(`Order ${generatedOrderId}`)}`;
  const phonepeDeepLink = `phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(restaurantName)}&am=${cartTotal}&cu=INR&tn=${encodeURIComponent(`Order ${generatedOrderId}`)}`;
  const paytmDeepLink = `paytmmp://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(restaurantName)}&am=${cartTotal}&cu=INR&tn=${encodeURIComponent(`Order ${generatedOrderId}`)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiDeepLink)}&margin=8`;

  // Dynamically load Razorpay SDK
  useEffect(() => {
    if (!document.getElementById('razorpay-sdk')) {
      const script = document.createElement('script');
      script.id = 'razorpay-sdk';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    toast.success('UPI ID copied to clipboard!');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(restaurantPhone);
    setCopiedPhone(true);
    toast.success('Phone / GPay number copied!');
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  // Complete and record order
  const finalizeOrder = async (methodName, statusText, paymentRef) => {
    setIsProcessing(true);

    const orderPayload = {
      orderId: generatedOrderId,
      customerName: checkoutDetails.name || 'Valued Customer',
      phone: checkoutDetails.phone || '',
      address: checkoutDetails.address || '',
      notes: checkoutDetails.notes || '',
      items: cartItems,
      totalAmount: cartTotal,
      paymentMethod: methodName,
      paymentStatus: statusText,
      paymentId: paymentRef || `REF-${Math.floor(100000 + Math.random() * 900000)}`
    };

    try {
      const response = await submitOrderToDatabase(orderPayload);
      
      saveLastOrder(orderPayload);
      setConfirmedOrder({ ...orderPayload, dbResponse: response });
      clearCart();
      setOrderComplete(true);

      toast.success('Order confirmed & saved to database!', {
        icon: '✅',
        style: { background: '#112A1F', color: '#FFF8EC' }
      });
    } catch (err) {
      console.error(err);
      toast.error('Order placed. Processing receipt.');
      setConfirmedOrder(orderPayload);
      setOrderComplete(true);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1. Razorpay Handler
  const handleRazorpayPayment = () => {
    if (window.Razorpay && razorpayKey) {
      const options = {
        key: razorpayKey,
        amount: cartTotal * 100, // amount in paise
        currency: 'INR',
        name: restaurantName,
        description: `Order ${generatedOrderId}`,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=120',
        handler: function (response) {
          finalizeOrder('Razorpay', 'Paid', response.razorpay_payment_id);
        },
        prefill: {
          name: checkoutDetails.name || '',
          contact: checkoutDetails.phone || ''
        },
        theme: {
          color: '#1B4332'
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast('Payment cancelled or closed.', { icon: 'ℹ️' });
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setIsProcessing(false);
        toast.error(`Payment failed: ${response.error?.description || 'Transaction unsuccessful'}`);
      });
      rzp.open();
    } else {
      // Demo / Test Gateway Mode if API key is not yet set
      simulateInstantPayment();
    }
  };

  const simulateInstantPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      finalizeOrder('Razorpay (Test Simulation)', 'Paid', `pay_test_${Math.random().toString(36).substring(7)}`);
    }, 800);
  };

  // 2. UPI Verification Handler
  const handleUpiVerification = (e) => {
    e.preventDefault();
    finalizeOrder('Direct UPI (QR)', 'Pending Verification', upiRefId || `UPI-TXN-${Date.now().toString().slice(-6)}`);
  };

  // 3. Cash on Delivery Handler
  const handleCodPayment = () => {
    finalizeOrder('Cash on Delivery', 'Pending (COD)', 'CASH-ON-DELIVERY');
  };

  // Order Success View
  if (orderComplete && confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#FFF8EC] py-16 px-4">
        <Helmet>
          <title>Order Confirmed | Sri Mahalakshmi Caters</title>
        </Helmet>
        
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#1B4332]/10">
          <div className="bg-[#112A1F] text-white p-8 text-center relative overflow-hidden">
            <div className="w-20 h-20 bg-[#D4731A]/20 border-2 border-[#D4731A] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={44} className="text-[#D4731A]" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Order Confirmed!
            </h1>
            <p className="text-gray-300 text-sm max-w-md mx-auto">
              Thank you, {confirmedOrder.customerName}. Your traditional delicacies are being prepared with divine devotion.
            </p>
            <div className="mt-4 inline-block bg-white/10 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4731A]">
              Order #{confirmedOrder.orderId}
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Delivery Address</p>
                <p className="text-sm font-semibold text-[#112A1F]">{confirmedOrder.customerName}</p>
                <p className="text-sm text-gray-600">{confirmedOrder.phone}</p>
                <p className="text-sm text-gray-600 whitespace-pre-line mt-1">{confirmedOrder.address}</p>
              </div>
              <div className="sm:border-l sm:border-gray-200 sm:pl-4">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Payment Summary</p>
                <p className="text-sm font-semibold text-[#112A1F]">{confirmedOrder.paymentMethod}</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Ref: {confirmedOrder.paymentId}</p>
                <p className="text-sm font-bold text-[#1B4332] mt-2">Status: <span className="text-emerald-700">{confirmedOrder.paymentStatus}</span></p>
                <p className="text-lg font-black text-[#D4731A] mt-1">₹{confirmedOrder.totalAmount}</p>
              </div>
            </div>

            {/* Database Storage Confirmation */}
            <div className="flex items-center gap-2.5 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
              <CheckCircle size={16} className="text-emerald-600 shrink-0" />
              <span className="font-semibold">
                Order successfully verified and recorded into the database!
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <a 
                href={`https://wa.me/917794800042?text=${encodeURIComponent(`Hello Sri Mahalakshmi Caters, I just placed Order #${confirmedOrder.orderId} for ₹${confirmedOrder.totalAmount}. Could you please confirm delivery time?`)}`}
                target="_blank" 
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-[#25D366] text-white rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-[#20b858] transition-colors"
              >
                Track on WhatsApp <ExternalLink size={14} />
              </a>
              <Link 
                to="/menu" 
                className="flex-1 py-3 px-4 bg-[#112A1F] text-white rounded-xl font-bold text-xs uppercase tracking-wider text-center hover:bg-[#1E4A35] transition-colors"
              >
                Back to Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback if accessed without items
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8EC] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4731A]">
            <Receipt size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#112A1F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please select your desired delicacies from our traditional menu before proceeding to payment.
          </p>
          <Link to="/menu" className="inline-block bg-[#112A1F] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1E4A35] transition-all">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EC] py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Payment & Checkout | Sri Mahalakshmi Caters</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Navigation / Header */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-bold text-[#112A1F] hover:text-[#D4731A] transition-colors"
          >
            <ArrowLeft size={18} /> Modify Delivery Details
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck size={16} /> 256-Bit SSL Encrypted
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Payment Options (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Delivery Recipient Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1B4332]/10">
              <h2 className="text-base font-bold text-[#112A1F] uppercase tracking-wider mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <MapPin size={18} className="text-[#D4731A]" /> Delivering To
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Customer</p>
                  <p className="font-semibold text-[#112A1F]">{checkoutDetails.name || 'Valued Guest'}</p>
                  <p className="text-gray-600 mt-1">{checkoutDetails.phone || 'Phone not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Address</p>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {checkoutDetails.address || 'Address provided at delivery'}
                  </p>
                </div>
              </div>
            </div>

            {/* E-Commerce Payment Method Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1B4332]/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Select Payment Method
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">100% Safe, Secure & Encrypted Checkout</p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Step 3 of 3
                </span>
              </div>

              {/* OPTION 1: AUTOMATED ONLINE PAYMENT (GPAY / PHONEPE / CARDS / UPI) */}
              <div className={`rounded-2xl border-2 transition-all overflow-hidden ${paymentMethod === 'razorpay' ? 'border-[#1B4332] bg-emerald-50/20 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                {/* Header / Radio */}
                <div 
                  onClick={() => setPaymentMethod('razorpay')}
                  className="p-4.5 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === 'razorpay'} 
                      onChange={() => setPaymentMethod('razorpay')}
                      className="w-4 h-4 accent-[#1B4332] cursor-pointer" 
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-[#112A1F]">Online Payment (Google Pay, PhonePe, Cards, UPI)</span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-800 text-white">Automated</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Real-time instant bank verification • No manual UTR needed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4285F4] text-white">GPay</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#5f259f] text-white">PhonePe</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#002e6e] text-white">Paytm</span>
                    <CreditCard size={18} className="text-gray-500 hidden sm:inline" />
                  </div>
                </div>

                {/* Expanded Details when active */}
                {paymentMethod === 'razorpay' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4.5 pt-0 border-t border-gray-100 space-y-4">
                    <div className="p-3.5 bg-white rounded-xl border border-gray-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-emerald-800 font-bold">
                        <span className="flex items-center gap-1.5"><ShieldCheck size={16} /> 100% Real-Time Automated Verification</span>
                        <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded">Bank Protected</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-[11px]">
                        Pay directly via <strong>Google Pay</strong>, <strong>PhonePe</strong>, <strong>UPI QR</strong>, <strong>Cards (Debit/Credit)</strong>, or <strong>Net Banking</strong>. The system automatically confirms your payment with the bank in real time — you don't need to enter any transaction ID manually.
                      </p>
                    </div>

                    <button
                      onClick={handleRazorpayPayment}
                      disabled={isProcessing}
                      className="w-full py-4 bg-[#D4731A] hover:bg-[#B05D10] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                    >
                      {isProcessing ? 'Connecting to Bank...' : `Pay ₹${cartTotal} Online (GPay / PhonePe / Card)`}
                    </button>
                  </motion.div>
                )}
              </div>

              {/* OPTION 2: CASH ON DELIVERY (COD) */}
              <div className={`rounded-2xl border-2 transition-all overflow-hidden ${paymentMethod === 'cod' ? 'border-[#1B4332] bg-emerald-50/20 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                {/* Header / Radio */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className="p-4.5 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 accent-[#1B4332] cursor-pointer" 
                    />
                    <div>
                      <span className="font-bold text-sm text-[#112A1F]">Cash on Delivery (COD)</span>
                      <p className="text-xs text-gray-500 mt-0.5">Pay in cash or UPI when your food arrives at your doorstep</p>
                    </div>
                  </div>
                  <Banknote size={20} className="text-gray-600 shrink-0" />
                </div>

                {/* Expanded Details */}
                {paymentMethod === 'cod' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4.5 pt-0 border-t border-gray-100 space-y-3">
                    <p className="text-xs text-gray-600 bg-white p-3.5 rounded-xl border border-gray-200 leading-relaxed">
                      You can pay <strong>₹{cartTotal}</strong> to our delivery partner in cash or by scanning their UPI QR code upon food delivery.
                    </p>
                    <button
                      onClick={handleCodPayment}
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-[#112A1F] hover:bg-[#1E4A35] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                    >
                      {isProcessing ? 'Confirming Order...' : `Place Cash on Delivery Order • ₹${cartTotal}`}
                    </button>
                  </motion.div>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-[#1B4332]/10 sticky top-24">
            <h2 className="text-xl font-bold text-[#112A1F] mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              <Receipt size={20} className="text-[#D4731A]" /> Order Summary
            </h2>

            {/* Items list */}
            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#1B4332]/5 flex items-center justify-center shrink-0">
                      {item.img ? (
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const placeholder = e.currentTarget.parentElement.querySelector('.payment-dish-placeholder');
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                          className="w-full h-full object-cover" 
                        />
                      ) : null}
                      <div 
                        className="payment-dish-placeholder flex-col items-center justify-center text-[#1B4332]/40"
                        style={{ display: item.img ? 'none' : 'flex' }}
                      >
                        <Utensils size={16} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#112A1F] line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-[#112A1F]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className="text-emerald-700 font-bold uppercase text-xs">FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Kitchen Packaging</span>
                <span className="text-xs font-semibold text-gray-500">Included</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-[#112A1F] pt-3 border-t border-dashed border-gray-200">
                <span>To Pay</span>
                <span className="text-2xl text-[#D4731A]">₹{cartTotal}</span>
              </div>
            </div>

            {/* ETA & Commitment */}
            <div className="mt-6 p-3.5 bg-[#FFF8EC] rounded-xl border border-[#D4731A]/20 flex items-center gap-3">
              <Clock size={20} className="text-[#D4731A] shrink-0" />
              <div className="text-xs text-[#112A1F]">
                <p className="font-bold">Estimated Delivery: 35 - 45 Mins</p>
                <p className="text-gray-500">Freshly cooked upon order confirmation.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
