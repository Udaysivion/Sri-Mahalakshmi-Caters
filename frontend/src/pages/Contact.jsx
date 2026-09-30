import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, UtensilsCrossed, PartyPopper } from 'lucide-react';
import { TableReservationForm } from '@/features/reservation';
import { CateringInquiryForm } from '@/features/catering';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('restaurant'); // 'restaurant' or 'catering'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{ background:'#FFF8EC', minHeight:'100vh' }}>
      <Helmet>
        <title>Contact Us | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Get in touch with Sri Mahalakshmi Kitchen & Caterers for table reservations, catering orders and queries." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-16 overflow-hidden" style={{ background:'#1B4332' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,height:'4px', background:'linear-gradient(to right,#D4731A,#C4960A,#E0B030,#C4960A,#D4731A)' }}/>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom,rgba(27,50,10,0.9),rgba(45,90,30,0.95))' }}/>
        <div className="relative z-10 text-center py-12 px-4">
          <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="text-sm font-bold mb-1 uppercase tracking-widest" style={{ color:'#E0B030' }}>
            ~ Connect With Us ~
          </motion.p>
          <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            style={{ fontFamily:"'Playfair Display',sans-serif",fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,color:'white',marginBottom:'0.3rem' }}>
            Get in Touch 📞
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            className="text-sm" style={{ color:'rgba(255,255,255,0.75)',maxWidth:500,margin:'0 auto' }}>
            Whether you want to reserve a table for tonight or book a feast for 1000 guests, we're here for you.
          </motion.p>
        </div>
        <div style={{ height:'36px',background:'#FFF8EC',clipPath:'ellipse(100% 100% at 50% 100%)' }}/>
      </div>

      {/* Info Strip */}
      <div style={{ background:'#1B4332' }} className="py-4">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {icon:<MapPin size={16}/>,label:'Location',val:'Warangal, Telangana'},
            {icon:<Phone size={16}/>,label:'Phone',val:'+91 98765 43210'},
            {icon:<MessageCircle size={16}/>,label:'WhatsApp',val:'Chat Now'},
            {icon:<Clock size={16}/>,label:'Hours',val:'11 AM – 11 PM'},
          ].map((info,i)=>(
            <div key={i} className="flex items-center gap-2.5 py-1">
              <span style={{ color:'#E0B030' }}>{info.icon}</span>
              <div>
                <p className="text-xs" style={{ color:'rgba(255,255,255,0.5)',fontFamily:"'Inter',sans-serif" }}>{info.label}</p>
                <p className="text-xs font-bold text-white" style={{ fontFamily:"'Playfair Display',sans-serif" }}>{info.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form Section */}
          <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
            className="lg:col-span-3 rounded-2xl overflow-hidden"
            style={{ background:'white',border:'1.5px solid rgba(196,150,10,0.3)',boxShadow:'0 4px 20px rgba(92,45,14,0.07)' }}>

            {/* Tabs */}
            <div className="flex" style={{ borderBottom:'1px solid rgba(196,150,10,0.2)' }}>
              <button 
                onClick={() => setActiveTab('restaurant')}
                className="flex-1 py-4 px-4 flex items-center justify-center gap-2 text-sm font-bold transition-colors"
                style={{ 
                  background: activeTab === 'restaurant' ? '#1B4332' : 'white', 
                  color: activeTab === 'restaurant' ? 'white' : '#6B4423',
                  fontFamily:"'Playfair Display',sans-serif"
                }}>
                <UtensilsCrossed size={16} /> Restaurant Dining
              </button>
              <button 
                onClick={() => setActiveTab('catering')}
                className="flex-1 py-4 px-4 flex items-center justify-center gap-2 text-sm font-bold transition-colors"
                style={{ 
                  background: activeTab === 'catering' ? '#1B4332' : 'white', 
                  color: activeTab === 'catering' ? 'white' : '#6B4423',
                  fontFamily:"'Playfair Display',sans-serif"
                }}>
                <PartyPopper size={16} /> Catering & Events
              </button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                
                {/* ─── RESTAURANT FORM ─── */}
                {activeTab === 'restaurant' && <TableReservationForm />}

                {/* ─── CATERING FORM ─── */}
                {activeTab === 'catering' && <CateringInquiryForm />}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right panel */}
          <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.9,delay:0.3}}
            className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact Info Card */}
            <div className="rounded-2xl p-6"
              style={{ background:'white',border:'1.5px solid rgba(196,150,10,0.3)' }}>
              <h3 style={{ fontFamily:"'Playfair Display',sans-serif",color:'#1B4332',fontSize:'1.2rem',fontWeight:800,marginBottom:'1rem' }}>
                📍 Contact Details
              </h3>
              <ul className="space-y-4">
                {[
                  {icon:<MapPin size={18}/>,title:'Location',val:'Warangal, Telangana, India'},
                  {icon:<Phone size={18}/>,title:'Phone',val:'+91 98765 43210'},
                  {icon:<MessageCircle size={18}/>,title:'WhatsApp',val:'+91 98765 43210'},
                  {icon:<Mail size={18}/>,title:'Email',val:'info@srimahalakshmi.com'},
                  {icon:<Clock size={18}/>,title:'Working Hours',val:'Mon – Sun: 11 AM – 11 PM'},
                ].map((item,i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color:'#D4731A',marginTop:2 }}>{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold uppercase mb-0.5" style={{ color:'#1B4332',fontFamily:"'Playfair Display',sans-serif",letterSpacing:'0.05em' }}>{item.title}</p>
                      <p className="text-sm" style={{ color:'#6B4423',fontFamily:"'Inter',sans-serif" }}>{item.val}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Quick CTA */}
              <div className="mt-5 flex gap-3">
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
                  className="flex-1 text-center py-2.5 rounded-xl font-bold text-sm"
                  style={{ background:'#25D366',color:'white',fontFamily:"'Playfair Display',sans-serif",boxShadow:'0 3px 10px rgba(37,211,102,0.35)' }}>
                  💬 WhatsApp
                </a>
                <a href="tel:+919876543210"
                  className="flex-1 text-center py-2.5 rounded-xl font-bold text-sm"
                  style={{ background:'#D4731A',color:'white',fontFamily:"'Playfair Display',sans-serif",boxShadow:'0 3px 10px rgba(212,115,26,0.35)' }}>
                  📞 Call Now
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden"
              style={{ border:'1.5px solid rgba(196,150,10,0.3)',height:'160px' }}>
              <iframe title="Sri Mahalakshmi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30407.9!2d79.5774!3d17.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3342fc5af82f59%3A0x7c848d7d7e83e8e7!2sWarangal%2C%20Telangana!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border:0 }} allowFullScreen="" loading="lazy"/>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;