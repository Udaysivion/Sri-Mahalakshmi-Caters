import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Utensils, QrCode, Printer, Search, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenuData } from '../hooks/useMenuData';
import LogoLoader from '../components/common/LogoLoader';
import toast from 'react-hot-toast';

const SITE_URL = window.location.origin;

/* ═══════════════════════════════════════════
   QR CARD — printable per table
═══════════════════════════════════════════ */
const QRCard = ({ tableNumber }) => {
  const menuUrl = `${SITE_URL}/menu?table=${tableNumber}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(menuUrl)}&color=112A1F&bgcolor=FFF8EC&margin=10`;

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
            .card {
              width: 85mm; padding: 20px; border: 2px solid #DCA145;
              border-radius: 12px; text-align: center; background: #FFF8EC;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            .logo { font-size: 22px; font-weight: bold; color: #112A1F; letter-spacing: 2px; margin-bottom: 2px; }
            .sub { font-size: 9px; color: #D4731A; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 14px; }
            .divider { height: 1px; background: linear-gradient(to right, transparent, #DCA145, transparent); margin: 10px 0; }
            .table-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px; }
            .table-num { font-size: 32px; font-weight: bold; color: #112A1F; margin-bottom: 14px; }
            img { width: 180px; height: 180px; border: 2px solid #DCA14533; border-radius: 8px; margin-bottom: 14px; }
            .hint { font-size: 10px; color: #888; line-height: 1.5; }
            .steps { text-align: left; margin: 12px 0; padding-left: 0; list-style: none; }
            .steps li { font-size: 9px; color: #555; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
            .step-num { width: 16px; height: 16px; background: #112A1F; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: bold; flex-shrink: 0; }
            .url { font-size: 8px; color: #aaa; margin-top: 10px; word-break: break-all; }
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
            <div class="hint"><strong>Scan to view our menu &amp; order instantly</strong></div>
            <ul class="steps">
              <li><span class="step-num">1</span> Open your camera app</li>
              <li><span class="step-num">2</span> Point at the QR code</li>
              <li><span class="step-num">3</span> Tap the link that appears</li>
              <li><span class="step-num">4</span> Browse &amp; add items to cart</li>
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
      <h2 className="text-2xl font-bold text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>
        SRI MAHALAKSHMI
      </h2>
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Kitchen & Caterers</p>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#DCA145] to-transparent" />

      <div className="text-center">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Table Number</p>
        <p className="text-5xl font-black text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>
          {tableNumber}
        </p>
      </div>

      {/* QR Code */}
      <div className="p-3 bg-white rounded-xl border border-[#DCA145]/30 shadow-sm">
        <img
          src={qrUrl}
          alt={`QR Code for Table ${tableNumber}`}
          className="w-44 h-44"
        />
      </div>

      <p className="text-xs text-gray-600 text-center font-medium">
        📷 Scan to browse our menu & place your order instantly
      </p>

      {/* Steps */}
      <div className="w-full space-y-2">
        {['Open your camera app', 'Point at the QR code', 'Browse our full menu', 'Add items & place order'].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-[#112A1F] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-[11px] text-gray-600">{step}</span>
          </div>
        ))}
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#DCA145] to-transparent" />

      <button
        onClick={handlePrint}
        className="w-full flex items-center justify-center gap-2 bg-[#112A1F] hover:bg-[#1E4A35] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
      >
        <Printer size={14} /> Print This Card
      </button>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   MINI FOOD CARD — compact mobile list view
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100"
    >
      {/* Image / placeholder */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FFF8EC] flex-shrink-0 flex items-center justify-center">
        {item.img ? (
          <img
            src={item.img}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={e => { e.currentTarget.style.display = 'none'; }}
            className="w-full h-full object-cover"
          />
        ) : (
          <Utensils size={18} className="text-[#112A1F]/30" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#112A1F] text-sm truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.name}
        </p>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.category}</p>
        <p className="text-[#D4731A] font-black text-sm">₹{item.price}</p>
      </div>

      {/* Add / qty control */}
      <div className="flex-shrink-0">
        {qty === 0 ? (
          <button
            onClick={add}
            className="w-9 h-9 rounded-full bg-[#112A1F] text-white flex items-center justify-center text-lg font-bold hover:bg-[#1E4A35] transition-colors shadow-sm"
          >+</button>
        ) : (
          <div className="flex items-center gap-1.5">
            <button onClick={() => update(-1)} className="w-7 h-7 rounded-full border-2 border-[#112A1F] text-[#112A1F] font-black flex items-center justify-center text-base">−</button>
            <span className="w-5 text-center font-black text-[#112A1F] text-sm">{qty}</span>
            <button onClick={() => update(+1)} className="w-7 h-7 rounded-full bg-[#112A1F] text-white font-black flex items-center justify-center text-base">+</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
const DigitalMenu = () => {
  const { menuItems, loading } = useMenuData();
  const { cartItems, setIsCartOpen } = useCart();
  const [view, setView] = useState('qr'); // 'qr' | 'menu'
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
        <meta name="description" content="Scan our QR code at your table to view our full menu and order instantly." />
      </Helmet>

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4731A] mb-2">Digital Table Menu</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#112A1F]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Scan. Browse. Order.
          </h1>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            Generate a QR code for each table. Customers scan it to instantly view the menu and place orders from their phone.
          </p>
        </div>

        {/* ── Tab Toggle ── */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1 shadow-sm gap-1">
            <button
              onClick={() => setView('qr')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${view === 'qr' ? 'bg-[#112A1F] text-white shadow-md' : 'text-[#112A1F] hover:bg-gray-50'}`}
            >
              <QrCode size={14} /> QR Cards
            </button>
            <button
              onClick={() => setView('menu')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${view === 'menu' ? 'bg-[#112A1F] text-white shadow-md' : 'text-[#112A1F] hover:bg-gray-50'}`}
            >
              <Utensils size={14} /> Menu Preview
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ═══ QR VIEW ═══ */}
          {view === 'qr' && (
            <motion.div key="qr" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">

                {/* Left: Controls */}
                <div className="w-full lg:w-80 space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#112A1F] mb-4 text-sm uppercase tracking-widest">Select Table Number</h3>

                    {/* Table picker grid */}
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                        <button
                          key={n}
                          onClick={() => setTableNumber(n)}
                          className={`aspect-square rounded-lg text-sm font-bold transition-all ${tableNumber === n ? 'bg-[#112A1F] text-white shadow-md' : 'bg-[#FFF8EC] text-[#112A1F] hover:bg-[#112A1F]/10 border border-gray-200'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-gray-400 text-center">Or type a custom number</p>
                    <input
                      type="number"
                      min={1}
                      value={tableNumber}
                      onChange={e => setTableNumber(Number(e.target.value) || 1)}
                      className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-center text-lg font-black text-[#112A1F] focus:outline-none focus:border-[#DCA145]"
                    />
                  </div>

                  {/* Instructions card */}
                  <div className="bg-[#112A1F] rounded-2xl p-6 text-white">
                    <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-[#DCA145]">How to Use</h3>
                    {[
                      'Select a table number above',
                      'Print the QR card on the right',
                      'Place it on the corresponding table',
                      'Customers scan & order from their phone'
                    ].map((s, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3">
                        <span className="w-5 h-5 rounded-full bg-[#DCA145] text-black text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-gray-300 text-xs leading-relaxed">{s}</p>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <p className="text-[10px] text-gray-400">💡 Tip: Print multiple cards for all your tables at once.</p>
                    </div>
                  </div>
                </div>

                {/* Right: QR Card Preview */}
                <div className="w-full lg:flex-1 flex justify-center">
                  <QRCard tableNumber={tableNumber} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ MENU PREVIEW VIEW (mobile style) ═══ */}
          {view === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>

              {/* Mobile phone mockup wrapper on desktop */}
              <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">

                {/* Phone frame (desktop only) */}
                <div className="hidden lg:flex justify-center">
                  <div className="w-[380px] rounded-[40px] border-[8px] border-gray-800 overflow-hidden shadow-2xl"
                    style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.3), inset 0 0 0 2px #333' }}>
                    <MenuMobilePreview
                      loading={loading}
                      categories={categories}
                      activeCategory={activeCategory}
                      setActiveCategory={setActiveCategory}
                      search={search}
                      setSearch={setSearch}
                      filtered={filtered}
                      cartCount={cartCount}
                      setIsCartOpen={setIsCartOpen}
                    />
                  </div>
                </div>

                {/* Full width on mobile */}
                <div className="lg:hidden w-full">
                  <MenuMobilePreview
                    loading={loading}
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    search={search}
                    setSearch={setSearch}
                    filtered={filtered}
                    cartCount={cartCount}
                    setIsCartOpen={setIsCartOpen}
                  />
                </div>

                {/* Side info */}
                <div className="hidden lg:block w-72 space-y-4 sticky top-24">
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-2">📱 Mobile Preview</p>
                    <p className="text-sm text-gray-600 leading-relaxed">This is exactly what your customers see when they scan the QR code from their table.</p>
                  </div>
                  {cartCount > 0 && (
                    <div className="bg-[#112A1F] rounded-2xl p-5 text-white">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#DCA145] mb-2">🛒 Cart ({cartCount} items)</p>
                      <button onClick={() => setIsCartOpen(true)} className="w-full bg-[#DCA145] text-black py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#c99036] transition-all">
                        View Cart
                      </button>
                    </div>
                  )}
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
   MOBILE MENU PREVIEW INNER COMPONENT
═══════════════════════════════════════════ */
const MenuMobilePreview = ({ loading, categories, activeCategory, setActiveCategory, search, setSearch, filtered, cartCount, setIsCartOpen }) => (
  <div className="bg-[#FFF8EC] min-h-[600px] flex flex-col">
    {/* Sticky header */}
    <div className="bg-[#112A1F] px-4 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[#DCA145] font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Sri Mahalakshmi</p>
          <p className="text-gray-400 text-[9px] uppercase tracking-widest">Kitchen & Caterers</p>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="relative w-9 h-9 rounded-full bg-[#DCA145] flex items-center justify-center">
          <ShoppingCart size={16} color="#112A1F" strokeWidth={2.5}/>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">{cartCount}</span>
          )}
        </button>
      </div>
      {/* Search */}
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/10 text-white placeholder-gray-400 text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:bg-white/20"
        />
      </div>
    </div>

    {/* Category tabs */}
    <div className="flex gap-2 overflow-x-auto px-4 py-3 hide-scrollbar bg-white border-b border-gray-100 sticky top-[88px] z-10">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-[#112A1F] text-white border-[#112A1F]' : 'bg-white text-[#112A1F] border-gray-200'}`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* Items list */}
    <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto">
      {loading ? (
        <LogoLoader size="sm" message="Loading Menu..." />
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">No items found</div>
      ) : (
        <AnimatePresence>
          {filtered.map(item => <MiniCard key={item.id} item={item} />)}
        </AnimatePresence>
      )}
    </div>
  </div>
);

export default DigitalMenu;
