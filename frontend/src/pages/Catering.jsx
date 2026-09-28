import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle2, Users, Calendar, ChefHat } from 'lucide-react';

/* ─── Animations ─── */
const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.8,ease:[0.16,1,0.3,1]}} };
const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.15}} };

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

const Catering = () => {
  return (
    <div className="min-h-screen bg-[#FFF8EC]">
      <Helmet>
        <title>Premium Catering | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Professional Indian catering services for weddings, corporate events, and intimate gatherings. Custom menus and premium hospitality." />
      </Helmet>

      {/* HERO */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#1B4332]">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-[#E0B030] font-bold uppercase tracking-[0.3em] text-[11px] mb-6">
            Sri Mahalakshmi Catering
          </motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.1}} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
            WE CATER.<br/><span className="italic font-light">YOU CELEBRATE.</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.2}} className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
            From intimate family gatherings to grand weddings, we bring authentic flavours, immaculate presentation, and thoughtful hospitality to your most important days.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.3}}>
            <Link to="/contact" className="inline-block bg-[#D4731A] text-white px-10 py-4 rounded-sm font-semibold text-sm tracking-wider uppercase transition-all hover:bg-[#B05D10]">
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader eyebrow="EVENT TYPES" title="Celebrations of Every Scale" sub="We tailor our menus and service style to perfectly match the tone and scale of your event." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title:'Weddings & Grand Events', desc:'Elaborate multi-course traditional feasts for up to 2000+ guests. Complete with live counters and elegant buffet setups.', img:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800' },
              { title:'Corporate Gatherings', desc:'Professional, punctual catering for office parties, board meetings, and corporate retreats. Sophisticated presentation.', img:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
              { title:'Intimate Functions', desc:'Birthdays, housewarmings, and family reunions. Warm, homely service that makes your guests feel like family.', img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800' }
            ].map((ev,i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-80 overflow-hidden mb-6 rounded-sm">
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="text-2xl font-medium text-[#1B4332] mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>{ev.title}</h3>
                <p className="text-[#6B4423] text-sm leading-relaxed">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPACITY & SERVICES */}
      <section className="py-24 bg-[#FFF8EC] border-y border-[#1B4332]/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#1B4332]/10">
                <Users className="text-[#D4731A]" size={28} />
              </div>
              <h4 className="text-xl font-bold text-[#1B4332] mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Guest Capacity</h4>
              <p className="text-[#6B4423] text-sm">We comfortably cater to gatherings ranging from 50 to 2,000+ guests without compromising quality.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#1B4332]/10">
                <ChefHat className="text-[#D4731A]" size={28} />
              </div>
              <h4 className="text-xl font-bold text-[#1B4332] mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Custom Menus</h4>
              <p className="text-[#6B4423] text-sm">Every event is unique. Our executive chefs work with you to design a menu perfectly suited to your guests' palates.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#1B4332]/10">
                <Calendar className="text-[#D4731A]" size={28} />
              </div>
              <h4 className="text-xl font-bold text-[#1B4332] mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Flawless Execution</h4>
              <p className="text-[#6B4423] text-sm">From timely delivery to elegant buffet setup and courteous service staff, we handle the entire dining experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader eyebrow="MENU DESIGN" title="Curated Catering Packages" sub="While we specialize in custom menus, we offer structured tiers as a starting point for your event planning." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Standard Package */}
            <div className="p-10 border border-[#1B4332]/10 bg-[#FFF8EC] relative overflow-hidden group hover:border-[#D4731A]/30 transition-colors">
              <h3 className="text-3xl font-medium text-[#1B4332] mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>The Classic Feast</h3>
              <p className="text-[#6B4423] text-sm mb-8">Perfect for birthdays and intimate functions.</p>
              
              <ul className="space-y-4 mb-10">
                {['1 Welcome Drink', '2 Vegetarian Starters', '1 Non-Vegetarian Starter', '2 Main Course Curries (1 Veg, 1 Non-Veg)', 'Flavoured Rice / Biryani', 'Assorted Breads', '1 Traditional Dessert'].map((item,i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#2C1A00] font-medium">
                    <CheckCircle2 size={16} className="text-[#D4731A]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Package */}
            <div className="p-10 border border-[#D4731A]/50 bg-[#1B4332] text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest bg-[#D4731A] px-3 py-1 rounded-sm">Most Popular</div>
              <h3 className="text-3xl font-medium text-white mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>The Grand Pandal</h3>
              <p className="text-white/70 text-sm mb-8">Designed for weddings and major corporate events.</p>
              
              <ul className="space-y-4 mb-10">
                {['3 Premium Welcome Drinks', '4 Starters (Live Counters Available)', '4 Main Course Curries (2 Veg, 2 Non-Veg)', 'Signature Dum Biryani & Pulao', 'Artisan Breads & Rotis', 'Salad Bar & Accompaniments', '3 Desserts (Including Live Counters)'].map((item,i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-white/90 font-medium">
                    <CheckCircle2 size={16} className="text-[#E0B030]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu" className="inline-flex items-center gap-2 text-[#1B4332] font-semibold text-sm uppercase tracking-wider hover:text-[#D4731A] transition-colors border-b border-transparent hover:border-[#D4731A] pb-1">
              View Our Full Restaurant Menu for Inspiration <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden bg-[#0D2219]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-[#E0B030]">READY TO PLAN?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
            Secure Your Date
          </h2>
          <p className="text-white/80 mb-10 font-light">Our catering calendar fills up quickly during wedding season. Contact us early to ensure availability for your special day.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-[#D4731A] text-white px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all hover:bg-[#B05D10]">
              Request a Quote
            </Link>
            <a href="https://wa.me/919876543210" className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all hover:border-white hover:bg-white/5">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Catering;
