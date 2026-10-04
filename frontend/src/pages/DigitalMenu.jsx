import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Utensils, QrCode, Printer, Search, CheckCircle2, Bell, X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenuData } from '../hooks/useMenuData';
import LogoLoader from '../components/common/LogoLoader';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

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
   ORDER SUMMARY DRAWER (no payment)
═══════════════════════════════════════════ */
const OrderDrawer = ({ open, onClose, tableNumber, cartItems, onConfirm }) => {
  const total = cartItems.reduce((s, i) => s + (parseFloat(i.price) * i.quantity), 0);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28 }}
            className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>Your Order</h3>
                <p className="text-xs text-gray-400">Table {tableNumber}</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={16}/></button>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-5">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50">
                  <div>
                    <p className="font-semibold text-[#112A1F] text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="font-bold text-[#D4731A]">₹{(parseFloat(item.price) * item.quantity).toFixed(0)}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center bg-[#FFF8EC] rounded-xl p-4 mb-5 border border-[#DCA145]/30">
              <p className="font-bold text-[#112A1F] text-sm uppercase tracking-wide">Total</p>
              <p className="font-black text-[#D4731A] text-xl">₹{total.toFixed(0)}</p>
            </div>

            <p className="text-xs text-gray-500 text-center mb-4">
              🔔 Once you confirm, the waiter will be notified to serve you. No online payment needed.
            </p>

            {/* Confirm Button */}
            <button onClick={onConfirm}
              className="w-full flex items-center justify-center gap-2 bg-[#112A1F] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#1E4A35] transition-all shadow-lg">
              <Bell size={16}/> Notify Waiter & Confirm Order
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
const OrderSuccess = ({ tableNumber, onReset }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
    className="fixed inset-0 bg-[#112A1F] z-50 flex flex-col items-center justify-center p-8 text-center">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
      className="w-24 h-24 rounded-full bg-[#DCA145] flex items-center justify-center mb-6">
      <CheckCircle2 size={48} color="#112A1F" strokeWidth={2.5}/>
    </motion.div>
    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Order Placed!</h2>
    <p className="text-[#DCA145] font-bold text-lg mb-1">Table {tableNumber}</p>
    <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-xs">
      Your waiter has been notified. Sit back and relax — your food is on its way! 🍽️
    </p>
    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}
      className="flex items-center gap-2 bg-[#DCA145]/20 border border-[#DCA145]/40 px-6 py-3 rounded-full mb-8">
      <Bell size={16} className="text-[#DCA145]"/>
      <span className="text-[#DCA145] text-sm font-bold">Waiter Notified</span>
    </motion.div>
    <button onClick={onReset}
      className="text-gray-400 text-xs underline underline-offset-4 hover:text-white transition-colors">
      Order more items
    </button>
  </motion.div>
);

/* ═══════════════════════════════════════════
   TABLE MODE — what customers see after QR scan
═══════════════════════════════════════════ */
const TableMenuMode = ({ tableNumber }) => {
  const { menuItems, loading } = useMenuData();
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const categories = ['All', ...Array.from(new Set(menuItems.map(i => i.category).filter(Boolean)))];
  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleConfirmOrder = () => {
    setShowDrawer(false);
    setOrdered(true);
    clearCart();
  };

  if (ordered) return <OrderSuccess tableNumber={tableNumber} onReset={() => setOrdered(false)} />;

  return (
    <div className="min-h-screen bg-[#FFF8EC] flex flex-col">
      <Helmet>
        <title>Table {tableNumber} Menu | Sri Mahalakshmi</title>
      </Helmet>

      {/* Header */}
      <div className="bg-[#112A1F] px-4 py-4 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#DCA145] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Sri Mahalakshmi</p>
            <p className="text-gray-400 text-[9px] uppercase tracking-widest">Table {tableNumber}</p>
          </div>
          <button onClick={() => cartCount > 0 && setShowDrawer(true)}
            className="relative w-10 h-10 rounded-full bg-[#DCA145] flex items-center justify-center">
            <ShoppingCart size={18} color="#112A1F" strokeWidth={2.5}/>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder="Search dishes..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-gray-400 text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:bg-white/20" />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-gray-100 sticky top-[88px] z-10 hide-scrollbar">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-[#112A1F] text-white border-[#112A1F]' : 'bg-white text-[#112A1F] border-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="flex-1 px-4 py-3 space-y-2 pb-28">
        {loading ? (
          <LogoLoader size="sm" message="Loading Menu..." />
        ) : filtered.length === 0 ? (
          <p className="text-center py-10 text-gray-400 text-sm">No items found</p>
        ) : (
          <AnimatePresence>
            {filtered.map(item => <MiniCard key={item.id} item={item} />)}
          </AnimatePresence>
        )}
      </div>

      {/* Sticky "View Order" bottom bar */}
      {cartCount > 0 && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button onClick={() => setShowDrawer(true)}
            className="w-full flex items-center justify-between bg-[#112A1F] text-white px-5 py-4 rounded-2xl font-bold text-sm shadow-lg hover:bg-[#1E4A35] transition-all">
            <span className="flex items-center gap-2"><ShoppingCart size={16}/> View Order ({cartCount} items)</span>
            <span className="text-[#DCA145]">₹{cartItems.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0).toFixed(0)}</span>
          </button>
        </motion.div>
      )}

      {/* Order Drawer */}
      <OrderDrawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        tableNumber={tableNumber}
        cartItems={cartItems}
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
  const categories = ['All', ...Array.from(new Set(menuItems.map(i => i.category).filter(Boolean)))];
  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
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
