import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Utensils, QrCode, Printer, Search, CheckCircle2, Bell, X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenuData } from '../hooks/useMenuData';
import LogoLoader from '../components/common/LogoLoader';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { submitOrderToDatabase } from '../services/orderService';

const SITE_URL = window.location.origin;

/* ═══════════════════════════════════════════
   QR CARD — printable per table
═══════════════════════════════════════════ */
const QRCard = ({ tableNumber }) => {
  // QR points to /digital-menu?table=N  (the correct page)
  const menuUrl = `${SITE_URL}/digital-menu?table=${tableNumber}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(menuUrl)}&color=112A1F&bgcolor=FFF8EC&margin=10`;

  const handlePrint = () => {
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Table ${tableNumber} QR Menu — Sri Mahalakshmi</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Georgia', serif; background: #FFF8EC; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .card { width: 85mm; padding: 22px; border: 2px solid #DCA145; border-radius: 14px; text-align: center; background: #FFF8EC; }
            .logo { font-size: 20px; font-weight: bold; color: #112A1F; letter-spacing: 2px; }
            .sub { font-size: 9px; color: #D4731A; letter-spacing: 3px; text-transform: uppercase; margin: 4px 0 14px; }
            .divider { height: 1px; background: linear-gradient(to right, transparent, #DCA145, transparent); margin: 10px 0; }
            .table-label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px; margin-top: 10px; }
            .table-num { font-size: 38px; font-weight: bold; color: #112A1F; margin-bottom: 14px; }
            img { width: 190px; height: 190px; border: 1px solid #DCA14544; border-radius: 10px; margin-bottom: 12px; }
            .hint { font-size: 11px; color: #444; line-height: 1.5; font-weight: bold; margin-bottom: 12px; }
            .steps { text-align: left; list-style: none; margin-bottom: 12px; }
            .steps li { font-size: 9px; color: #555; margin-bottom: 5px; display: flex; align-items: center; gap: 7px; }
            .step-num { width: 16px; height: 16px; background: #112A1F; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: bold; flex-shrink: 0; }
            .url { font-size: 7px; color: #ccc; margin-top: 8px; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="logo">SRI MAHALAKSHMI</div>
            <div class="sub">Kitchen &amp; Caterers</div>
            <div class="divider"></div>
            <div class="table-label">Table Number</div>
            <div class="table-num">${tableNumber}</div>
            <img src="${qrUrl}" alt="QR Menu"/>
            <div class="hint">📷 Scan to browse our menu &amp; place your order</div>
            <ul class="steps">
              <li><span class="step-num">1</span> Open your phone camera</li>
              <li><span class="step-num">2</span> Point at the QR code above</li>
              <li><span class="step-num">3</span> Browse our full menu</li>
              <li><span class="step-num">4</span> Add items &amp; notify the waiter</li>
            </ul>
            <div class="divider"></div>
            <div class="url">${menuUrl}</div>
          </div>
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#FFF8EC] border-2 border-[#DCA145] rounded-2xl p-6 flex flex-col items-center gap-3 shadow-xl max-w-xs w-full mx-auto"
    >
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D4731A]">Scan & Order</p>
      <h2 className="text-2xl font-bold text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>SRI MAHALAKSHMI</h2>
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Kitchen & Caterers</p>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#DCA145] to-transparent" />
      <div className="text-center">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Table Number</p>
        <p className="text-5xl font-black text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>{tableNumber}</p>
      </div>
      <div className="p-3 bg-white rounded-xl border border-[#DCA145]/30 shadow-sm">
        <img src={qrUrl} alt={`QR Code for Table ${tableNumber}`} className="w-44 h-44" />
      </div>
      <p className="text-xs text-gray-600 text-center font-medium">📷 Scan to browse our menu & order instantly</p>
      <div className="w-full space-y-2">
        {['Open your camera app', 'Point at the QR code', 'Browse our full menu', 'Add items & notify waiter'].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-[#112A1F] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
            <span className="text-[11px] text-gray-600">{step}</span>
          </div>
        ))}
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#DCA145] to-transparent" />
      <button onClick={handlePrint} className="w-full flex items-center justify-center gap-2 bg-[#112A1F] hover:bg-[#1E4A35] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
        <Printer size={14} /> Print This Card
      </button>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   MINI FOOD CARD
═══════════════════════════════════════════ */
const MiniCard = ({ item }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = cartItems.find(i => i.id === item.id);
  const qty = cartItem ? cartItem.quantity : 0;

  const add = () => {
    addToCart(item);
    toast.success(`${item.name} added!`, {
      style: { background: '#1B4332', color: '#FFF8EC', borderRadius: '8px', fontSize: '13px', fontWeight: 600 },
      iconTheme: { primary: '#D4731A', secondary: '#FFF8EC' }
    });
  };

  const update = (delta) => {
    if (qty === 1 && delta === -1) removeFromCart(item.id);
    else updateQuantity(item.id, delta);
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FFF8EC] flex-shrink-0 flex items-center justify-center">
        {item.img ? (
          <img src={item.img} alt={item.name} referrerPolicy="no-referrer"
            onError={e => { e.currentTarget.style.display = 'none'; }}
            className="w-full h-full object-cover" />
        ) : (
          <Utensils size={18} className="text-[#112A1F]/30" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#112A1F] text-sm truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.category}</p>
        <p className="text-[#D4731A] font-black text-sm">₹{item.price}</p>
      </div>
      <div className="flex-shrink-0">
        {qty === 0 ? (
          <button onClick={add} className="w-9 h-9 rounded-full bg-[#112A1F] text-white flex items-center justify-center text-lg font-bold hover:bg-[#1E4A35] transition-colors shadow-sm">+</button>
        ) : (
          <div className="flex items-center gap-1.5">
            <button onClick={() => update(-1)} className="w-7 h-7 rounded-full border-2 border-[#112A1F] text-[#112A1F] font-black flex items-center justify-center"><Minus size={12}/></button>
            <span className="w-5 text-center font-black text-[#112A1F] text-sm">{qty}</span>
            <button onClick={() => update(+1)} className="w-7 h-7 rounded-full bg-[#112A1F] text-white font-black flex items-center justify-center"><Plus size={12}/></button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   ORDER SUMMARY DRAWER (Flexible Cart Management)
═══════════════════════════════════════════ */
const OrderDrawer = ({ open, onClose, tableNumber, customerName, cartItems, updateQuantity, removeFromCart, onConfirm }) => {
  const [specialNote, setSpecialNote] = useState('');
  const total = cartItems.reduce((s, i) => s + (parseFloat(i.price) * i.quantity), 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs" onClick={onClose} />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl p-6 max-h-[88vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>Review Your Order</h3>
                <p className="text-xs text-stone-500 font-semibold mt-0.5">
                  Table {tableNumber} • Guest: <span className="text-[#D4731A] font-bold">{customerName || 'Customer'}</span>
                </p>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors">
                <X size={18}/>
              </button>
            </div>

            {/* Cart Items List with Delete & Quantity adjustments */}
            <div className="space-y-3 mb-5 max-h-[40vh] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="py-8 text-center text-stone-400 text-xs">
                  Your order is empty. Add dishes from the menu below!
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-stone-50/80 rounded-2xl border border-stone-100">
                    <div className="flex-1 pr-3">
                      <p className="font-bold text-[#112A1F] text-sm leading-tight">{item.name}</p>
                      <p className="text-xs text-[#D4731A] font-bold mt-0.5">₹{(parseFloat(item.price) * item.quantity).toFixed(0)}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-full p-1 shadow-2xs">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-full text-[#112A1F] font-bold flex items-center justify-center hover:bg-stone-100">
                          <Minus size={12}/>
                        </button>
                        <span className="w-5 text-center font-black text-[#112A1F] text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-full bg-[#112A1F] text-white font-bold flex items-center justify-center">
                          <Plus size={12}/>
                        </button>
                      </div>

                      {/* Delete Item Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
                        title="Remove item"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add More Items Button */}
            <button 
              onClick={onClose}
              className="w-full py-2.5 mb-4 rounded-xl border border-dashed border-[#112A1F]/30 text-[#112A1F] text-xs font-bold uppercase tracking-wider hover:bg-stone-50 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus size={14} /> Add More Dishes
            </button>

            {/* Special Instructions */}
            <div className="mb-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">
                Special Requests / Cooking Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Extra spicy, less oil, serve hot..."
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full p-3 text-xs bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:border-[#DCA145] text-stone-800"
              />
            </div>

            {/* Total */}
            <div className="flex justify-between items-center bg-[#FFF8EC] rounded-2xl p-4 mb-4 border border-[#DCA145]/30 shadow-2xs">
              <p className="font-bold text-[#112A1F] text-xs uppercase tracking-wider">Total Bill Amount</p>
              <p className="font-black text-[#D4731A] text-2xl">₹{total.toFixed(0)}</p>
            </div>

            <p className="text-[11px] text-stone-500 text-center mb-4 leading-relaxed font-medium">
              ⚡ Order will be dispatched directly to Table #{tableNumber} for <span className="font-bold text-[#112A1F]">{customerName}</span>. No waiting for waiter!
            </p>

            {/* Confirm Button */}
            <button 
              disabled={cartItems.length === 0}
              onClick={() => onConfirm(specialNote)}
              className="w-full flex items-center justify-center gap-2 bg-[#112A1F] hover:bg-[#1E4A35] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
            >
              <Bell size={16}/> Confirm & Send Order to Kitchen
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ═══════════════════════════════════════════
   ORDER SUCCESS SCREEN
═══════════════════════════════════════════ */
const OrderSuccess = ({ tableNumber, customerName, onReset }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
    className="fixed inset-0 bg-[#112A1F] z-50 flex flex-col items-center justify-center p-8 text-center">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring' }}
      className="w-24 h-24 rounded-full bg-[#DCA145] flex items-center justify-center mb-6 shadow-xl">
      <CheckCircle2 size={48} color="#112A1F" strokeWidth={2.5}/>
    </motion.div>
    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Order Placed!</h2>
    <p className="text-[#DCA145] font-bold text-lg mb-1">Table #{tableNumber} • {customerName}</p>
    <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-xs">
      Your order is sent straight to the kitchen! Freshly prepared food will be served directly at your table. 🍽️
    </p>
    <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2 }}
      className="flex items-center gap-2 bg-[#DCA145]/20 border border-[#DCA145]/40 px-6 py-3 rounded-full mb-8">
      <Bell size={16} className="text-[#DCA145]"/>
      <span className="text-[#DCA145] text-xs font-bold uppercase tracking-wider">Sent to Kitchen</span>
    </motion.div>
    <button onClick={onReset}
      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
      + Add More Dishes to Table #{tableNumber}
    </button>
  </motion.div>
);

/* ═══════════════════════════════════════════
   TABLE MODE — Customer Entry & Menu Flow
═══════════════════════════════════════════ */
const TableMenuMode = ({ tableNumber: initialTableNumber }) => {
  const { menuItems, loading } = useMenuData();
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  
  // Table & Customer Name State
  const [tableNumber, setTableNumber] = useState(() => {
    return initialTableNumber || localStorage.getItem('table_ordering_number') || '1';
  });
  const [customerName, setCustomerName] = useState(() => {
    return localStorage.getItem('table_ordering_customer_name') || '';
  });
  const [hasEnteredDetails, setHasEnteredDetails] = useState(() => {
    return Boolean(localStorage.getItem('table_ordering_customer_name'));
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  // Show ONLY active/available dishes to customers
  const activeDishes = menuItems.filter(item => item.available !== false);
  const categories = ['All', ...Array.from(new Set(activeDishes.map(i => i.category || i.cat).filter(Boolean)))];
  const filtered = activeDishes.filter(item => {
    const matchCat = activeCategory === 'All' || (item.category || item.cat) === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSaveDetails = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      toast.error('Please enter your name to proceed');
      return;
    }
    localStorage.setItem('table_ordering_number', tableNumber);
    localStorage.setItem('table_ordering_customer_name', customerName.trim());
    setHasEnteredDetails(true);
    toast.success(`Welcome ${customerName}! You can now browse & order.`);
  };

  const handleConfirmOrder = async (specialNote) => {
    const totalAmount = cartItems.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);
    const orderPayload = {
      orderId: `TBL-${tableNumber}-${Date.now().toString().slice(-4)}`,
      customerName: `${customerName} (Table ${tableNumber})`,
      phone: `Table ${tableNumber}`,
      address: `Table #${tableNumber}${specialNote ? ` | Note: ${specialNote}` : ''}`,
      items: cartItems,
      totalAmount: totalAmount,
      paymentMethod: 'Table QR Order',
      paymentStatus: 'Pending Kitchen'
    };

    try {
      await submitOrderToDatabase(orderPayload);
    } catch (err) {
      console.warn('Order submit notice:', err);
    }

    setShowDrawer(false);
    setOrdered(true);
    toast.success(`Order placed for Table ${tableNumber} (${customerName})!`);
    clearCart();
  };

  if (ordered) {
    return (
      <OrderSuccess 
        tableNumber={tableNumber} 
        customerName={customerName} 
        onReset={() => setOrdered(false)} 
      />
    );
  }

  // Step 1: Customer Details Entry Modal/Screen
  if (!hasEnteredDetails) {
    return (
      <div className="min-h-screen bg-[#FFF8EC] flex items-center justify-center p-4">
        <Helmet>
          <title>Table Ordering | Sri Mahalakshmi Kitchen</title>
        </Helmet>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#DCA145]/30 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#112A1F] text-[#DCA145] flex items-center justify-center mx-auto mb-4 shadow-md">
            <Utensils size={28} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4731A] mb-1">Instant Table Service</p>
          <h2 className="text-2xl font-bold text-[#112A1F] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sri Mahalakshmi
          </h2>
          <p className="text-xs text-stone-500 mb-6">Enter details below to browse menu & order directly from your phone!</p>

          <form onSubmit={handleSaveDetails} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Table Number
              </label>
              <input
                required
                type="number"
                min="1"
                max="100"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#DCA145] focus:ring-2 focus:ring-[#DCA145]/20 outline-none text-sm font-bold text-[#112A1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Anish / Swetha"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#DCA145] focus:ring-2 focus:ring-[#DCA145]/20 outline-none text-sm font-semibold text-[#112A1F]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#112A1F] hover:bg-[#1E4A35] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md transition-all pt-4"
            >
              View Menu & Start Order →
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EC] flex flex-col">
      <Helmet>
        <title>Table {tableNumber} Menu | Sri Mahalakshmi</title>
      </Helmet>

      {/* Header */}
      <div className="bg-[#112A1F] px-4 py-4 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#DCA145] font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Sri Mahalakshmi</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-gray-300 text-[10px] font-bold uppercase tracking-wider">
                Table #{tableNumber} • {customerName}
              </span>
              <button 
                onClick={() => setHasEnteredDetails(false)}
                className="text-[9px] text-[#DCA145] underline font-semibold"
              >
                Change
              </button>
            </div>
          </div>
          <button 
            onClick={() => cartCount > 0 && setShowDrawer(true)}
            className="relative w-11 h-11 rounded-full bg-[#DCA145] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <ShoppingCart size={20} color="#112A1F" strokeWidth={2.5}/>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#112A1F]">{cartCount}</span>
            )}
          </button>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input 
            type="text" 
            placeholder="Search delicious dishes..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-gray-400 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:bg-white/20 transition-colors" 
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-gray-100 sticky top-[95px] z-10 hide-scrollbar shadow-2xs">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-[#112A1F] text-white border-[#112A1F] shadow-xs' : 'bg-white text-[#112A1F] border-stone-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="flex-1 px-4 py-4 space-y-2.5 pb-28">
        {loading ? (
          <LogoLoader size="sm" message="Loading Kitchen Menu..." />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <Utensils size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-bold text-stone-600">No available dishes found</p>
            <p className="text-xs text-stone-400 mt-1">Try another category or search term</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map(item => <MiniCard key={item.id} item={item} />)}
          </AnimatePresence>
        )}
      </div>

      {/* Sticky "View Order" bottom bar */}
      {cartCount > 0 && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 shadow-[0_-4px_25px_rgba(0,0,0,0.1)]">
          <button onClick={() => setShowDrawer(true)}
            className="w-full flex items-center justify-between bg-[#112A1F] text-white px-5 py-4 rounded-2xl font-bold text-sm shadow-lg hover:bg-[#1E4A35] active:scale-[0.99] transition-all">
            <span className="flex items-center gap-2"><ShoppingCart size={18}/> View Order ({cartCount} items)</span>
            <span className="text-[#DCA145] font-black text-base">₹{cartItems.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0).toFixed(0)}</span>
          </button>
        </motion.div>
      )}

      {/* Order Drawer */}
      <OrderDrawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        tableNumber={tableNumber}
        customerName={customerName}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════
   ADMIN / MANAGER VIEW — QR Generator
═══════════════════════════════════════════ */
const AdminQRView = () => {
  const { menuItems, loading } = useMenuData();
  const { cartItems, setIsCartOpen } = useCart();
  const [view, setView] = useState('qr');
  const [tableNumber, setTableNumber] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const categories = ['All', ...Array.from(new Set(menuItems.map(i => i.category || i.cat).filter(Boolean)))];
  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || (item.category || item.cat) === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFF8EC] pt-20">
      <Helmet>
        <title>Digital Menu & QR | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Generate QR codes for each table. Customers scan to view menu and order." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4731A] mb-2">Digital Table Menu</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>Scan. Browse. Order.</h1>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">Generate QR codes for your tables. Customers scan to instantly browse & order — no payment page, waiter is notified directly.</p>
        </div>

        {/* Toggle tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1 shadow-sm gap-1">
            <button onClick={() => setView('qr')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${view === 'qr' ? 'bg-[#112A1F] text-white shadow-md' : 'text-[#112A1F] hover:bg-gray-50'}`}>
              <QrCode size={14}/> QR Cards
            </button>
            <button onClick={() => setView('menu')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${view === 'menu' ? 'bg-[#112A1F] text-white shadow-md' : 'text-[#112A1F] hover:bg-gray-50'}`}>
              <Utensils size={14}/> Menu Preview
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ── QR Generator ── */}
          {view === 'qr' && (
            <motion.div key="qr" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
                <div className="w-full lg:w-80 space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#112A1F] mb-4 text-sm uppercase tracking-widest">Select Table Number</h3>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                        <button key={n} onClick={() => setTableNumber(n)}
                          className={`aspect-square rounded-lg text-sm font-bold transition-all ${tableNumber === n ? 'bg-[#112A1F] text-white shadow-md' : 'bg-[#FFF8EC] text-[#112A1F] hover:bg-[#112A1F]/10 border border-gray-200'}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 text-center">Or enter a custom number</p>
                    <input type="number" min={1} value={tableNumber} onChange={e => setTableNumber(Number(e.target.value) || 1)}
                      className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-center text-lg font-black text-[#112A1F] focus:outline-none focus:border-[#DCA145]" />
                  </div>

                  <div className="bg-[#112A1F] rounded-2xl p-6 text-white">
                    <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-[#DCA145]">How it works</h3>
                    {['Select & print a QR card for each table', 'Customer scans with their phone camera', 'They browse menu & add items', 'Tap "Notify Waiter" — no payment needed', 'Waiter serves the order at the table'].map((s, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3">
                        <span className="w-5 h-5 rounded-full bg-[#DCA145] text-black text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-gray-300 text-xs leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:flex-1 flex justify-center">
                  <QRCard tableNumber={tableNumber} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Menu Preview ── */}
          {view === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
                <div className="hidden lg:flex justify-center">
                  <div className="w-[380px] rounded-[40px] border-[8px] border-gray-800 overflow-hidden shadow-2xl" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.3), inset 0 0 0 2px #333' }}>
                    <TableMenuMode tableNumber={1} />
                  </div>
                </div>
                <div className="lg:hidden w-full">
                  <p className="text-center text-xs text-gray-500 mb-4">This is what customers see after scanning the QR code</p>
                  <TableMenuMode tableNumber={1} />
                </div>
                <div className="hidden lg:block w-64 space-y-4 sticky top-24">
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-2">📱 Customer View</p>
                    <p className="text-sm text-gray-600 leading-relaxed">This is exactly what your customer sees on their phone after scanning the QR code from the table.</p>
                  </div>
                  <div className="bg-[#112A1F] rounded-2xl p-5 text-white text-xs text-gray-300 leading-relaxed">
                    <p className="text-[#DCA145] font-bold mb-2">✅ No Payment Page</p>
                    Customers tap "Notify Waiter" to confirm their order. The waiter receives and serves — payment at the counter or with bill.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN EXPORT — detects table mode from URL
═══════════════════════════════════════════ */
const DigitalMenu = () => {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get('table');

  // If URL has ?table=N, render the customer-facing table menu
  if (tableNumber) {
    return <TableMenuMode tableNumber={tableNumber} />;
  }

  // Otherwise show the admin/manager QR generator view
  return <AdminQRView />;
};

export default DigitalMenu;
