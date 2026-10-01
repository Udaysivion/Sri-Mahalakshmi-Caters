import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Calendar, ChefHat } from 'lucide-react';

const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.8,ease:[0.16,1,0.3,1]}} };
const stagger = { visible:{transition:{staggerChildren:0.1}} };

const Catering = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FFF8EC]">
      <Helmet>
        <title>Premium Catering | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Professional Indian catering services for weddings, corporate events, and intimate gatherings." />
      </Helmet>

      {/* 1. HIGHLIGHT HEADER (Matching Figma Mockup) */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-[10px] font-bold uppercase tracking-[0.25em] mb-6 text-[#D4731A]">
            Sri Mahalakshmi Catering
          </motion.p>
          
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.1}} className="text-5xl md:text-6xl font-bold text-[#112A1F] leading-tight mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>
            We Cater.
          </motion.h1>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.2}} className="text-5xl md:text-6xl font-light italic text-[#D4731A] leading-tight mb-8" style={{ fontFamily:"'Playfair Display',serif" }}>
            You Celebrate.
          </motion.h1>
          
          <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.8,delay:0.3}} className="w-16 h-[1px] bg-[#D4731A]/40 mx-auto mb-8"></motion.div>
          
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.4}} className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            From intimate family gatherings to grand weddings, we bring authentic flavours, immaculate presentation, and thoughtful hospitality to your most important days.
          </motion.p>
          
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.5}}>
            <Link to="/contact" className="inline-flex bg-[#112A1F] text-white px-8 py-3.5 rounded-full font-bold text-[11px] tracking-[0.1em] uppercase transition-all hover:bg-[#1E4A35] shadow-lg hover:shadow-xl hover:-translate-y-1">
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. OUT OF THE BOX EVENT TYPES (Bento Grid) */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-[#D4731A]">Our Expertise</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#112A1F]" style={{ fontFamily:"'Playfair Display',serif" }}>Flawless Celebrations</h2>
          </div>
          
          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
            
            {/* Main Massive Card (Weddings) */}
            <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8}} className="lg:col-span-8 relative rounded-3xl overflow-hidden group cursor-pointer h-[400px] lg:h-full shadow-lg">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" alt="Weddings" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112A1F] via-[#112A1F]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full">
                <span className="bg-[#D4731A] text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-sm mb-4 inline-block">Grand Scale</span>
                <h3 className="text-4xl font-bold text-white mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>Weddings & Receptions</h3>
                <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  Elaborate multi-course traditional feasts for up to 2000+ guests. Complete with stunning live counters, elegant buffet setups, and premium hospitality.
                </p>
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform"/>
                </div>
              </div>
            </motion.div>

            {/* Right Side Stacked Cards */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-[600px] lg:h-full">
              
              <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8, delay:0.2}} className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" alt="Corporate" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>Corporate Events</h3>
                  <p className="text-gray-300 text-xs line-clamp-2">Professional, punctual catering with sophisticated presentation for board meetings and office parties.</p>
                </div>
              </motion.div>

              <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8, delay:0.4}} className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                <img src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800" alt="Intimate" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4731A]/90 to-[#D4731A]/20"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>Intimate Functions</h3>
                  <p className="text-white/90 text-xs line-clamp-2">Birthdays and housewarmings served with warm, homely hospitality.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPACITY & SERVICES (Minimalist Icons) */}
      <section className="py-24 bg-[#112A1F] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#1E4A35] rounded-full flex items-center justify-center mb-6 text-[#D4731A]">
                <Users size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Guest Capacity</h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">We comfortably cater to gatherings ranging from 50 to 2,000+ guests without compromising quality.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#1E4A35] rounded-full flex items-center justify-center mb-6 text-[#D4731A]">
                <ChefHat size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Custom Menus</h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Every event is unique. Our executive chefs work with you to design a menu perfectly suited to your guests' palates.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#1E4A35] rounded-full flex items-center justify-center mb-6 text-[#D4731A]">
                <Calendar size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Flawless Execution</h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">From timely delivery to elegant buffet setup and courteous service staff, we handle the entire dining experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PACKAGES (Luxury Split Design) */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Image Side */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200" alt="Feast" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content Side */}
          <div className="bg-[#FFF8EC] p-12 md:p-24 flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-[#D4731A]">Curated Menus</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#112A1F] mb-12" style={{ fontFamily:"'Playfair Display',serif" }}>Bespoke Catering Packages</h2>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-[#112A1F] mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>The Classic Feast</h3>
                <p className="text-gray-600 text-sm mb-4">An exquisite selection of 2 starters, 2 main courses, signature biryani, breads, and a traditional dessert. Perfect for intimate family functions.</p>
                <div className="w-12 h-[1px] bg-[#D4731A]/40"></div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-[#112A1F]" style={{ fontFamily:"'Playfair Display',serif" }}>The Grand Pandal</h3>
                  <span className="bg-[#D4731A] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">Signature</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Our ultimate offering. 4 live starter counters, 4 lavish main courses, artisan breads, extensive salad bar, and 3 premium desserts.</p>
                <div className="w-12 h-[1px] bg-[#D4731A]/40 mb-8"></div>
              </div>
            </div>

            <Link to="/contact" className="inline-flex justify-center items-center bg-[#112A1F] text-white px-8 py-4 mt-4 rounded-full font-bold text-[11px] tracking-[0.1em] uppercase transition-all hover:bg-[#D4731A] shadow-lg w-fit gap-2">
              Download Full Brochure <ArrowRight size={14}/>
            </Link>
          </div>
          
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden bg-[#0D2219]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-[#D4731A]">READY TO PLAN?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
            Secure Your Date
          </h2>
          <p className="text-gray-300 mb-10 font-light text-sm md:text-base">Our catering calendar fills up quickly during wedding season. Contact us early to ensure availability for your special day.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-[#D4731A] text-white px-10 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all hover:bg-[#B05D10] shadow-xl">
              Request a Quote
            </Link>
            <a href="https://wa.me/917794800042" className="bg-transparent border border-white/30 text-white px-10 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all hover:border-white hover:bg-white/10">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Catering;
