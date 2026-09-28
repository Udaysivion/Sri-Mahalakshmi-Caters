import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Phone, UtensilsCrossed, ArrowRight, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

/* ─── Animations ─── */
const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.8,ease:[0.16,1,0.3,1]}} };
const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.15}} };
const fadeIn = { hidden:{opacity:0}, visible:{opacity:1,transition:{duration:1}} };

/* ─── Elegant Section Header ─── */
const SectionHeader = ({ eyebrow, title, sub }) => {
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.2 });
  return (
    <motion.div ref={r} initial="hidden" animate={inView?'visible':'hidden'} variants={fadeUp} className="text-center mb-16">
      {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-[#D4731A]">{eyebrow}</p>}
      <h2 style={{ fontFamily:"'Playfair Display',serif", color:'#1B4332', fontSize:'2.5rem', fontWeight:600, lineHeight:1.2, letterSpacing:'-0.02em' }}>{title}</h2>
      <div className="flex items-center justify-center gap-4 mt-6 mb-4">
        <div style={{ height:'1px', width:'60px', background:'linear-gradient(to right,transparent,rgba(212,115,26,0.3))' }}/>
        <span style={{ fontSize:'1rem', color:'#D4731A' }}>❖</span>
        <div style={{ height:'1px', width:'60px', background:'linear-gradient(to left,transparent,rgba(212,115,26,0.3))' }}/>
      </div>
      {sub && <p className="text-[15px] mt-4 max-w-lg mx-auto" style={{ color:'#6B4423', fontFamily:"'Inter',sans-serif", lineHeight:1.6 }}>{sub}</p>}
    </motion.div>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1B4332]">
    {/* Cinematic Zoom Background */}
    <motion.div
      initial={{ scale:1.1 }} animate={{ scale:1 }} transition={{ duration:2, ease:'easeOut' }}
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage:"url('https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=2000')" }} // Deep, rich traditional food imagery
    />
    
    {/* Elegant Gradient Overlay - Deep Forest Green to Black */}
    <div className="absolute inset-0 z-10" style={{ background:'linear-gradient(to right, rgba(13,34,25,0.92) 0%, rgba(27,67,50,0.65) 50%, rgba(13,34,25,0.92) 100%)' }} />
    <div className="absolute inset-0 z-10" style={{ background:'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />

    {/* Content Container */}
    <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8 mt-20 flex flex-col md:flex-row items-center justify-between">
      
      {/* Left side text content */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-start text-left max-w-2xl">
        
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-[#E0B030]"></div>
          <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#E0B030]">
            Authentic South Indian Cuisine
          </p>
        </motion.div>
        
        <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight drop-shadow-lg"
          style={{ fontFamily:"'Playfair Display',serif" }}>
          Taste the <br/>
          <span className="italic font-light text-[#FFF8EC]">Authenticity.</span>
        </motion.h1>
        
        <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed max-w-xl border-l-2 border-[#D4731A] pl-5"
          style={{ fontFamily:"'Inter',sans-serif" }}>
          Traditional flavours, freshly prepared with generations of care. Experience true culinary heritage for everyday dining and unforgettable grand celebrations.
        </motion.p>
        
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-5">
          <Link to="/menu" className="group flex items-center justify-center gap-3 bg-[#D4731A] text-white px-9 py-4 rounded-sm font-semibold text-sm tracking-wider uppercase transition-all hover:bg-[#B05D10] shadow-[0_4px_20px_rgba(212,115,26,0.3)] hover:shadow-[0_4px_25px_rgba(212,115,26,0.5)]">
            Explore Menu <UtensilsCrossed size={16} className="transition-transform group-hover:scale-110" />
          </Link>
          <Link to="/catering" className="group flex items-center justify-center gap-3 bg-transparent text-white px-9 py-4 rounded-sm font-semibold text-sm tracking-wider uppercase transition-all border border-white/40 hover:border-white hover:bg-white/10 backdrop-blur-sm">
            Plan Catering <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 mt-16 text-[12px] font-semibold tracking-widest uppercase text-white/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#E0B030] bg-[#E0B030]/10 text-[#E0B030]"><Star size={10} fill="currentColor"/></div>
            <span>Heritage Recipes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#E0B030] bg-[#E0B030]/10 text-[#E0B030]"><Star size={10} fill="currentColor"/></div>
            <span>Premium Catering</span>
          </div>
        </motion.div>
      </motion.div>

    </div>
  </section>
);

/* ══════════════════════════════════════════════
   2. OUR SIGNATURES
══════════════════════════════════════════════ */
const SignatureDishes = () => {
  const { addToCart } = useCart();
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.1 });

  const signatures = [
    { id:'s1', name:'Masala Dosa', desc:'Crisp • Traditional • Fresh', price:60, type:'Veg', img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600' },
    { id:'s2', name:'Chicken Dum Biryani', desc:'Slow-cooked • Aromatic', price:140, type:'Non-Veg', img:'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600' },
    { id:'s3', name:'Paneer Butter Masala', desc:'Rich • Creamy • Authentic', price:200, type:'Veg', img:'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <section className="py-24 bg-[#FFF8EC]" ref={r}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader eyebrow="OUR SIGNATURES" title="Flavours That Keep You Coming Back" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatures.map((dish, i) => (
            <motion.div key={dish.id} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*0.1+0.2,duration:0.6}}
              className="group bg-white rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 relative"
              style={{ border:'1px solid rgba(27,67,50,0.08)', boxShadow:'0 10px 40px rgba(27,67,50,0.03)' }}>
              
              <div className="relative h-64 overflow-hidden">
                <img src={dish.img} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-1 rounded-sm shadow-sm">
                  <div className={`w-3 h-3 rounded-full border ${dish.type==='Veg'?'border-green-600':'border-red-600'} flex items-center justify-center`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${dish.type==='Veg'?'bg-green-600':'bg-red-600'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-2 text-[#1B4332]" style={{ fontFamily:"'Playfair Display',serif" }}>{dish.name}</h3>
                <p className="text-sm text-[#6B4423] mb-6 font-medium tracking-wide">{dish.desc}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-[#D4731A]">₹{dish.price}</span>
                  <button onClick={() => addToCart(dish)} className="text-sm font-bold uppercase tracking-wider text-[#1B4332] flex items-center gap-2 group-hover:text-[#D4731A] transition-colors">
                    + Add
                  </button>
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
   3. MENU CATEGORY SHOWCASE
══════════════════════════════════════════════ */
const Categories = () => {
  const cats = [
    { name:'Tiffins', img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800' },
    { name:'Biryani', img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800' },
    { name:'Chinese', img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
    { name:'Curries', img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((c, i) => (
            <Link to="/menu" key={c.name} className="group relative h-80 overflow-hidden block">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-[#1B4332]/30 to-transparent transition-opacity duration-300"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-medium text-white mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>{c.name}</h3>
                <span className="text-xs uppercase tracking-widest text-[#E0B030] font-semibold flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore <ArrowRight size={14}/>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   4. BRAND STORY
══════════════════════════════════════════════ */
const BrandStory = () => {
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.2 });
  return (
    <section className="py-28 bg-[#FFF8EC] overflow-hidden" ref={r}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div initial={{opacity:0,x:-40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:1, ease: 'easeOut'}} className="w-full lg:w-1/2 relative">
            <div className="relative z-10 w-4/5">
              <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1000" alt="Authentic Food" className="w-full h-[500px] object-cover rounded-sm shadow-xl" />
            </div>
            <div className="absolute top-1/4 right-0 w-2/3 z-20 border-4 border-[#FFF8EC] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800" alt="Kitchen Prep" className="w-full h-[350px] object-cover rounded-sm" />
            </div>
            <div className="absolute -bottom-10 -left-6 z-30 w-48 h-48 bg-[#1B4332] p-8 hidden md:flex flex-col justify-center rounded-sm shadow-lg border border-[#E0B030]/20">
              <p className="text-[#E0B030] font-bold text-4xl mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>2010</p>
              <div className="w-8 h-[1px] bg-[#E0B030] mb-2"></div>
              <p className="text-white text-[10px] uppercase tracking-widest leading-relaxed">The year our culinary journey began.</p>
            </div>
          </motion.div>
          
          <motion.div initial={{opacity:0,x:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:1, ease: 'easeOut'}} className="w-full lg:w-1/2 lg:pl-12 mt-16 lg:mt-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[1px] bg-[#D4731A]"></div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4731A]">OUR PHILOSOPHY</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1B4332] mb-8 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
              Rooted in Tradition.<br/><span className="text-[#6B4423] italic font-light">Crafted for Every Feast.</span>
            </h2>
            <div className="space-y-6 text-[#6B4423] leading-relaxed text-[15px] font-medium border-l border-[#D4731A]/30 pl-5">
              <p>
                At Sri Mahalakshmi, cooking isn't just a process; it's a deeply ingrained tradition. We believe that true flavour cannot be rushed. It requires patience, freshly ground spices, and recipes passed down through generations.
              </p>
              <p>
                Whether you are joining us for a simple everyday meal in our dining room, or trusting us to cater a grand wedding for thousands, our commitment remains exactly the same: honest, authentic, and unforgettable food.
              </p>
            </div>
            <Link to="/about" className="group inline-flex items-center gap-2 mt-10 border-b border-[#1B4332] pb-1 text-[#1B4332] font-bold text-xs uppercase tracking-widest hover:text-[#D4731A] hover:border-[#D4731A] transition-colors">
              Discover Our Full Story <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   5. CATERING SECTION & PROCESS
══════════════════════════════════════════════ */
const CateringSection = () => {
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.1 });
  const services = [
    { title: 'Weddings & Receptions', img:'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800' },
    { title: 'Corporate Events', img:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
    { title: 'Birthday Celebrations', img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800' },
    { title: 'Intimate Gatherings', img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section className="py-24 bg-[#1B4332] text-white overflow-hidden" ref={r}>
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-[#E0B030]">PREMIUM CATERING</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:600, lineHeight:1.2, letterSpacing:'-0.02em' }}>
            From Family Gatherings<br/>to Grand Celebrations
          </h2>
          <p className="text-[15px] mt-6 max-w-xl mx-auto text-white/80 leading-relaxed font-light">
            We bring authentic flavours and thoughtful hospitality to celebrations of every size.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((s,i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*0.1}} className="group relative h-[400px] overflow-hidden rounded-sm">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                <h3 className="text-xl font-medium" style={{ fontFamily:"'Playfair Display',serif" }}>{s.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="border-t border-white/10 pt-16">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-12 text-[#E0B030]">HOW IT WORKS</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-12 right-12 h-[1px] bg-white/20"></div>
            {[
              { num:'01', title:'Tell Us About Your Event' },
              { num:'02', title:'Choose Your Menu' },
              { num:'03', title:'We Prepare With Care' },
              { num:'04', title:'We Serve Your Guests' }
            ].map((step,i) => (
              <div key={i} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-[#1B4332] border border-[#E0B030] text-[#E0B030] flex items-center justify-center mx-auto mb-6 text-lg font-bold" style={{ fontFamily:"'Playfair Display',serif" }}>
                  {step.num}
                </div>
                <h4 className="text-sm font-semibold tracking-wide">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link to="/contact" className="inline-block bg-[#D4731A] text-white px-10 py-4 rounded-sm font-semibold text-sm tracking-wider uppercase transition-all hover:bg-[#B05D10]">
            Plan Your Catering
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   6. TRUST & TESTIMONIALS
══════════════════════════════════════════════ */
const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-center">
          {[
            { num:'1000+', label:'Guests Served' },
            { num:'50+', label:'Events Catered' },
            { num:'40+', label:'Signature Dishes' },
            { num:'14', label:'Years of Tradition' },
          ].map((stat,i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>{stat.num}</p>
              <p className="text-xs uppercase tracking-widest text-[#6B4423] font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        <SectionHeader eyebrow="TESTIMONIALS" title="Loved Around the Table" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text:"The catering for our daughter's wedding was flawless. Authentic taste and incredible service.", author:"Priya S.", context:"Wedding Catering" },
            { text:"The best Biryani in town, hands down. We order every weekend and it's always perfect.", author:"Rahul M.", context:"Restaurant Dining" },
            { text:"Professional, punctual, and the food was a massive hit at our corporate gathering.", author:"Anil K.", context:"Corporate Event" },
          ].map((r,i) => (
            <div key={i} className="p-10 bg-[#FFF8EC] border border-[#1B4332]/5 text-center">
              <div className="flex justify-center gap-1 mb-6 text-[#D4731A]">
                {[...Array(5)].map((_,idx)=><Star key={idx} size={16} fill="currentColor"/>)}
              </div>
              <p className="text-[17px] text-[#2C1A00] italic mb-8 leading-relaxed" style={{ fontFamily:"'Playfair Display',serif" }}>"{r.text}"</p>
              <p className="text-sm font-bold text-[#1B4332] uppercase tracking-wide mb-1">{r.author}</p>
              <p className="text-[12px] text-[#6B4423]">{r.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   7. FINAL CTA
══════════════════════════════════════════════ */
const FinalCTA = () => (
  <section className="relative py-32 flex items-center justify-center overflow-hidden bg-[#1B4332]">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
        Planning a Celebration?<br/>Let Us Handle the Feast.
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/contact" className="bg-[#D4731A] text-white px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all hover:bg-[#B05D10]">
          Book Catering
        </Link>
        <a href="https://wa.me/919876543210" className="bg-white text-[#1B4332] px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all hover:bg-gray-100">
          WhatsApp Us
        </a>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF8EC]">
      <Helmet>
        <title>Sri Mahalakshmi Kitchen & Caterers | Premium Authentic Dining</title>
        <meta name="description" content="Authentic Indian restaurant and premium catering services. Traditional flavours for everyday dining and grand celebrations." />
      </Helmet>
      
      <Hero />
      <SignatureDishes />
      <Categories />
      <BrandStory />
      <CateringSection />
      <Testimonials />
      <FinalCTA />
      
    </div>
  );
};

export default Home;
