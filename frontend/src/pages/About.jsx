import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.8,ease:[0.16,1,0.3,1]}} };
const fadeLeft = { hidden:{opacity:0,x:-40}, visible:{opacity:1,x:0,transition:{duration:1,ease:[0.16,1,0.3,1]}} };
const fadeRight = { hidden:{opacity:0,x:40}, visible:{opacity:1,x:0,transition:{duration:1,ease:[0.16,1,0.3,1]}} };

/* ─── Hero ─── */
const AboutHero = () => (
  <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#1B4332]">
    <motion.div initial={{ scale:1.1 }} animate={{ scale:1 }} transition={{ duration:2, ease:'easeOut' }} className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=2000" alt="Tradition" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B4332]/80 via-[#1B4332]/50 to-[#1B4332]/90 mix-blend-multiply" />
    </motion.div>
    <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-20">
      <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-[#E0B030] font-bold uppercase tracking-[0.3em] text-[11px] mb-6">Our Heritage</motion.p>
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
        More Than a Recipe.<br/><span className="italic font-light text-[#FFF8EC]">A Legacy.</span>
      </motion.h1>
    </div>
  </section>
);

/* ─── Story & Philosophy ─── */
const Philosophy = () => {
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.1 });
  return (
    <section className="py-24 bg-[#FFF8EC]" ref={r}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate={inView?'visible':'hidden'} className="w-full md:w-5/12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1B4332] mb-8 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
              The Philosophy <br/> of Patience.
            </h2>
            <div className="w-12 h-[1px] bg-[#D4731A] mb-8"></div>
            <p className="text-[#6B4423] leading-relaxed text-[15px] mb-6">
              In a world that celebrates speed, we have intentionally chosen the path of patience. Sri Mahalakshmi Kitchen & Caterers was founded on a very simple, unyielding principle: true flavour cannot be rushed.
            </p>
            <p className="text-[#6B4423] leading-relaxed text-[15px]">
              Every morning before dawn, our kitchens come alive. Spices are hand-ground, broths are slow-simmered, and dough is rested. Whether it's a simple dosa or a grand wedding biryani, the respect for the ingredient remains exactly the same.
            </p>
          </motion.div>
          <motion.div variants={fadeRight} initial="hidden" animate={inView?'visible':'hidden'} className="w-full md:w-7/12">
            <div className="relative p-6 bg-white border border-[#1B4332]/5 shadow-xl">
              <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000" alt="Spices" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-[#1B4332] text-[#E0B030] p-6 hidden md:block border border-[#E0B030]/20 shadow-lg">
                <p className="text-sm font-bold uppercase tracking-widest">Est. 2010</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── Two Worlds ─── */
const TwoWorlds = () => {
  const [r, inView] = useInView({ triggerOnce:true, threshold:0.1 });
  return (
    <section className="py-24 bg-white" ref={r}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-[#D4731A]">OUR DUALITY</p>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#1B4332]" style={{ fontFamily:"'Playfair Display',serif" }}>Two Worlds. One Standard.</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#1B4332]/10 shadow-2xl">
        
        <motion.div variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="bg-[#FFF8EC] p-12 lg:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4731A]/5 rounded-bl-full transition-transform group-hover:scale-150"></div>
          <h3 className="text-3xl font-bold text-[#1B4332] mb-6" style={{ fontFamily:"'Playfair Display',serif" }}>The Daily Hearth</h3>
          <p className="text-[#6B4423] text-sm leading-relaxed mb-10">
            Our restaurant is a sanctuary for everyday dining. It is where families gather after a long day, where friends meet over filter coffee, and where comfort is served on a plate. The atmosphere is warm, the service is personal, and the food is consistently excellent.
          </p>
          <img src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800" alt="Restaurant Dining" className="w-full h-64 object-cover border border-[#1B4332]/10" />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="bg-[#1B4332] p-12 lg:p-20 text-white relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#E0B030]/5 rounded-br-full transition-transform group-hover:scale-150"></div>
          <h3 className="text-3xl font-bold text-white mb-6" style={{ fontFamily:"'Playfair Display',serif" }}>The Grand Feast</h3>
          <p className="text-white/80 text-sm leading-relaxed mb-10">
            When you entrust us with your celebration, we scale our kitchen to meet your grandest visions. Our catering service brings the precision of a professional restaurant directly to your event venue, executing multi-course traditional feasts for thousands with absolute flawless timing.
          </p>
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" alt="Catering Setup" className="w-full h-64 object-cover border border-white/20" />
        </motion.div>

      </div>
    </section>
  );
};

/* ─── Photo Strip ─── */
const PhotoStrip = () => {
  const images = [
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600'
  ];
  return (
    <section className="py-20 bg-[#FFF8EC] overflow-hidden">
      <div className="flex gap-4 px-4 overflow-x-auto snap-x pb-8 hide-scrollbar">
        {images.map((src, i) => (
          <div key={i} className="min-w-[280px] sm:min-w-[350px] aspect-[4/5] overflow-hidden snap-center flex-shrink-0 relative group">
            <div className="absolute inset-0 border-8 border-white z-10 transition-transform duration-500 group-hover:scale-[0.96]"></div>
            <img src={src} alt="Kitchen magic" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── Final CTA ─── */
const AboutCTA = () => (
  <section className="py-24 bg-white text-center px-4">
    <div className="max-w-2xl mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-[#D4731A]">EXPERIENCE IT</p>
      <h2 className="text-4xl font-bold text-[#1B4332] mb-8" style={{ fontFamily:"'Playfair Display',serif" }}>Join Us at the Table</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/menu" className="bg-[#D4731A] text-white px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all hover:bg-[#B05D10]">
          Order Now
        </Link>
        <Link to="/catering" className="bg-transparent text-[#1B4332] px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all border border-[#1B4332] hover:bg-[#1B4332] hover:text-white">
          Plan Catering
        </Link>
      </div>
    </div>
  </section>
);

const About = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Our Story &amp; Heritage | Sri Mahalakshmi Kitchen &amp; Caterers</title>
        <meta name="description" content="Discover the culinary legacy of Sri Mahalakshmi Kitchen &amp; Caterers (smahalakshmikitchen.com). Traditional South Indian recipes, fresh ingredients, and exceptional catering in Hyderabad." />
        <link rel="canonical" href="https://smahalakshmikitchen.com/about" />
        <meta property="og:title" content="Our Story &amp; Heritage | Sri Mahalakshmi Kitchen" />
        <meta property="og:url" content="https://smahalakshmikitchen.com/about" />
      </Helmet>
      
      <AboutHero />
      <Philosophy />
      <TwoWorlds />
      <PhotoStrip />
      <AboutCTA />
    </div>
  );
};

export default About;