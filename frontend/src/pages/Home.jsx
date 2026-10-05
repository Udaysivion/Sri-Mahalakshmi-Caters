import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import { Star, ArrowRight, CheckCircle2, Users, Utensils, Award, Leaf, Truck, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenuData } from '../hooks/useMenuData';
import LogoLoader from '../components/common/LogoLoader';

// Animations
const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} };
const stagger = { visible:{transition:{staggerChildren:0.1}} };

/* ══════════════════════════════════════════════
   1. HERO SECTION (Full-Width Background)
══════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative h-[100dvh] flex flex-col md:flex-row items-end md:items-center pb-8 md:pt-24 md:pb-16 overflow-hidden">
    {/* ── MOBILE BACKGROUND: custom food image, desktop: hero-bg ── */}
    <div className="absolute inset-0 z-0 bg-black">
      {/* Desktop background */}
      <img src="/hero-bg.png" alt="Sri Mahalakshmi Feast" className="hidden md:block w-full h-full object-cover object-center" />
      {/* Mobile background - new food image */}
      <img src="/mobile-hero.png" alt="Sri Mahalakshmi Feast" className="block md:hidden w-full h-full object-cover object-top" />
      {/* Desktop gradient */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent w-2/3 h-full"></div>
      {/* Mobile gradient - dark at bottom for text readability */}
      <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent h-full"></div>
    </div>

    {/* ── ORDER NOW — Hero Right Side Floating Button (Desktop only) ── */}
    <motion.a
      href="/menu"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 group"
      aria-label="Order Now"
    >
      {/* Outer pulsing ring */}
      <span className="absolute w-24 h-24 rounded-full animate-ping opacity-20"
        style={{ background: 'radial-gradient(circle, #DCA145, transparent)', animationDuration: '2s' }}/>
      {/* Circle button */}
      <motion.div
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="w-20 h-20 rounded-full flex flex-col items-center justify-center relative cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #DCA145 0%, #8B4513 100%)',
          boxShadow: '0 0 0 3px rgba(220,161,69,0.3), 0 8px 32px rgba(220,161,69,0.5)',
        }}
      >
        <Utensils size={24} color="white" strokeWidth={2}/>
        <span className="text-white text-[9px] font-black uppercase tracking-widest mt-1">Order</span>
        <span className="text-white text-[9px] font-black uppercase tracking-widest leading-none">Now</span>
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/80"/>
      </motion.div>
      {/* Hover label */}
      <span className="text-[#DCA145] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
        View Full Menu →
      </span>
    </motion.a>

    <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-20 mt-auto md:mt-10 px-4 md:px-8">
      
      {/* ── MOBILE SPECIFIC CONTENT ── */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="w-full flex flex-col md:hidden">
        
        {/* Floating banners positioned over the image */}
        <div className="relative w-full h-[55vh] pointer-events-none">
          {/* Top-left banner */}
          <motion.div variants={fadeUp} className="absolute top-6 left-0 bg-black/55 backdrop-blur-sm border-r-[3px] border-[#DCA145] px-4 py-2">
            <p className="text-[#DCA145] text-[12px] font-bold tracking-widest leading-snug text-left" style={{ fontFamily:"'Playfair Display',serif" }}>
              UNFORGETTABLE<br/>WEDDINGS
            </p>
          </motion.div>

          {/* Bottom-right banner */}
          <motion.div variants={fadeUp} className="absolute bottom-4 right-0 bg-black/55 backdrop-blur-sm border-l-[3px] border-[#DCA145] px-4 py-2 text-right">
            <p className="text-[#DCA145] text-[12px] font-bold tracking-widest leading-snug" style={{ fontFamily:"'Playfair Display',serif" }}>
              PRIVATE<br/>CELEBRATIONS &<br/>HOME CATERING
            </p>
          </motion.div>
        </div>

        {/* Bottom logo + buttons */}
        <div className="flex flex-col items-center text-center w-full pt-6 pb-4">
          <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl text-[#DCA145] mb-1 font-normal tracking-wide" style={{ fontFamily:"'Playfair Display',serif" }}>
            SRI MAHALAKSHMI
          </motion.h1>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-8 bg-[#DCA145]/40"></div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300">KITCHEN & CATERERS</p>
            <div className="h-[1px] w-8 bg-[#DCA145]/40"></div>
          </motion.div>

          {/* Attractive Quote */}
          <motion.p variants={fadeUp} className="text-gray-300 text-[13px] leading-relaxed mb-6 px-2 font-light italic">
            "From intimate home gatherings to grand wedding feasts — we bring authentic South Indian flavours to every celebration."
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 w-full max-w-sm">
            <Link to="/menu" className="flex-1 bg-transparent border border-[#DCA145] text-[#DCA145] px-2 py-3 rounded-xl font-bold text-sm transition-all flex justify-center items-center text-center shadow-[0_0_15px_rgba(220,161,69,0.1)]">
              Explore Menu
            </Link>
            <Link to="/catering" className="flex-1 bg-gradient-to-r from-[#DCA145] to-[#B05D10] text-black px-2 py-3 border border-[#DCA145] rounded-xl font-bold text-sm transition-all flex justify-center items-center text-center shadow-[0_0_15px_rgba(220,161,69,0.3)]">
              Request Quote
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ── DESKTOP LEFT CONTENT ── */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="hidden md:block w-full md:w-[55%] text-left">
        
        {/* Top Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-8 border border-[#DCA145]/40 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full">
          <span className="text-[#DCA145] text-[10px]">★</span>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/90">AUTHENTIC INDIAN CUISINE & CATERING</p>
        </motion.div>
        
        {/* Main Titles */}
        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-[1.1] tracking-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
          Timeless Flavours,
        </motion.h1>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-medium italic text-[#DCA145] mb-8 leading-[1.1]" style={{ fontFamily:"'Playfair Display',serif" }}>
          Together Always
        </motion.h1>
        
        {/* Paragraph */}
        <motion.p variants={fadeUp} className="text-gray-300 text-[15px] md:text-[17px] leading-relaxed mb-10 max-w-lg font-light">
          From time-honoured heritage recipes to warm Indian hospitality, Sri Mahalakshmi brings authentic culinary perfection to your table and unforgettable celebrations.
        </motion.p>
        
        {/* Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-5 mb-14">
          <Link to="/menu" className="w-full sm:w-auto bg-[#DCA145] hover:bg-[#c99036] text-black px-8 py-3.5 rounded-full font-bold text-[11px] tracking-widest uppercase transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(220,161,69,0.3)]">
            Explore Menu <ArrowRight size={14}/>
          </Link>
          <Link to="/catering" className="w-full sm:w-auto bg-transparent border border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-bold text-[11px] tracking-widest uppercase transition-all flex justify-center items-center">
            Plan Your Event
          </Link>
        </motion.div>

        {/* Bottom Left Stats */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="flex text-[#DCA145]">
              {'★★★★★'.split('').map((star, i) => <span key={i} className="text-sm">{star}</span>)}
            </div>
            <span><strong className="text-white font-medium">4.8/5</strong> (1,200+ Reviews)</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#DCA145]">❖</span>
            <span>10+ Years of Culinary Excellence</span>
          </div>
        </motion.div>

      </motion.div>

      {/* ── DESKTOP RIGHT (Empty to maintain layout if needed, or just removed) ── */}
      <div className="hidden md:flex w-full md:w-[45%] justify-end"></div>

    </div>
  </section>
);

/* ══════════════════════════════════════════════
   2. FEATURES BANNER (White)
══════════════════════════════════════════════ */
const Features = () => (
  <section className="bg-white py-12 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between gap-8 md:gap-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#FFF8EC] flex items-center justify-center text-[#D4731A]"><Leaf size={18}/></div>
        <p className="font-bold text-[#112A1F] text-xs uppercase tracking-wide">Authentic Recipes</p>
        <p className="text-[10px] text-gray-500">Passed down through generations</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#FFF8EC] flex items-center justify-center text-[#D4731A]"><ShieldCheck size={18}/></div>
        <p className="font-bold text-[#112A1F] text-xs uppercase tracking-wide">100% Quality</p>
        <p className="text-[10px] text-gray-500">Fresh ingredients daily</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#FFF8EC] flex items-center justify-center text-[#D4731A]"><Truck size={18}/></div>
        <p className="font-bold text-[#112A1F] text-xs uppercase tracking-wide">Fast Delivery</p>
        <p className="text-[10px] text-gray-500">Hot and fresh to your door</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#FFF8EC] flex items-center justify-center text-[#D4731A]"><CheckCircle2 size={18}/></div>
        <p className="font-bold text-[#112A1F] text-xs uppercase tracking-wide">Easy Booking</p>
        <p className="text-[10px] text-gray-500">Hassle-free event catering</p>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   3. MENU HIGHLIGHTS (Cream)
══════════════════════════════════════════════ */
const MenuSection = () => {
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.1 });
  const [activeTab, setActiveTab] = useState('All');
  const { addToCart, setIsCartOpen } = useCart();
  
  const { menuItems: allMenuItems, loading } = useMenuData();

  const activeMenuItems = allMenuItems.filter(item => item.available !== false);

  const filteredItems = activeTab === 'All'
    ? activeMenuItems
    : activeMenuItems.filter(item => {
        const cat = (item.cat || item.category || '').toLowerCase();
        return cat.includes(activeTab.toLowerCase());
      });

  const menuItems = filteredItems.slice(0, 4);

  const handleAdd = (item) => {
    addToCart(item);
    setIsCartOpen(true);
  };

  return (
    <section className="py-24 bg-[#FFF8EC]" ref={r}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <motion.div initial="hidden" animate={inView?'visible':'hidden'} variants={stagger}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-2">Discover Our Menu</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#112A1F]" style={{ fontFamily:"'Playfair Display',serif" }}>A Taste of Our Menu</h2>
          </motion.div>
          <Link to="/menu" className="bg-[#112A1F] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1E4A35] transition-all">
            View All Menu <ArrowRight size={14} className="inline ml-1"/>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-6 hide-scrollbar">
          {['All','Tiffins','Chinese','Biryani','Curries','Rice'].map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${activeTab===tab ? 'bg-[#112A1F] text-white border-[#112A1F]' : 'bg-white text-[#112A1F] border-gray-200 hover:border-[#112A1F]'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        {loading ? (
          <LogoLoader 
            size="md" 
            message="Preparing Our Popular Delicacies..." 
            subtext="Fresh from Sri Mahalakshmi Kitchen" 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map(item => (
              <motion.div whileHover={{ y: -5 }} key={item.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 group hover:shadow-xl transition-all cursor-pointer">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-[#1B4332]/5 flex items-center justify-center">
                  {item.img ? (
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.parentElement.querySelector('.home-dish-placeholder');
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : null}
                  <div 
                    className="home-dish-placeholder flex-col items-center justify-center text-[#1B4332]/40 gap-1.5 p-4 text-center"
                    style={{ display: item.img ? 'none' : 'flex' }}
                  >
                    <Utensils size={28} strokeWidth={1.5} />
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#1B4332]/60">{item.name}</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold text-[#D4731A] shadow-sm tracking-wider">NEW</div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="font-bold text-[#112A1F] text-lg mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{item.desc}</p>
                  <div className="flex justify-between items-end border-t border-gray-50 pt-3">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Price</span>
                      <span className="font-bold text-[#112A1F] text-lg">₹{item.price}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleAdd(item); }} className="px-4 py-1.5 rounded-full border border-gray-200 text-[#112A1F] text-xs font-bold hover:bg-[#112A1F] hover:text-white transition-colors flex items-center gap-1">
                      Add <span className="text-lg leading-none mb-0.5">+</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   4. EXPERIENCES (Expanding Hover Cards)
══════════════════════════════════════════════ */
const Experiences = () => {
  const [r, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const cards = [
    { title: "Authentic Dining Ambience", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", desc: "Experience our warm hospitality and freshly prepared meals in a comfortable setting.", link: "BOOK A TABLE", linkSmall: "Book" },
    { title: "Dine-In", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800", desc: "Comfortable ambience for a perfect everyday meal with loved ones.", link: "BOOK A TABLE", linkSmall: "Book" },
    { title: "Family Celebrations", img: "https://images.unsplash.com/photo-1530103862676-de8892bf30d9?auto=format&fit=crop&q=80&w=800", desc: "Birthdays, anniversaries & special moments catered with perfection.", link: "PLAN EVENT", linkSmall: "Explore" },
    { title: "Weddings", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", desc: "Grand traditional menus for your once-in-a-lifetime celebration.", link: "INQUIRE NOW", linkSmall: "Inquire" }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]" ref={r}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-2">Our Spaces</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#112A1F]" style={{ fontFamily:"'Playfair Display',serif" }}>Unforgettable Experiences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div 
              key={i} 
              initial={{opacity:0, y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6, delay:i*0.1}}
              className="group relative h-[420px] rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 cursor-pointer"
            >
              {/* IMAGE (Expands on hover) */}
              <div className="absolute top-0 left-0 w-full h-[200px] group-hover:h-full transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                {/* Dark overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* FLOATING BADGE (Moves and changes color on hover) */}
              <div className="absolute left-6 top-[180px] group-hover:top-6 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-30">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 bg-[#F4F4F4] text-[#112A1F] group-hover:bg-[#D4731A] group-hover:text-white border border-white/50 group-hover:border-transparent">
                  <Utensils size={16} />
                </div>
              </div>

              {/* UNHOVERED CONTENT (Fades out and moves down) */}
              <div className="absolute top-[200px] inset-x-0 bottom-0 bg-white p-6 pt-12 flex flex-col justify-between transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-8 z-20">
                <div>
                  <h3 className="font-bold text-[#112A1F] text-xl mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
                <div className="flex justify-end items-center text-[#112A1F] text-sm font-bold gap-2">
                  {card.linkSmall} <ArrowRight size={16} />
                </div>
              </div>

              {/* HOVERED CONTENT (Fades in from bottom) */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-8 group-hover:translate-y-0 z-30 pointer-events-none group-hover:pointer-events-auto">
                <h3 className="font-bold text-white text-2xl mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>{card.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{card.desc}</p>
                <div className="text-white text-[11px] font-bold uppercase tracking-widest inline-block border-b-2 border-[#D4731A] pb-1 w-fit">
                  {card.link}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   5. OUR STORY (Cream Background)
══════════════════════════════════════════════ */
const Story = () => {
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.2 });
  return (
    <section className="py-24 bg-[#FFF8EC]" ref={r}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        <motion.div initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.8}} className="w-full md:w-1/2">
          <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-square">
            <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1000" alt="Tradition" className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 bg-[#112A1F]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4731A] rounded-full flex items-center justify-center text-white"><Award size={20}/></div>
              <div>
                <p className="text-white font-bold text-sm">10+ Years</p>
                <p className="text-gray-300 text-[10px] uppercase tracking-widest">Of Culinary Excellence</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div initial={{opacity:0,x:30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.8}} className="w-full md:w-1/2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-4">OUR STORY</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#112A1F] mb-6 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
            A Legacy of Taste<br/>and Tradition
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            At Sri Mahalakshmi, cooking isn't just a process; it's a deeply ingrained tradition. We believe that true flavour cannot be rushed. It requires patience, freshly ground spices, and recipes passed down through generations.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            We are committed to delivering the most authentic South Indian culinary experience, whether you are joining us for a simple everyday meal or trusting us to cater a grand wedding.
          </p>
          <Link to="/about" className="bg-[#112A1F] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1E4A35] transition-all inline-block mb-10">
            Read More
          </Link>
          
          <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
            <p className="font-bold text-[#D4731A] italic font-serif text-lg">"Food that brings people together"</p>
            <Heart size={24} className="text-[#D4731A] opacity-50"/>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   5. DINING & CATERING OPTIONS (White)
══════════════════════════════════════════════ */
const Options = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-2">SERVICES</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#112A1F]" style={{ fontFamily:"'Playfair Display',serif" }}>More Than Just a Meal</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Large Card */}
        <div className="w-full lg:w-5/12 relative rounded-2xl overflow-hidden group h-[400px]">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" alt="Dining" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
            <div className="w-10 h-10 bg-[#D4731A] rounded-full flex items-center justify-center text-white mb-4"><Utensils size={18}/></div>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>Authentic Dining Ambience</h3>
            <p className="text-gray-300 text-sm mb-6">Experience our warm hospitality and freshly prepared meals in a comfortable setting.</p>
            <Link to="/contact" className="text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-1 inline-block self-start">Book a Table</Link>
          </div>
        </div>
        
        {/* Small Cards */}
        <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title:'Dine-In', desc:'Comfortable ambience for a perfect everyday meal with loved ones.', img:'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400', linkText: 'Book', linkTo: '/contact' },
            { title:'Family Celebrations', desc:'Birthdays, anniversaries & special moments catered with perfection.', img:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400', linkText: 'Explore', linkTo: '/catering' },
            { title:'Weddings', desc:'Grand traditional menus for your once-in-a-lifetime celebration.', img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400', linkText: 'Inquire', linkTo: '/catering' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all flex flex-col overflow-hidden pb-5">
              <div className="p-4 pb-0 relative">
                <img src={item.img} alt={item.title} className="w-full h-36 object-cover rounded-xl" />
                <div className="absolute -bottom-4 left-6 w-8 h-8 bg-[#F5F2ED] rounded-full flex items-center justify-center text-[#112A1F] border-2 border-white shadow-sm z-10">
                  <Utensils size={14} />
                </div>
              </div>
              <div className="px-6 pt-8 flex flex-col flex-grow">
                <h3 className="font-bold text-[#112A1F] text-lg mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>{item.title}</h3>
                <p className="text-[13px] text-gray-500 mb-6 flex-grow leading-relaxed">{item.desc}</p>
                <div className="flex justify-end">
                  <Link to={item.linkTo} className="text-[#112A1F] text-sm font-semibold flex items-center gap-1 hover:text-[#D4731A] transition-colors">
                    {item.linkText} <ArrowRight size={16}/>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   6. CATERING PROCESS (Cream)
══════════════════════════════════════════════ */
const CateringProcess = () => (
  <section className="py-24 bg-[#FFF8EC]">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
      <div className="w-full md:w-1/2">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000" alt="Catering Buffet" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-4">CATERING & EVENT PLANNING</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#112A1F] mb-6 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
          Delicious Food for Your Special Occasions
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-10">
          Make your event unforgettable with our premium catering services. From intimate family gatherings to grand weddings, we handle it all with precision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#112A1F] text-white flex items-center justify-center font-bold text-xs mb-4">1</div>
            <h4 className="font-bold text-[#112A1F] mb-2 text-sm">Discuss Details</h4>
            <p className="text-xs text-gray-500">Tell us about your event size and preferences.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#112A1F] text-white flex items-center justify-center font-bold text-xs mb-4">2</div>
            <h4 className="font-bold text-[#112A1F] mb-2 text-sm">Custom Menu</h4>
            <p className="text-xs text-gray-500">We craft a personalized menu for you.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#112A1F] text-white flex items-center justify-center font-bold text-xs mb-4">3</div>
            <h4 className="font-bold text-[#112A1F] mb-2 text-sm">Enjoy Event</h4>
            <p className="text-xs text-gray-500">Leave the cooking and service to our experts.</p>
          </div>
        </div>
        
        <Link to="/catering" className="bg-[#112A1F] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1E4A35] transition-all inline-block">
          Book Catering
        </Link>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   7. HOW IT WORKS (Dark Green)
══════════════════════════════════════════════ */
const HowItWorks = () => (
  <section className="bg-[#153424] py-20 border-t border-[#1E4A35]">
    <div className="max-w-5xl mx-auto px-4 flex flex-col items-center relative z-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4731A] mb-16">HOW IT WORKS</p>
      
      {/* Timeline Flow */}
      <div className="relative w-full mb-16">
        {/* Connecting Line */}
        <div className="absolute top-8 left-[12%] right-[12%] h-[1px] bg-[#D4731A]/30 z-0 hidden md:block"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full text-center relative z-10">
          {[
            { num: '01', text: 'Tell Us About Your Event' },
            { num: '02', text: 'Choose Your Menu' },
            { num: '03', text: 'We Prepare With Care' },
            { num: '04', text: 'We Serve Your Guests' }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 rounded-full border border-[#D4731A] bg-[#153424] flex items-center justify-center text-[#D4731A] text-sm font-bold mb-6 transition-all duration-300 group-hover:bg-[#D4731A] group-hover:text-white" style={{ fontFamily:"'Playfair Display',serif" }}>
                {step.num}
              </div>
              <p className="text-white text-sm font-medium">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Link to="/contact" className="bg-[#D4731A] hover:bg-[#B05D10] text-white px-10 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(212,115,26,0.3)] hover:shadow-[0_6px_20px_rgba(212,115,26,0.4)]">
        Plan Your Catering
      </Link>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   8. TESTIMONIALS (White)
══════════════════════════════════════════════ */
const Testimonials = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-2">WHAT OUR GUESTS SAY</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#112A1F]" style={{ fontFamily:"'Playfair Display',serif" }}>Loved by Families. Trusted for Events.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name:'Arjun', role:'Dined in', text:'"The food is absolutely authentic and delicious. The biryani is a must-try. Amazing hospitality!"' },
          { name:'Kavya', role:'Event Host', text:'"We booked them for our housewarming. The catering was flawless and everyone loved the food."' },
          { name:'Rahul', role:'Corporate Client', text:'"Professional service and great taste. They managed our office party of 200 people perfectly."' }
        ].map((t,i) => (
          <div key={i} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex text-[#D4731A] mb-4"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
            <p className="text-sm text-gray-600 mb-6 italic">{t.text}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-[#112A1F]">{t.name[0]}</div>
              <div>
                <p className="font-bold text-[#112A1F] text-sm">{t.name}</p>
                <p className="text-[10px] text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   9. GALLERY (Cream)
══════════════════════════════════════════════ */
const GalleryPreview = () => (
  <section className="py-24 bg-[#FFF8EC]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4731A] mb-2">OUR GALLERY</p>
          <h2 className="text-4xl font-bold text-[#112A1F]" style={{ fontFamily:"'Playfair Display',serif" }}>Moments from Our Restaurant</h2>
        </div>
        <Link to="/gallery" className="text-[#112A1F] text-xs font-bold uppercase tracking-widest border-b border-[#112A1F] pb-1">
          View Full Gallery <ArrowRight size={14} className="inline ml-1"/>
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {[
          'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400',
          'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400',
          'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
          'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400'
        ].map((src, i) => (
          <img key={i} src={src} alt="Gallery" className="h-48 w-64 object-cover rounded-xl shadow-sm flex-shrink-0" />
        ))}
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   10. BOTTOM BANNER (White / Dark Green)
══════════════════════════════════════════════ */
const BottomBanner = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
      {/* Contact Info Card */}
      <div className="w-full md:w-1/3 bg-[#FFF8EC] border border-gray-200 rounded-2xl p-8">
        <h3 className="font-bold text-[#112A1F] text-xl mb-6" style={{ fontFamily:"'Playfair Display',serif" }}>Sri Mahalakshmi</h3>
        <p className="text-sm text-gray-600 mb-4">HC5R+7R2, Bahadurpally<br/>Hyderabad, Telangana 500043</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Phone:</strong> +91 77948 00042</p>
        <p className="text-sm text-gray-600 mb-6"><strong>Website:</strong> <a href="https://smahalakshmikitchen.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4731A] transition-colors">smahalakshmikitchen.com</a></p>
        <a href="https://www.google.com/maps/dir//SRI+MAHALAKSHMI+KITCHEN+%26+CATERERS,+HC5R%2B7R2,+Bahadurpally,+Hyderabad,+Telangana+500043/@17.4343544,78.3955979,2663m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3bcb8f0050329baf:0x8f493cc97407ac3!2m2!1d78.4419977!2d17.5581314?entry=ttu" target="_blank" rel="noopener noreferrer" className="w-full bg-white border border-gray-300 text-[#112A1F] px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex justify-center hover:bg-gray-50 transition-colors">
          Get Directions
        </a>
      </div>

      {/* CTA Card */}
      <div className="w-full md:w-2/3 bg-[#112A1F] rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 opacity-10"><Leaf size={150}/></div>
        <div className="relative z-10">
          <div className="w-10 h-10 bg-[#1E4A35] rounded-full flex items-center justify-center text-white mb-6"><Utensils size={18}/></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>Good Food. Great Company.</h2>
          <p className="text-gray-300 text-sm max-w-md mb-8">Join us for a delicious meal or let us make your next event truly special with our professional catering services.</p>
          <div className="flex gap-4">
            <Link to="/menu" className="bg-[#D4731A] hover:bg-[#B05D10] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all">Order Now</Link>
            <Link to="/contact" className="bg-[#1E4A35] hover:bg-[#163828] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-[#2A6347]">Book a Table</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="w-full min-h-screen">
      <Helmet>
        <title>Home | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Authentic South Indian Cuisine & Premium Catering Services." />
      </Helmet>
      
      <Hero />
      <Features />
      <MenuSection />
      <Story />
      <Options />
      <CateringProcess />
      <HowItWorks />
      <Testimonials />
      <GalleryPreview />
      <BottomBanner />
    </div>
  );
};

export default Home;
