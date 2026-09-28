import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Flame, Leaf, HeartHandshake, UtensilsCrossed } from 'lucide-react';

/* ─── Animations ─── */
const fadeUp = { hidden:{opacity:0,y:25}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:'easeOut'}} };
const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.15}} };

/* ══════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════ */
const AboutHero = () => (
  <div className="relative pt-16 overflow-hidden" style={{ background:'#1B4332' }}>
    <div style={{ position:'absolute',top:0,left:0,right:0,height:'4px', background:'linear-gradient(to right,#D4731A,#C4960A,#E0B030,#C4960A,#D4731A)' }}/>
    
    <div className="absolute inset-0 opacity-20 bg-cover bg-center"
      style={{ backgroundImage:"url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000')" }} />
    <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom,rgba(27,50,10,0.92),rgba(45,90,30,0.95))' }} />

    <div className="relative z-10 text-center py-16 px-4">
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
        className="flex items-center justify-center gap-2 mb-2">
        <span style={{ height:'1px', width:'30px', background:'#E0B030' }}/>
        <span className="text-sm font-bold uppercase tracking-widest" style={{ color:'#E0B030', fontFamily:"'Baloo 2',sans-serif" }}>
          Our Story
        </span>
        <span style={{ height:'1px', width:'30px', background:'#E0B030' }}/>
      </motion.div>
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
        style={{ fontFamily:"'Baloo 2',sans-serif" }}>
        Rooted in Tradition.<br/>
        <span style={{ color:'#E0B030' }}>Crafted for the Feast.</span>
      </motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
        className="text-sm mx-auto" style={{ color:'rgba(255,255,255,0.8)', maxWidth:'550px', fontFamily:"'Hind',sans-serif" }}>
        From a humble local kitchen to hosting grand celebrations, our journey is built on one simple belief: food should feel like home.
      </motion.p>
    </div>
    <div style={{ height:'36px',background:'#FFF8EC',clipPath:'ellipse(100% 100% at 50% 100%)' }}/>
  </div>
);

/* ══════════════════════════════════════════════
   2. TWO WORLDS (Restaurant + Catering)
══════════════════════════════════════════════ */
const TwoWorlds = () => {
  const [r, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <section className="py-16" style={{ background:'#FFF8EC' }}>
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 style={{ fontFamily:"'Baloo 2',sans-serif",color:'#1B4332',fontSize:'2rem',fontWeight:800 }}>
            One Kitchen, Two Experiences
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2 mb-4">
            <div style={{ height:'2px',width:'40px',background:'linear-gradient(to right,transparent,#D4731A)' }}/>
            <span style={{ fontSize:'1.2rem' }}>🌿</span>
            <div style={{ height:'2px',width:'40px',background:'linear-gradient(to left,transparent,#D4731A)' }}/>
          </div>
        </div>

        <motion.div ref={r} variants={stagger} initial="hidden" animate={inView?'visible':'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Restaurant */}
          <motion.div variants={fadeUp} className="group relative rounded-2xl overflow-hidden p-8 flex flex-col items-center text-center transition-all duration-300"
            style={{ background:'white', border:'2px solid rgba(196,150,10,0.25)', boxShadow:'0 4px 20px rgba(92,45,14,0.06)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
              style={{ background:'#F5EBCF', color:'#1B4332' }}>
              <UtensilsCrossed size={28}/>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily:"'Baloo 2',sans-serif", color:'#2C1A00' }}>
              The Daily Hearth
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color:'#6B4423', fontFamily:"'Hind',sans-serif" }}>
              Our restaurant is your everyday dining home. Whether you're craving a crispy morning dosa or a comforting bowl of chicken curry after work, we serve honest, piping hot meals that soothe the soul. No frills, just pure taste.
            </p>
            <div className="mt-auto">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold"
                style={{ background:'rgba(27,67,50,0.1)', color:'#1B4332' }}>Dine-in & Takeaway</span>
            </div>
          </motion.div>

          {/* Card 2: Catering */}
          <motion.div variants={fadeUp} className="group relative rounded-2xl overflow-hidden p-8 flex flex-col items-center text-center transition-all duration-300"
            style={{ background:'#1B4332', border:'2px solid rgba(212,115,26,0.4)', boxShadow:'0 4px 20px rgba(27,67,50,0.2)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
              style={{ background:'rgba(212,115,26,0.2)', color:'#E0B030', border:'1px solid rgba(212,115,26,0.5)' }}>
              <span style={{ fontSize:'1.8rem' }}>🎉</span>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily:"'Baloo 2',sans-serif", color:'white' }}>
              The Grand Pandal
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color:'rgba(255,255,255,0.85)', fontFamily:"'Hind',sans-serif" }}>
              When it's time to celebrate, our kitchen scales up without losing its heart. From intimate family gatherings of 50 to grand weddings of 1000+, our catering team brings the authentic feast directly to your venue.
            </p>
            <div className="mt-auto">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold"
                style={{ background:'rgba(212,115,26,0.2)', color:'#E0B030', border:'1px solid rgba(224,176,48,0.3)' }}>Bulk Orders & Events</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   3. THE RECIPE OF OUR SUCCESS (TIMELINE)
