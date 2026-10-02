import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Check, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useMenuData } from '../hooks/useMenuData';
import LogoLoader from '../components/common/LogoLoader';

/* ─── Menu Data comes from Google Sheets ─── */

/* ─── Premium Food Card ─── */
const FoodCard = ({ item }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = cartItems.find(i => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item);
    toast.success(`${item.name} added!`, {
      style:{ background:'#1B4332', color:'#FFF8EC', borderRadius:'2px', fontFamily:"'Inter',sans-serif", fontSize:'13px', fontWeight:600 },
      iconTheme: { primary: '#D4731A', secondary: '#FFF8EC' }
    });
  };

  const handleUpdate = (e, delta) => {
    e.stopPropagation();
    if (quantity === 1 && delta === -1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, delta);
    }
  };

  return (
    <motion.div layout
      initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.95}}
      transition={{duration:0.35}}
      className="group flex flex-col bg-white overflow-hidden transition-all duration-300 relative border border-[#1B4332]/10 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(27,67,50,0.08)] hover:-translate-y-1 rounded-sm">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#1B4332]/5 flex items-center justify-center">
        {item.img ? (
          <img 
            src={item.img} 
            alt={item.name} 
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const placeholder = e.currentTarget.parentElement.querySelector('.dish-placeholder');
              if (placeholder) placeholder.style.display = 'flex';
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            loading="lazy" 
          />
        ) : null}
        
        <div 
          className="dish-placeholder flex-col items-center justify-center text-[#1B4332]/40 gap-2 p-4 text-center"
          style={{ display: item.img ? 'none' : 'flex' }}
        >
          <Utensils size={32} strokeWidth={1.5} />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1B4332]/60">{item.name}</span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.special && <span className="text-[9px] font-bold px-2 py-1 uppercase tracking-widest bg-[#1B4332] text-white">Signature</span>}
          {item.best && <span className="text-[9px] font-bold px-2 py-1 uppercase tracking-widest bg-[#D4731A] text-white">Popular</span>}
        </div>
        
        {/* Veg/Non-Veg */}
        <div className="absolute top-3 right-3 w-5 h-5 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm" style={{ border:`1.5px solid ${item.type==='Veg'?'#2E7D32':'#C62828'}` }}>
          <div className="w-2 h-2 rounded-full" style={{ background:item.type==='Veg'?'#2E7D32':'#C62828' }}/>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-semibold leading-tight text-[#1B4332]" style={{ fontFamily:"'Playfair Display',serif" }}>
            {item.name}
          </h3>
          <span className="font-bold text-lg text-[#D4731A]" style={{ fontFamily:"'Inter',sans-serif" }}>
            ₹{item.price}
          </span>
        </div>
        
        <p className="text-[13px] mb-6 flex-grow text-[#6B4423] leading-relaxed font-medium">
          {item.desc}
        </p>
        
        {quantity > 0 ? (
          <div className="w-full flex items-center justify-between border border-[#1B4332] py-2.5 px-4 bg-[#1B4332] text-white transition-all shadow-sm">
            <button onClick={(e) => handleUpdate(e, -1)} className="text-xl font-bold px-3 hover:text-[#D4731A] transition-colors leading-none pb-1">-</button>
            <span className="font-bold text-sm tracking-widest">{quantity}</span>
            <button onClick={(e) => handleUpdate(e, 1)} className="text-xl font-bold px-3 hover:text-[#D4731A] transition-colors leading-none pb-1">+</button>
          </div>
        ) : (
          <button 
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest transition-all bg-transparent text-[#1B4332] border border-[#1B4332] hover:bg-[#1B4332] hover:text-white"
            style={{ fontFamily:"'Inter',sans-serif" }}
          >
            <ShoppingCart size={14} /> Add to Order
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [diet, setDiet] = useState('All');
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState([]);
  
  const { menuItems: allItems, loading } = useMenuData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = ['All','Tiffins','Chinese','Biryani','Curries','Rice'];

  const filtered = allItems.filter(item => {
    const tMatch = activeTab === 'All' || item.cat === activeTab;
    const dMatch = diet === 'All' || item.type === diet;
    const sMatch = item.name.toLowerCase().includes(search.toLowerCase());
    return tMatch && dMatch && sMatch;
  });

  const handleAddItem = (item) => {
    addToCart(item);
    setAddedItems(prev => [...prev, item.id]);
    toast.success(`${item.name} added!`, {
      style:{ background:'#1B4332', color:'#FFF8EC', borderRadius:'2px', fontFamily:"'Inter',sans-serif", fontSize:'13px', fontWeight:600 },
      iconTheme: { primary: '#D4731A', secondary: '#FFF8EC' }
    });
    
    // Reset added state after 2 seconds for visual feedback
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="bg-[#FFF8EC] min-h-screen pb-24 pt-28">
      <Helmet>
        <title>Menu | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Explore our premium authentic South Indian menu." />
      </Helmet>

      {/* Header Area (No huge image hero) */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-[#D4731A]">OUR MENU</p>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1B4332] mb-6 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
          Traditional Flavours.<br/>Made Fresh.
        </h1>
        <div className="w-16 h-[1px] bg-[#D4731A]/40 mx-auto"></div>
      </div>

      {/* Filters (Non-sticky to prevent overlap with cards during scroll) */}
      <div className="max-w-6xl mx-auto px-4 py-4 bg-[#FFF8EC] mb-8 border-b border-[#1B4332]/10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {tabs.map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest transition-all border"
                style={{
                  background: activeTab===t ? '#1B4332' : 'transparent',
                  color: activeTab===t ? 'white' : '#1B4332',
                  borderColor: activeTab===t ? '#1B4332' : 'rgba(27,67,50,0.15)',
                  fontFamily:"'Inter',sans-serif",
                }}>
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Diet Filter */}
            <div className="flex bg-white border border-[#1B4332]/15 rounded-sm p-1">
              {['All','Veg','Non-Veg'].map(f=>(
                <button key={f} onClick={()=>setDiet(f)}
                  className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all ${diet === f ? 'bg-[#FFF8EC] text-[#1B4332]' : 'text-[#6B4423] hover:bg-gray-50'}`}>
                  {f}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-grow md:w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B4332]/50"/>
              <input type="text" placeholder="Search dishes..." value={search} onChange={e=>setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-[#1B4332]/15 bg-white outline-none focus:border-[#D4731A] transition-colors rounded-sm text-[#1B4332] placeholder-[#1B4332]/40 font-medium"/>
            </div>
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="py-20 flex justify-center">
            <LogoLoader 
              size="lg" 
              message="Loading Kitchen Menu..." 
              subtext="Fetching today's authentic dishes" 
            />
          </div>
        ) : (
          <AnimatePresence>
            {filtered.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(item => (
                  <FoodCard key={item.id} item={item} addItem={handleAddItem} addedItems={addedItems} />
                ))}
              </motion.div>
          ) : (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-32 border border-[#1B4332]/5 bg-white">
              <p className="text-[#D4731A] mb-4"><Search size={32} className="mx-auto" opacity={0.5} /></p>
              <h3 className="text-2xl text-[#1B4332] mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>No dishes found</h3>
              <p className="text-sm text-[#6B4423]">Try adjusting your filters or search term.</p>
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Menu;