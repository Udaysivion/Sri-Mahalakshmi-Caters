import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { Star, ChevronRight, Phone } from 'lucide-react';

/* ─── Animations ─── */
const fadeUp = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:'easeOut'}} };
const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.12}} };

/* ─── Warm Section Header ─── */
const Header = ({ pre, title, sub }) => {
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.2 });
  return (
    <motion.div ref={r} initial="hidden" animate={inView?'visible':'hidden'} variants={fadeUp} className="text-center mb-8">
      {pre && <p className="text-sm font-bold mb-1" style={{ color:'#D4731A', letterSpacing:'0.1em' }}>— {pre} —</p>}
      <h2 style={{ fontFamily:"'Baloo 2',sans-serif", color:'#1B4332', fontSize:'2rem', fontWeight:800, lineHeight:1.2 }}>{title}</h2>
      {/* saffron divider */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-1">
        <div style={{ height:'2px', width:'50px', background:'linear-gradient(to right,transparent,#D4731A)' }}/>
        <span style={{ fontSize:'1.1rem' }}>🌿</span>
        <div style={{ height:'2px', width:'50px', background:'linear-gradient(to left,transparent,#D4731A)' }}/>
      </div>
      {sub && <p className="text-sm mt-1" style={{ color:'#6B4423', fontFamily:"'Hind',sans-serif" }}>{sub}</p>}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   1. HERO — warm, village, photo backdrop
══════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* BG image */}
    <motion.div
      initial={{ scale:1.06 }} animate={{ scale:1 }} transition={{ duration:7, ease:'easeOut' }}
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage:"url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000')" }}
    />
    {/* warm dark overlay */}
    <div className="absolute inset-0 z-10"
      style={{ background:'linear-gradient(160deg,rgba(45,30,5,0.82) 0%,rgba(45,60,20,0.72) 50%,rgba(45,30,5,0.82) 100%)' }} />

    {/* Content */}
    <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-16">

      {/* Restaurant badge */}
      <motion.div initial={{opacity:0,y:-15}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.8}} className="mb-5">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
          style={{ background:'rgba(45,30,5,0.7)', border:'1.5px solid rgba(212,115,26,0.55)' }}>
          <span style={{ fontSize:'1.3rem' }}>🪔</span>
          <div className="text-left">
            <p style={{ color:'#E0B030', fontSize:'0.75rem', fontWeight:700, fontFamily:"'Baloo 2',sans-serif", letterSpacing:'0.08em' }}>Sri Mahalakshmi</p>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.52rem', letterSpacing:'0.18em' }}>KITCHEN &amp; CATERERS</p>
          </div>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.9}}
        style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:'clamp(2.4rem,6vw,4.2rem)', fontWeight:900, color:'white', lineHeight:1.15, textShadow:'2px 3px 10px rgba(0,0,0,0.6)', marginBottom:'0.5rem' }}>
        Taste the Authenticity.<br/>
        <span style={{ color:'#E0B030' }}>Feel the Tradition.</span>
      </motion.h1>

      {/* Tags */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5,duration:0.8}}
        className="flex flex-wrap items-center justify-center gap-3 my-5 text-sm" style={{ color:'rgba(255,255,255,0.85)' }}>
        {['Restaurant Dining','Bulk Orders','Event Catering'].map((t,i)=>(
          <span key={i} className="flex items-center gap-1.5">
            <Star size={11} fill="#E0B030" color="#E0B030" /> {t}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.7,duration:0.8}}
        className="flex flex-wrap justify-center gap-3">
        <Link to="/menu"
          className="flex items-center gap-2 px-7 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90 active:scale-95"
          style={{ background:'#D4731A', color:'white', fontFamily:"'Baloo 2',sans-serif", boxShadow:'0 4px 15px rgba(212,115,26,0.5)', fontSize:'0.95rem' }}>
          🍽️ Explore Our Menu
        </Link>
        <Link to="/contact"
          className="flex items-center gap-2 px-7 py-3 rounded-lg font-bold text-sm transition-all hover:bg-white/15"
          style={{ border:'2px solid rgba(255,255,255,0.6)', color:'white', fontFamily:"'Baloo 2',sans-serif", fontSize:'0.95rem' }}>
          🎉 Book Catering
        </Link>
      </motion.div>

      {/* Quick info */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
        className="mt-7 flex flex-wrap justify-center gap-5 text-xs" style={{ color:'rgba(255,255,255,0.65)' }}>
        <span>📍 Warangal, Telangana</span>
        <span>⏰ 11 AM – 11 PM (All Days)</span>
        <span>📞 +91 98765 43210</span>
      </motion.div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-20 z-20"
      style={{ background:'linear-gradient(to top,#FFF8EC,transparent)' }} />
  </section>
);

/* ══════════════════════════════════════════════
   2. HIGHLIGHT BAR
══════════════════════════════════════════════ */
const HighlightBar = () => {
  const [r,inView] = useInView({triggerOnce:true,threshold:0.1});
  const items = [
    {icon:'🍲',label:'Traditional',sub:'Recipes'},
    {icon:'🔥',label:'Authentic',sub:'Cooking'},
    {icon:'🌿',label:'Fresh',sub:'Ingredients'},
    {icon:'👨‍👩‍👧‍👦',label:'Family',sub:'Dining'},
    {icon:'🎉',label:'Catering',sub:'Events & Parties'},
  ];
  return (
    <section style={{ background:'#1B4332' }} className="py-4 relative">
      <div style={{ position:'absolute',top:0,left:0,right:0,height:'3px', background:'linear-gradient(to right,transparent,#D4731A,#E0B030,#D4731A,transparent)' }}/>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div ref={r} variants={stagger} initial="hidden" animate={inView?'visible':'hidden'}
          className="flex flex-wrap justify-center md:justify-between items-center gap-5">
          {items.map((h,i)=>(
            <motion.div key={i} variants={fadeUp} className="bar-item">
              <span className="text-3xl float" style={{ animationDelay:`${i*0.4}s` }}>{h.icon}</span>
              <span className="text-xs font-bold text-white" style={{ fontFamily:"'Baloo 2',sans-serif" }}>{h.label}</span>
              <span className="text-xs" style={{ color:'#E0B030', opacity:0.9 }}>{h.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'2px', background:'linear-gradient(to right,transparent,rgba(212,115,26,0.5),transparent)' }}/>
    </section>
  );
};

/* ══════════════════════════════════════════════
   3. FROM OUR VILLAGE KITCHEN
══════════════════════════════════════════════ */
const dishes = [
  { name:'Veg Biryani',     price:120, img:'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=400', veg:true },
  { name:'Egg Biryani',     price:140, img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', veg:false },
  { name:'Chicken Curry',   price:100, img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400', veg:false },
  { name:'Chicken Fry',     price:100, img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400', veg:false },
  { name:'Paneer Masala',   price:200, img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400', veg:true },
  { name:'Gongura Chicken', price:200, img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400', veg:false },
];

const SignatureDishes = () => {
  const [r,inView] = useInView({triggerOnce:true,threshold:0.1});
  return (
    <section className="py-14" style={{ background:'#FFF8EC' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="warm-divider"/>
        <Header pre="From Our" title="Signature Dishes 🍛" sub="Taste our most loved traditional dishes"/>
        <motion.div ref={r} variants={stagger} initial="hidden" animate={inView?'visible':'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {dishes.map((d,i)=>(
            <motion.div key={i} variants={fadeUp} className="group flex flex-col items-center">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-2 transition-all duration-300"
                style={{ border:'2px solid rgba(196,150,10,0.3)', boxShadow:'0 2px 10px rgba(92,45,14,0.08)' }}>
                <img src={d.img} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                {/* Veg/Non-Veg badge */}
                <div className="absolute top-1.5 left-1.5">
                  {d.veg
                    ? <div className="veg-box bg-white"/>
                    : <div className="nonveg-box bg-white"/>}
                </div>
              </div>
              <p className="text-sm font-bold text-center" style={{ fontFamily:"'Baloo 2',sans-serif", color:'#2C1A00' }}>{d.name}</p>
              <p className="price-bold">₹{d.price}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="warm-divider"/>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   4. MENU PREVIEW — Tab-based, bold prices
══════════════════════════════════════════════ */
const menuData = {
  'Tiffins': [
    {n:'Idly',p:'50/-'},{n:'Sambar Idly',p:'50/-'},{n:'Ghee Karam Idly',p:'50/-'},
    {n:'Mysore Bonda',p:'50/-'},{n:'Wada',p:'50/-'},{n:'Sambar Wada',p:'50/-'},
    {n:'Puri',p:'50/-'},{n:'Onion Bonda',p:'50/-'},{n:'Plain Dosa',p:'40/-'},
    {n:'Onion Dosa',p:'50/-'},{n:'Masala Dosa',p:'60/-'},{n:'Ghee Karam Dosa',p:'60/-'},
    {n:'Egg Dosa',p:'60/-'},{n:'Double Egg Dosa',p:'70/-'},{n:'Plane Karam Dosa',p:'40/-'},
  ],
  'Chinese': [
    {n:'Veg Fried Rice',p:'80/-'},{n:'Paneer Fried Rice',p:'120/-'},
    {n:'Egg Fried Rice',p:'90(S) 100(F)'},{n:'Double Veg Fried Rice',p:'110/-'},
    {n:'Schezwan Veg Rice',p:'100/-'},{n:'Schezwan Egg Rice',p:'100/-'},
    {n:'Schezwan Chicken Rice',p:'120/-'},{n:'Chicken Fried Rice',p:'110/-'},
    {n:'Double Egg Chicken Rice',p:'120/-'},{n:'Double Chicken Rice',p:'140/-'},
  ],
  'Noodles': [
    {n:'Veg Noodles',p:'80/-'},{n:'Egg Noodles',p:'90/-'},{n:'Double Egg Noodles',p:'100/-'},
    {n:'Paneer Noodles',p:'100/-'},{n:'Chicken Noodles',p:'110/-'},
    {n:'Double Egg Chicken Noodles',p:'140/-'},{n:'Schezwan Veg Noodles',p:'100/-'},
    {n:'Schezwan Egg Noodles',p:'120/-'},{n:'Schezwan Chicken Noodles',p:'120/-'},
    {n:'Veg Manchuria',p:'140/-'},{n:'Egg Manchuria',p:'120/-'},
    {n:'Paneer Manchuria',p:'140/-'},{n:'Chicken Manchuria',p:'160/-'},
    {n:'Chilli Chicken',p:'180/-'},{n:'Chicken 65',p:'180/-'},
    {n:'Chicken Afghani',p:'190/-'},{n:'Chicken Pakoda',p:'200/-'},
    {n:'Chicken 555',p:'200/-'},{n:'Jeera Rice',p:'90/-'},
    {n:'Tomato Rice',p:'80/-'},{n:'Curd Rice',p:'100/-'},{n:'Lemon Rice',p:'90/-'},
  ],
  'Rice & Meals': [
    {n:'Pudhina Rice',p:'90/-'},{n:'Sambar Rice',p:'90/-'},{n:'Ghee Kaju Rice',p:'160/-'},
    {n:'──── Biryani ────',p:'',sub:true},
    {n:'Veg Biryani',p:'120/-'},{n:'Egg Biryani',p:'140/-(2pc)'},{n:'Paneer Biryani',p:'130/-'},
    {n:'Mixed Veg Biryani',p:'120/-'},{n:'Chicken Dum Biryani',p:'140/-'},
    {n:'Chicken Fry Piece Biryani',p:'160/-'},{n:'Chicken 65 Biryani',p:'190/-'},
    {n:'──── Curries ────',p:'',sub:true},
    {n:'Dal Fry',p:'80/-'},{n:'Dal Tadka',p:'90/-'},{n:'Mixed Veg',p:'135/-'},
    {n:'Paneer Butter Masala',p:'200/-'},{n:'Kaju Masala',p:'200/-'},
    {n:'Chicken Curry',p:'100/-'},{n:'Chicken Fry',p:'100/-'},
    {n:'Butter Chicken',p:'160/-'},{n:'Gongura Chicken',p:'200/-'},{n:'Kaju Chicken',p:'180/-'},
    {n:'──── Meals ────',p:'',sub:true},
    {n:'Veg Meals',p:'140/-'},{n:'Curd Rice',p:'100/-'},
  ],
};

const MenuPreview = () => {
  const [tab, setTab] = useState('Tiffins');
  const tabs = ['Tiffins','Chinese','Noodles','Rice & Meals'];
  return (
    <section className="py-12" style={{ background:'#FFF8EC' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Outer frame — saffron border */}
        <div className="rounded-2xl overflow-hidden" style={{ border:'2.5px solid #D4731A', boxShadow:'0 6px 28px rgba(212,115,26,0.12)' }}>

          {/* Header */}
          <div className="text-center py-5 px-4" style={{ background:'#FFF8EC' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <div style={{ height:'2px',width:'45px',background:'linear-gradient(to right,transparent,#D4731A)' }}/>
              <span style={{ color:'#D4731A',fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.12em' }}>✦ OUR MENU ✦</span>
              <div style={{ height:'2px',width:'45px',background:'linear-gradient(to left,transparent,#D4731A)' }}/>
            </div>
            <h2 style={{ fontFamily:"'Baloo 2',sans-serif",fontSize:'1.6rem',color:'#1B4332',fontWeight:800 }}>
              A wide range of delicious authentic dishes
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap" style={{ background:'#1B4332' }}>
            {tabs.map(t=>(
              <button key={t} onClick={()=>setTab(t)}
                className="px-5 py-2.5 text-sm font-bold transition-all"
                style={{
                  fontFamily:"'Baloo 2',sans-serif",
                  background: tab===t ? '#D4731A' : 'transparent',
                  color: tab===t ? 'white' : 'rgba(255,255,255,0.85)',
                  borderRight:'1px solid rgba(255,255,255,0.1)',
                }}>
                {t}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="px-5 py-5" style={{ background:'#FFF8EC' }}>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-8">
              {menuData[tab]?.map((item,i)=>{
                if(item.sub) return (
                  <div key={i} className="break-inside-avoid pt-2 pb-1">
                    <p className="text-xs font-bold" style={{ color:'#1B4332',borderBottom:'1.5px solid rgba(212,115,26,0.35)',paddingBottom:'3px',letterSpacing:'0.06em',fontFamily:"'Baloo 2',sans-serif" }}>
                      {item.n}
                    </p>
                  </div>
                );
                return (
                  <div key={i} className="menu-row break-inside-avoid">
                    <span style={{ color:'#2C1A00',fontFamily:"'Hind',sans-serif" }}>{item.n}</span>
                    <span style={{ color:'#1B4332',fontWeight:800,fontFamily:"'Baloo 2',sans-serif",whiteSpace:'nowrap',fontSize:'0.9rem' }}>₹{item.p}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-5">
              <Link to="/menu" className="btn-leaf">
                View Full Menu <ChevronRight size={15}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   5. TASTE OF ROOTS
══════════════════════════════════════════════ */
const TasteOfRoots = () => {
  const [r,inView] = useInView({triggerOnce:true,threshold:0.2});
  return (
    <section className="py-12" style={{ background:'#F5EBCF' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 rounded-2xl overflow-hidden"
          style={{ border:'2px solid rgba(212,115,26,0.25)', boxShadow:'0 4px 16px rgba(92,45,14,0.06)' }}>
          <div className="w-full md:w-1/2 h-64 md:h-72 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800"
              alt="Village Kitchen" className="w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background:'rgba(45,30,5,0.25)' }}/>
          </div>
          <motion.div ref={r} initial="hidden" animate={inView?'visible':'hidden'} variants={fadeUp}
            className="w-full md:w-1/2 px-6 py-8 md:py-0">
            <h3 style={{ fontFamily:"'Baloo 2',sans-serif",fontSize:'1.6rem',color:'#1B4332',fontWeight:800,marginBottom:'0.75rem' }}>
              A Taste of Our Roots 🌾
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color:'#6B4423',fontFamily:"'Hind',sans-serif" }}>
              We bring the warmth of authentic cooking to every plate. Our recipes are inspired by traditional kitchens, familiar spices and the simple joy of eating together.
            </p>
            <Link to="/about" className="inline-flex items-center gap-1 font-bold text-sm" style={{ color:'#D4731A',fontFamily:"'Baloo 2',sans-serif" }}>
              Our Story <ChevronRight size={15}/>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   5b. CATERING SERVICES
══════════════════════════════════════════════ */
const CateringServices = () => {
  const [r,inView] = useInView({triggerOnce:true,threshold:0.2});
  return (
    <section className="py-14" style={{ background:'#1B4332' }}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div ref={r} initial="hidden" animate={inView?'visible':'hidden'} variants={fadeUp}>
          <h2 style={{ fontFamily:"'Baloo 2',sans-serif",color:'white',fontSize:'2rem',fontWeight:800 }}>
            Make Your Events Special 🎉
          </h2>
          <div className="flex justify-center gap-2 mt-2 mb-4">
            <div style={{ height:'2px',width:'40px',background:'linear-gradient(to right,transparent,#D4731A)' }}/>
            <span style={{ color:'#D4731A',fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.12em' }}>CATERING & BULK ORDERS</span>
            <div style={{ height:'2px',width:'40px',background:'linear-gradient(to left,transparent,#D4731A)' }}/>
          </div>
          <p className="text-sm mx-auto mb-8" style={{ color:'rgba(255,255,255,0.8)',fontFamily:"'Hind',sans-serif",maxWidth:'600px' }}>
            From intimate family gatherings to grand weddings, we provide authentic authentic catering that your guests will remember. We handle bulk orders with the same love and hygiene as our restaurant kitchen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              {title:'Weddings & Receptions',icon:'💍'},
              {title:'Corporate Events',icon:'🏢'},
              {title:'Birthday Parties',icon:'🎂'}
            ].map((c,i)=>(
              <div key={i} className="p-5 rounded-xl transition-all hover:translate-y-[-4px]"
                style={{ background:'rgba(255,248,236,0.1)',border:'1.5px solid rgba(224,176,48,0.3)' }}>
                <div className="text-3xl mb-2">{c.icon}</div>
                <h4 className="text-white font-bold text-sm" style={{ fontFamily:"'Baloo 2',sans-serif" }}>{c.title}</h4>
              </div>
            ))}
          </div>

          <Link to="/contact" className="btn-saffron">
            📞 Contact for Catering
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   6. GALLERY PREVIEW
══════════════════════════════════════════════ */
const galleryImgs = [
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=600',
];

const Gallery = () => {
  const [r,inView] = useInView({triggerOnce:true,threshold:0.1});
  return (
    <section className="py-12" style={{ background:'#FFF8EC' }}>
      <div className="max-w-6xl mx-auto px-4">
        <Header title="Our Gallery 📸" sub="Moments from our restaurant"/>
        <motion.div ref={r} variants={stagger} initial="hidden" animate={inView?'visible':'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImgs.map((src,i)=>(
            <motion.div key={i} variants={fadeUp} className="relative aspect-video overflow-hidden rounded-xl group"
              style={{ border:'2px solid rgba(196,150,10,0.25)' }}>
              <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background:'rgba(45,30,5,0.5)' }}>
                <span style={{ fontSize:'1.8rem' }}>🍽️</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-6">
          <Link to="/gallery" className="btn-leaf">View Full Gallery <ChevronRight size={15}/></Link>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   7. CONTACT FOOTER STRIP
══════════════════════════════════════════════ */
const ContactStrip = () => (
  <section style={{ background:'#1B4332' }} className="py-10 relative">
    <div style={{ position:'absolute',top:0,left:0,right:0,height:'4px', background:'linear-gradient(to right,#D4731A,#C4960A,#E0B030,#C4960A,#D4731A)' }}/>
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left */}
        <div>
          <h3 style={{ fontFamily:"'Baloo 2',sans-serif",color:'white',fontSize:'1.35rem',fontWeight:800,marginBottom:'1rem' }}>
            🏡 Dine-in & Catering Services
          </h3>
          <div className="flex flex-col gap-2 text-sm mb-4" style={{ color:'rgba(255,255,255,0.85)' }}>
            <span>📍 Warangal, Telangana</span>
            <a href="tel:+919876543210" className="hover:text-white font-semibold" style={{ color:'#E0B030' }}>📞 +91 98765 43210</a>
            <div className="flex flex-wrap gap-4 mt-1">
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold" style={{ color:'#E0B030' }}>
                💬 Chat on WhatsApp
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold" style={{ color:'#E0B030' }}>
                📱 Chat on WhatsApp
              </a>
            </div>
          </div>
          <Link to="/contact" className="btn-saffron">📍 Get Directions</Link>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl p-4" style={{ background:'rgba(212,115,26,0.12)',border:'1.5px solid rgba(224,176,48,0.3)' }}>
            <h4 style={{ color:'#E0B030',fontFamily:"'Baloo 2',sans-serif",fontWeight:700,marginBottom:'0.4rem' }}>
              ⏰ Opening Hours
            </h4>
            <p className="text-white font-bold text-base">11:00 AM – 11:00 PM</p>
            <p className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,0.55)' }}>All Days (Monday to Sunday)</p>
            <div className="flex gap-3 mt-3">
              {['📘','📷','▶️'].map((icon,i)=>(
                <a key={i} href="#" className="text-xl hover:scale-110 transition-transform inline-block">{icon}</a>
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ height:'120px',border:'1.5px solid rgba(224,176,48,0.25)' }}>
            <iframe title="Location" width="100%" height="120" style={{ border:0 }} loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30407.9!2d79.5774!3d17.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3342fc5af82f59%3A0x7c848d7d7e83e8e7!2sWarangal%2C%20Telangana!5e0!3m2!1sen!2sin!4v1"
              allowFullScreen=""/>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   MAIN HOME
══════════════════════════════════════════════ */
const Home = () => (
  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <Helmet>
      <title>Sri Mahalakshmi Kitchen & Caterers | Authentic authentic style</title>
      <meta name="description" content="Authentic authentic style Indian food in Warangal — Biryani, Tiffins, Curries and more. Homely taste, honest prices." />
    </Helmet>
    <Hero />
    <HighlightBar />
    <SignatureDishes />
    <MenuPreview />
    <TasteOfRoots />
    <CateringServices />
    <Gallery />
    <ContactStrip />
  </motion.div>
);

export default Home;
