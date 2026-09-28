import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

/* ─── Complete Menu Data ─── */
const allItems = [
  // TIFFINS
  {id:'t01',cat:'Tiffins',name:'Idly',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Soft steamed rice cakes with sambar & chutney.',best:true},
  {id:'t02',cat:'Tiffins',name:'Sambar Idly',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1627308595229-7830f5c90663?auto=format&fit=crop&q=80&w=400',desc:'Idly in piping hot sambar.'},
  {id:'t03',cat:'Tiffins',name:'Ghee Karam Idly',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Idly tossed in ghee karam powder.'},
  {id:'t04',cat:'Tiffins',name:'Mysore Bonda',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Crispy fluffy urad dal bonda.'},
  {id:'t05',cat:'Tiffins',name:'Wada',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Crispy medu vada with sambar.'},
  {id:'t06',cat:'Tiffins',name:'Sambar Wada',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',desc:'Vada soaked in tangy sambar.'},
  {id:'t07',cat:'Tiffins',name:'Puri',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400',desc:'Puffed puri with potato curry.'},
  {id:'t08',cat:'Tiffins',name:'Plain Dosa',price:40,type:'Veg',img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',desc:'Crispy golden dosa.'},
  {id:'t09',cat:'Tiffins',name:'Onion Dosa',price:50,type:'Veg',img:'https://images.unsplash.com/photo-1627308595229-7830f5c90663?auto=format&fit=crop&q=80&w=400',desc:'Dosa topped with onions.'},
  {id:'t10',cat:'Tiffins',name:'Masala Dosa',price:60,type:'Veg',img:'https://images.unsplash.com/photo-1551239841-f7e9f3b14bb2?auto=format&fit=crop&q=80&w=400',desc:'Dosa with spiced potato masala.',best:true},
  {id:'t11',cat:'Tiffins',name:'Ghee Karam Dosa',price:60,type:'Veg',img:'https://images.unsplash.com/photo-1551239841-f7e9f3b14bb2?auto=format&fit=crop&q=80&w=400',desc:'Dosa with fragrant ghee karam.'},
  {id:'t12',cat:'Tiffins',name:'Egg Dosa',price:60,type:'Non-Veg',img:'https://images.unsplash.com/photo-1627308595229-7830f5c90663?auto=format&fit=crop&q=80&w=400',desc:'Crispy dosa with egg.'},
  {id:'t13',cat:'Tiffins',name:'Double Egg Dosa',price:70,type:'Non-Veg',img:'https://images.unsplash.com/photo-1627308595229-7830f5c90663?auto=format&fit=crop&q=80&w=400',desc:'Dosa with two eggs.'},
  {id:'t14',cat:'Tiffins',name:'Paneer Dosa',price:80,type:'Veg',img:'https://images.unsplash.com/photo-1551239841-f7e9f3b14bb2?auto=format&fit=crop&q=80&w=400',desc:'Dosa stuffed with spiced paneer.',special:true},
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

const Menu = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [diet, setDiet] = useState('All');
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    if(window.location.hash === '#filters') {
      setTimeout(() => document.getElementById('filters')?.scrollIntoView({ behavior:'smooth' }), 100);
    } else window.scrollTo(0, 0);
  }, []);

  const tabs = ['All','Tiffins','Chinese','Biryani','Curries','Rice'];

  const filtered = allItems.filter(item => {
    const tMatch = activeTab === 'All' || item.cat === activeTab;
    const dMatch = diet === 'All' || item.type === diet;
    const sMatch = item.name.toLowerCase().includes(search.toLowerCase());
    return tMatch && dMatch && sMatch;
  });

  const addItem = (item) => {
    addToCart(item);
    toast.success(`${item.name} added! 🍽️`, {
      style:{ background:'#1B4332', color:'#FFF8EC', borderRadius:'10px', fontFamily:"'Baloo 2',sans-serif" },
    });
  };

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{ background:'#FFF8EC', minHeight:'100vh' }}>
      <Helmet>
        <title>Menu | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Full menu — Tiffins, Chinese, Biryani, Curries and Rice. authentic style, honest prices." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-16 overflow-hidden" style={{ background:'#1B4332' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,height:'4px', background:'linear-gradient(to right,#D4731A,#C4960A,#E0B030,#C4960A,#D4731A)' }}/>
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage:"url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000')" }}/>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom,rgba(27,50,10,0.92),rgba(45,90,30,0.95))' }}/>
        <div className="relative z-10 text-center py-12 px-4">
          <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="text-sm font-bold mb-1 uppercase tracking-widest" style={{ color:'#E0B030' }}>
            🍽️ Traditional Flavours
          </motion.p>
          <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            style={{ fontFamily:"'Baloo 2',sans-serif",fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:900,color:'white',marginBottom:'0.3rem' }}>
            Our Menu
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            className="text-sm" style={{ color:'rgba(255,255,255,0.75)',maxWidth:480,margin:'0 auto' }}>
            Authentic authentic recipes cooked fresh every day with love & traditional spices
          </motion.p>
        </div>
        <div style={{ height:'36px',background:'#FFF8EC',clipPath:'ellipse(100% 100% at 50% 100%)' }}/>
      </div>

      {/* Filters */}
      <div id="filters" className="scroll-mt-20 py-5 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#D4731A' }}/>
              <input type="text" placeholder="Search dishes..." value={search} onChange={e=>setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none"
                style={{ background:'white',border:'1.5px solid rgba(196,150,10,0.4)',color:'#2C1A00',fontFamily:"'Hind',sans-serif" }}/>
            </div>
            {/* Diet Filter */}
            <div className="flex gap-2">
              {['All','Veg','Non-Veg'].map(f=>(
                <button key={f} onClick={()=>setDiet(f)}
                  className="px-4 py-2 text-xs font-bold rounded-lg transition-all"
                  style={{
                    background: diet===f ? (f==='Veg'?'#1B4332':f==='Non-Veg'?'#C0392B':'#D4731A') : 'white',
                    color: diet===f ? 'white' : '#2C1A00',
                    border:`1.5px solid ${f==='Veg'?'#1B4332':f==='Non-Veg'?'#C0392B':'#D4731A'}`,
                    fontFamily:"'Baloo 2',sans-serif",
                  }}>
                  {f==='Veg'?'🥦 ':f==='Non-Veg'?'🍗 ':''}{f}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 rounded-xl overflow-hidden p-1"
            style={{ background:'#1B4332' }}>
            {tabs.map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className="px-4 py-2 text-sm font-bold rounded-lg transition-all"
                style={{
                  background: activeTab===t ? '#D4731A' : 'transparent',
                  color: activeTab===t ? 'white' : 'rgba(255,255,255,0.85)',
                  fontFamily:"'Baloo 2',sans-serif",
                }}>
                {t==='All'?'🍽️ ':t==='Tiffins'?'🫓 ':t==='Chinese'?'🥡 ':t==='Biryani'?'🍛 ':t==='Curries'?'🫕 ':'🍚 '}{t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <AnimatePresence>
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(item=>(
                <motion.div key={item.id} layout
                  initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.95}}
                  transition={{duration:0.35}}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ border:'1.5px solid rgba(196,150,10,0.25)', boxShadow:'0 2px 10px rgba(92,45,14,0.07)' }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow='0 8px 24px rgba(212,115,26,0.18)'}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow='0 2px 10px rgba(92,45,14,0.07)'}>

                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {item.special && <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background:'#D4731A',color:'white' }}>⭐ SPECIAL</span>}
                      {item.best    && <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background:'#C0392B',color:'white' }}>🔥 POPULAR</span>}
                    </div>
                    {/* Veg/Non-Veg */}
                    <div className="absolute top-2 right-2 w-5 h-5 rounded flex items-center justify-center" style={{ background:'white',border:`2px solid ${item.type==='Veg'?'#1B4332':'#C0392B'}` }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background:item.type==='Veg'?'#1B4332':'#C0392B' }}/>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h3 className="text-sm font-bold leading-tight flex-1"
                        style={{ fontFamily:"'Baloo 2',sans-serif",color:'#2C1A00' }}>{item.name}</h3>
                      <span className="font-bold text-base whitespace-nowrap"
                        style={{ color:'#1B4332',fontFamily:"'Baloo 2',sans-serif" }}>₹{item.price}</span>
                    </div>
                    <p className="text-xs mb-4 flex-grow leading-relaxed" style={{ color:'#6B4423' }}>{item.desc}</p>
                    <button onClick={()=>addItem(item)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all"
                      style={{ background:'#1B4332',color:'white',fontFamily:"'Baloo 2',sans-serif" }}
                      onMouseEnter={e=>e.currentTarget.style.background='#D4731A'}
                      onMouseLeave={e=>e.currentTarget.style.background='#1B4332'}>
                      <ShoppingCart size={13}/> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-24">
              <p className="text-5xl mb-3">🍽️</p>
              <h3 style={{ fontFamily:"'Baloo 2',sans-serif",color:'#1B4332',fontSize:'1.3rem',fontWeight:800 }}>No dishes found</h3>
              <p className="text-sm mt-1" style={{ color:'#6B4423' }}>Try searching something else!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Menu;