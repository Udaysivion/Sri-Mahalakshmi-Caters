import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

/* ─── Complete Menu Data ─── */
const allItems = [
  // TIFFINS
  {id:'t01',cat:'Tiffins',name:'Idly',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Soft steamed rice cakes with sambar & chutney.',best:true},
  {id:'t02',cat:'Tiffins',name:'Sambar Idly',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Idly in piping hot sambar.'},
  {id:'t03',cat:'Tiffins',name:'Ghee Karam Idly',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Idly tossed in ghee karam powder.'},
  {id:'t04',cat:'Tiffins',name:'Mysore Bonda',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Crispy fluffy urad dal bonda.'},
  {id:'t05',cat:'Tiffins',name:'Wada',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Crispy medu vada with sambar.'},
  {id:'t06',cat:'Tiffins',name:'Sambar Wada',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Vada soaked in tangy sambar.'},
  {id:'t07',cat:'Tiffins',name:'Puri',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400',desc:'Puffed puri with potato curry.'},
  {id:'t08',cat:'Tiffins',name:'Plain Dosa',price:40,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Crispy golden dosa.'},
  {id:'t09',cat:'Tiffins',name:'Onion Dosa',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Dosa topped with onions.'},
  {id:'t10',cat:'Tiffins',name:'Masala Dosa',price:60,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Dosa with spiced potato masala.',best:true},
  {id:'t11',cat:'Tiffins',name:'Ghee Karam Dosa',price:60,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Dosa with fragrant ghee karam.'},
  {id:'t12',cat:'Tiffins',name:'Egg Dosa',price:60,type:'Non-Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Crispy dosa with egg.'},
  {id:'t13',cat:'Tiffins',name:'Double Egg Dosa',price:70,type:'Non-Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Dosa with two eggs.'},
  {id:'t14',cat:'Tiffins',name:'Paneer Dosa',price:80,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Dosa stuffed with spiced paneer.',special:true},
  {id:'t15',cat:'Tiffins',name:'Chapathi (2)',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400',desc:'Soft whole wheat chapathis.'},
  // CHINESE
  {id:'c01',cat:'Chinese',name:'Veg Fried Rice',price:80,type:'Veg',img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400',desc:'Stir-fried rice with veggies.',best:true},
  {id:'c02',cat:'Chinese',name:'Paneer Fried Rice',price:120,type:'Veg',img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400',desc:'Fried rice with paneer.'},
  {id:'c03',cat:'Chinese',name:'Egg Fried Rice',price:90,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Classic egg fried rice.'},
  {id:'c04',cat:'Chinese',name:'Chicken Fried Rice',price:110,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Chicken fried rice.',best:true},
  {id:'c05',cat:'Chinese',name:'Schezwan Chicken Rice',price:120,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Spicy schezwan chicken rice.'},
  {id:'c06',cat:'Chinese',name:'Veg Noodles',price:80,type:'Veg',img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400',desc:'Stir-fried veg noodles.'},
  {id:'c07',cat:'Chinese',name:'Egg Noodles',price:90,type:'Non-Veg',img:'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400',desc:'Egg tossed noodles.'},
  {id:'c08',cat:'Chinese',name:'Chicken Noodles',price:110,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Spicy chicken noodles.',special:true},
  {id:'c09',cat:'Chinese',name:'Chilli Chicken',price:180,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Crispy chilli chicken.',best:true},
  {id:'c10',cat:'Chinese',name:'Chicken 65',price:180,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Spicy fried chicken 65.',best:true},
  {id:'c11',cat:'Chinese',name:'Chicken Afghani',price:190,type:'Non-Veg',img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400',desc:'Creamy Afghani chicken.'},
  {id:'c12',cat:'Chinese',name:'Veg Manchuria',price:140,type:'Veg',img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400',desc:'Fried veg balls in sauce.'},
  {id:'c13',cat:'Chinese',name:'Chicken Manchuria',price:160,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Chicken in manchurian sauce.'},
  // BIRYANI
  {id:'b01',cat:'Biryani',name:'Veg Biryani',price:120,type:'Veg',img:'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=400',desc:'Aromatic veg biryani.',best:true},
  {id:'b02',cat:'Biryani',name:'Egg Biryani',price:140,type:'Non-Veg',img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',desc:'Biryani with fried eggs (2pc).'},
  {id:'b03',cat:'Biryani',name:'Paneer Biryani',price:130,type:'Veg',img:'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=400',desc:'Rich paneer biryani.'},
  {id:'b04',cat:'Biryani',name:'Chicken Dum Biryani',price:140,type:'Non-Veg',img:'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400',desc:'Slow-cooked dum biryani.',special:true,best:true},
  {id:'b05',cat:'Biryani',name:'Chicken Fry Piece Biryani',price:160,type:'Non-Veg',img:'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400',desc:'Biryani with fried chicken pieces.'},
  {id:'b06',cat:'Biryani',name:'Chicken 65 Biryani',price:190,type:'Non-Veg',img:'https://images.unsplash.com/photo-1548943487-a2e4e43b4859?auto=format&fit=crop&q=80&w=400',desc:'Chicken 65 biryani.',special:true},
  // CURRIES
  {id:'cu1',cat:'Curries',name:'Dal Fry',price:80,type:'Veg',img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400',desc:'Tempered yellow lentil curry.'},
  {id:'cu2',cat:'Curries',name:'Paneer Butter Masala',price:200,type:'Veg',img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400',desc:'Rich creamy paneer curry.',best:true},
  {id:'cu3',cat:'Curries',name:'Chicken Curry',price:100,type:'Non-Veg',img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400',desc:'Traditional chicken curry.',best:true},
  {id:'cu4',cat:'Curries',name:'Chicken Fry',price:100,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Crispy spiced chicken fry.'},
  {id:'cu5',cat:'Curries',name:'Butter Chicken',price:160,type:'Non-Veg',img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400',desc:'Creamy buttery chicken curry.',special:true},
  {id:'cu6',cat:'Curries',name:'Gongura Chicken',price:200,type:'Non-Veg',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',desc:'Authentic gongura chicken.',special:true},
  {id:'cu7',cat:'Curries',name:'Kaju Masala',price:200,type:'Veg',img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400',desc:'Cashew masala curry.'},
  {id:'cu8',cat:'Curries',name:'Veg Meals',price:140,type:'Veg',img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400',desc:'Full veg meal with rice, dal, curry.',best:true},
  // RICE
  {id:'r01',cat:'Rice',name:'Pudhina Rice',price:90,type:'Veg',img:'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=400',desc:'Fragrant mint rice.'},
  {id:'r02',cat:'Rice',name:'Jeera Rice',price:90,type:'Veg',img:'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=400',desc:'Cumin scented basmati.'},
  {id:'r03',cat:'Rice',name:'Tomato Rice',price:80,type:'Veg',img:'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=400',desc:'Tangy tomato rice.'},
  {id:'r04',cat:'Rice',name:'Curd Rice',price:100,type:'Veg',img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400',desc:'Cooling curd rice with tempering.'},
  {id:'r05',cat:'Rice',name:'Lemon Rice',price:90,type:'Veg',img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400',desc:'Tangy South Indian lemon rice.'},
  {id:'r06',cat:'Rice',name:'Sambar Rice',price:90,type:'Veg',img:'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=400',desc:'Rice cooked with sambar.'},
  {id:'r07',cat:'Rice',name:'Ghee Kaju Rice',price:160,type:'Veg',img:'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=400',desc:'Rich ghee rice with cashews.'},
];

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
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        
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
      </div>
    </motion.div>
  );
};

export default Menu;