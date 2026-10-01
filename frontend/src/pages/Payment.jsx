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
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitOrderToGoogleSheet } from '../services/googleSheetService';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, checkoutDetails, clearCart, saveLastOrder, lastOrder } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'upi' | 'cod'
  const [upiRefId, setUpiRefId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
  const upiId = import.meta.env.VITE_RESTAURANT_UPI_ID || 'srimahalakshmi@upi';
  const restaurantName = import.meta.env.VITE_RESTAURANT_NAME || 'Sri Mahalakshmi Caters';

  // Dynamic UPI URL for QR code
  const generatedOrderId = `SMK-${Math.floor(100000 + Math.random() * 900000)}`;
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(restaurantName)}&am=${cartTotal}&cu=INR&tn=${encodeURIComponent(`Order ${generatedOrderId}`)}`;
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
      const response = await submitOrderToGoogleSheet(orderPayload);
      
      saveLastOrder(orderPayload);
      setConfirmedOrder({ ...orderPayload, sheetResponse: response });
      clearCart();
      setOrderComplete(true);

      if (response.sheetSaved) {
        toast.success('Order recorded in Google Sheets!', {
          icon: '📊',
          style: { background: '#112A1F', color: '#FFF8EC' }
        });
      } else {
        toast.success('Order placed! (Sheet Webhook pending)', {
          style: { background: '#112A1F', color: '#FFF8EC' }
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Order saved locally. Please contact support if needed.');
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
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } else {
      // Demo / Test Gateway Mode if API key is not yet set
      setIsProcessing(true);
      setTimeout(() => {
        finalizeOrder('Razorpay (Test Mode)', 'Paid', `pay_test_${Math.random().toString(36).substring(7)}`);
      }, 1500);
    }
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

            {/* Google Sheets Status Badge */}
            {confirmedOrder.sheetResponse?.sheetSaved ? (
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                <FileSpreadsheet size={18} className="text-emerald-600 shrink-0" />
                <span>
                  This order has been recorded into your Google Sheet in the <strong>"Orders"</strong> tab!
                </span>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertCircle size={16} className="text-amber-600 shrink-0" />
                  <span>Google Sheets Webhook Not Connected in .env</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  The order was saved locally. To save directly to your Google Sheet, deploy <code>google-apps-script.js</code> in your Google Sheet (via <em>Extensions &gt; Apps Script</em>) and paste the generated Web App URL into <code>.env</code>.
                </p>
              </div>
            )}

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

            {/* Payment Method Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1B4332]/10">
              <h2 className="text-xl font-bold text-[#112A1F] mb-6 flex items-center justify-between" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span>Select Payment Method</span>
                <span className="text-xs font-sans font-semibold text-gray-400 uppercase tracking-widest">Step 3 of 3</span>
              </h2>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`py-3 px-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'razorpay' ? 'bg-[#112A1F] text-white shadow-md' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <CreditCard size={18} />
                  <span>Razorpay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-3 px-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi' ? 'bg-[#112A1F] text-white shadow-md' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Smartphone size={18} />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`py-3 px-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'cod' ? 'bg-[#112A1F] text-white shadow-md' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Banknote size={18} />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* TAB 1: RAZORPAY */}
              {paymentMethod === 'razorpay' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="p-5 border-2 border-emerald-600/30 bg-emerald-50/40 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#112A1F]">Razorpay Secure Checkout</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-white px-2 py-0.5 rounded">Instant</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Pay safely using <strong>Cards (Visa, Mastercard, RuPay)</strong>, <strong>UPI (GPay, PhonePe)</strong>, <strong>Net Banking (50+ banks)</strong>, or <strong>Wallets</strong>.
                    </p>
                    
                    {!razorpayKey && (
                      <div className="mt-3 flex items-start gap-2 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-[11px] text-amber-800">
                        <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                        <span>Interactive Test Mode active (Configure <code>VITE_RAZORPAY_KEY_ID</code> in <code>.env</code> for live merchant transactions).</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleRazorpayPayment}
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#D4731A] hover:bg-[#B05D10] text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
                  >
                    {isProcessing ? 'Processing Transaction...' : `Pay ₹${cartTotal} via Razorpay`}
                  </button>
                </motion.div>
              )}

              {/* TAB 2: UPI / QR CODE */}
              {paymentMethod === 'upi' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Scan with Any UPI App</p>
                    <div className="inline-block p-3 bg-white rounded-2xl shadow-md border border-gray-200">
                      <img 
                        src={qrCodeUrl} 
                        alt="UPI Payment QR Code" 
                        className="w-48 h-48 mx-auto"
                        loading="eager"
                      />
                    </div>
                    <p className="text-lg font-black text-[#112A1F] mt-3">₹{cartTotal}</p>

                    {/* UPI ID copy pill */}
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700">
                        {upiId}
                      </span>
                      <button 
                        type="button" 
                        onClick={handleCopyUpi} 
                        className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                      </button>
                    </div>

                    {/* Deep link for mobile devices */}
                    <div className="mt-4 sm:hidden">
                      <a 
                        href={upiDeepLink} 
                        className="inline-block w-full py-2.5 bg-[#112A1F] text-white font-bold text-xs uppercase tracking-wider rounded-lg"
                      >
                        Open UPI App Directly
                      </a>
                    </div>
                  </div>

                  <form onSubmit={handleUpiVerification} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        UPI Transaction Reference ID (UTR / Txn ID)
                      </label>
                      <input 
                        type="text" 
                        value={upiRefId} 
                        onChange={(e) => setUpiRefId(e.target.value)}
                        placeholder="e.g. 429381029481 or leave blank for instant confirmation"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4731A]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 bg-[#112A1F] hover:bg-[#1E4A35] text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
                    >
                      {isProcessing ? 'Verifying & Saving Order...' : 'I Have Paid • Confirm Order'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 3: CASH ON DELIVERY */}
              {paymentMethod === 'cod' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="p-5 border border-amber-300/60 bg-amber-50/40 rounded-xl">
                    <h3 className="font-bold text-[#112A1F] text-sm mb-1">Pay with Cash on Delivery</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      You can pay ₹{cartTotal} in cash or via UPI to our delivery executive when your feast reaches your doorstep.
                    </p>
                  </div>

                  <button
                    onClick={handleCodPayment}
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#112A1F] hover:bg-[#1E4A35] text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
                  >
                    {isProcessing ? 'Confirming Order...' : `Place Order (COD) • ₹${cartTotal}`}
                  </button>
                </motion.div>
              )}

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
                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
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