══════════════════════════════════════════════ */
const Timeline = () => {
  const [r, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const steps = [
    { icon:<Leaf size={20}/>, title:"Handpicked Spices", desc:"We don't buy powders. We buy whole spices from local farmers and grind them in-house to retain the essential oils and aroma." },
    { icon:<Flame size={20}/>, title:"Wood-Fired Love", desc:"The secret to our Biryani and curries? Slow cooking. We let the meat and vegetables simmer patiently until they melt in your mouth." },
    { icon:<HeartHandshake size={20}/>, title:"Served with Respect", desc:"In our tradition, a guest is equivalent to God (Atithi Devo Bhava). Our staff is trained to serve you with absolute humility and joy." },
  ];

  return (
    <section className="py-16 relative" style={{ background:'#F5EBCF' }}>
      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage:'radial-gradient(#D4731A 1px, transparent 1px)', backgroundSize:'20px 20px' }}/>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-center mb-12" style={{ fontFamily:"'Baloo 2',sans-serif",color:'#2C1A00',fontSize:'1.8rem',fontWeight:800 }}>
          How We Create Magic Everyday ✨
        </h2>

        <div className="space-y-8" ref={r}>
          {steps.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration: 0.6, delay: i*0.2 }}
              className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl"
              style={{ background:'white', border:'1px solid rgba(196,150,10,0.2)', boxShadow:'0 4px 15px rgba(92,45,14,0.05)' }}>
              
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background:'#D4731A', color:'white', boxShadow:'0 4px 10px rgba(212,115,26,0.3)' }}>
                {step.icon}
              </div>
              
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-bold mb-1" style={{ fontFamily:"'Baloo 2',sans-serif", color:'#1B4332' }}>
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color:'#6B4423', fontFamily:"'Hind',sans-serif" }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   4. PHOTO STRIP / COLLAGE
══════════════════════════════════════════════ */
const PhotoStrip = () => {
  return (
    <section className="py-12 overflow-hidden" style={{ background:'#FFF8EC' }}>
      <div className="flex gap-4 px-4 overflow-x-auto snap-x pb-4">
        {[
          'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=600'
        ].map((src, i) => (
          <div key={i} className="min-w-[250px] sm:min-w-[300px] aspect-[4/3] rounded-xl overflow-hidden snap-center flex-shrink-0"
            style={{ border:'2px solid rgba(196,150,10,0.3)' }}>
            <img src={src} alt="Kitchen moment" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"/>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   5. CALL TO ACTION
══════════════════════════════════════════════ */
const AboutCTA = () => (
  <section className="py-16 text-center px-4" style={{ background:'#FFF8EC' }}>
    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily:"'Baloo 2',sans-serif", color:'#2C1A00' }}>
      Ready to taste the tradition?
    </h2>
    <p className="text-sm mb-8" style={{ color:'#6B4423', fontFamily:"'Hind',sans-serif" }}>
      Drop by our restaurant today, or let us bring the feast to your next event.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <Link to="/menu" className="btn-leaf">
        🍽️ View Our Menu
      </Link>
      <Link to="/contact" className="btn-saffron">
        🎉 Book Catering
      </Link>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ background:'#FFF8EC', minHeight:'100vh' }}>
      <Helmet>
        <title>Our Story | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Discover the legacy of our authentic authentic restaurant and our grand catering services." />
      </Helmet>

      <AboutHero />
      <TwoWorlds />
      <Timeline />
      <PhotoStrip />
      <AboutCTA />
      
    </motion.div>
  );
};

export default About;