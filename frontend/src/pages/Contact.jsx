import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, UtensilsCrossed, PartyPopper } from 'lucide-react';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('restaurant'); // 'restaurant' or 'catering'

  const { register: registerRest, handleSubmit: handleSubmitRest, formState: { errors: errorsRest }, reset: resetRest } = useForm();
  const { register: registerCat, handleSubmit: handleSubmitCat, formState: { errors: errorsCat }, reset: resetCat } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmitRestaurant = (data) => {
    console.log("Restaurant Query:", data);
    alert('Thank you! Your table reservation request has been received. We will call you to confirm shortly. 🙏');
    resetRest();
  };

  const onSubmitCatering = (data) => {
    console.log("Catering Query:", data);
    alert('Thank you! Your catering inquiry has been received. Our event manager will contact you soon. 🎉');
    resetCat();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ background: '#FFF8EC', minHeight: '100vh' }}>
      <Helmet>
        <title>Contact Us | Sri Mahalakshmi Kitchen & Caterers</title>
        <meta name="description" content="Get in touch with Sri Mahalakshmi Kitchen & Caterers for table reservations, catering orders and queries." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-16 overflow-hidden" style={{ background: '#1B4332' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right,#D4731A,#C4960A,#E0B030,#C4960A,#D4731A)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(27,50,10,0.9),rgba(45,90,30,0.95))' }} />
        <div className="relative z-10 text-center py-12 px-4">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-sm font-bold mb-1 uppercase tracking-widest" style={{ color: '#E0B030' }}>
            ~ Connect With Us ~
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: "'Playfair Display',sans-serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: 'white', marginBottom: '0.3rem' }}>
            Get in Touch 📞
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 500, margin: '0 auto' }}>
            Whether you want to reserve a table for tonight or book a feast for 1000 guests, we're here for you.
          </motion.p>
        </div>
        <div style={{ height: '36px', background: '#FFF8EC', clipPath: 'ellipse(100% 100% at 50% 100%)' }} />
      </div>

      {/* Info Strip */}
      <div style={{ background: '#1B4332' }} className="py-4">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <MapPin size={16} />, label: 'Location', val: 'Bahadurpally, Hyderabad' },
            { icon: <Phone size={16} />, label: 'Phone', val: '+91 77948 00042' },
            { icon: <MessageCircle size={16} />, label: 'WhatsApp', val: 'Chat Now' },
            { icon: <Clock size={16} />, label: 'Hours', val: '11 AM – 11 PM' },
          ].map((info, i) => (
            <div key={i} className="flex items-center gap-2.5 py-1">
              <span style={{ color: '#E0B030' }}>{info.icon}</span>
              <div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter',sans-serif" }}>{info.label}</p>
                <p className="text-xs font-bold text-white" style={{ fontFamily: "'Playfair Display',sans-serif" }}>{info.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form Section */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden"
            style={{ background: 'white', border: '1.5px solid rgba(196,150,10,0.3)', boxShadow: '0 4px 20px rgba(92,45,14,0.07)' }}>

            {/* Tabs */}
            <div className="flex" style={{ borderBottom: '1px solid rgba(196,150,10,0.2)' }}>
              <button
                onClick={() => setActiveTab('restaurant')}
                className="flex-1 py-4 px-4 flex items-center justify-center gap-2 text-sm font-bold transition-colors"
                style={{
                  background: activeTab === 'restaurant' ? '#1B4332' : 'white',
                  color: activeTab === 'restaurant' ? 'white' : '#6B4423',
                  fontFamily: "'Playfair Display',sans-serif"
                }}>
                <UtensilsCrossed size={16} /> Restaurant Dining
              </button>
              <button
                onClick={() => setActiveTab('catering')}
                className="flex-1 py-4 px-4 flex items-center justify-center gap-2 text-sm font-bold transition-colors"
                style={{
                  background: activeTab === 'catering' ? '#1B4332' : 'white',
                  color: activeTab === 'catering' ? 'white' : '#6B4423',
                  fontFamily: "'Playfair Display',sans-serif"
                }}>
                <PartyPopper size={16} /> Catering & Events
              </button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">

                {/* ─── RESTAURANT FORM ─── */}
                {activeTab === 'restaurant' && (
                  <motion.form
                    key="restaurant"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}
                    onSubmit={handleSubmitRest(onSubmitRestaurant)} className="space-y-4">

                    <div className="flex items-center gap-3 mb-5">
                      <div style={{ height: '2px', width: '35px', background: '#D4731A' }} />
                      <h2 style={{ fontFamily: "'Playfair Display',sans-serif", color: '#1B4332', fontSize: '1.3rem', fontWeight: 800 }}>
                        Table Reservation & Queries
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Full Name *</label>
                        <input {...registerRest('name', { required: 'Required' })} placeholder="Your full name"
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                        {errorsRest.name && <p className="text-red-500 text-xs mt-1">{errorsRest.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Phone *</label>
                        <input {...registerRest('phone', { required: 'Required' })} placeholder="+91 77948 00042"
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                        {errorsRest.phone && <p className="text-red-500 text-xs mt-1">{errorsRest.phone.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Date</label>
                        <input type="date" {...registerRest('date')}
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Time</label>
                        <input type="time" {...registerRest('time')}
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Guests</label>
                        <select {...registerRest('guests')} className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }}>
                          <option>1-2 People</option>
                          <option>3-4 People</option>
                          <option>5-8 People</option>
                          <option>9+ People</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Message / Special Requests</label>
                      <textarea {...registerRest('message')} rows="3" placeholder="Any special requests or queries?"
                        className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none"
                        style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                    </div>

                    <button type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                      style={{ background: '#D4731A', color: 'white', fontFamily: "'Playfair Display',sans-serif", boxShadow: '0 4px 14px rgba(212,115,26,0.35)' }}>
                      <Send size={15} /> Request Reservation
                    </button>
                  </motion.form>
                )}

                {/* ─── CATERING FORM ─── */}
                {activeTab === 'catering' && (
                  <motion.form
                    key="catering"
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}
                    onSubmit={handleSubmitCat(onSubmitCatering)} className="space-y-4">

                    <div className="flex items-center gap-3 mb-5">
                      <div style={{ height: '2px', width: '35px', background: '#D4731A' }} />
                      <h2 style={{ fontFamily: "'Playfair Display',sans-serif", color: '#1B4332', fontSize: '1.3rem', fontWeight: 800 }}>
                        Catering & Bulk Order Inquiry
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Full Name *</label>
                        <input {...registerCat('name', { required: 'Required' })} placeholder="Your full name"
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                        {errorsCat.name && <p className="text-red-500 text-xs mt-1">{errorsCat.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Phone *</label>
                        <input {...registerCat('phone', { required: 'Required' })} placeholder="+91 77948 00042"
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                        {errorsCat.phone && <p className="text-red-500 text-xs mt-1">{errorsCat.phone.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Event Type</label>
                        <select {...registerCat('eventType')} className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }}>
                          <option>Wedding/Reception</option>
                          <option>Corporate Event</option>
                          <option>Birthday/Party</option>
                          <option>House Warming</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Est. Guests</label>
                        <input type="number" {...registerCat('guests')} placeholder="e.g. 150"
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Event Date</label>
                        <input type="date" {...registerCat('date')}
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                          style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: '#1B4332', letterSpacing: '0.07em' }}>Venue Location & Details</label>
                      <textarea {...registerCat('message')} rows="3" placeholder="Where is the event? Any specific menu preferences?"
                        className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none"
                        style={{ background: '#FFF8EC', border: '1.5px solid rgba(196,150,10,0.4)', color: '#2C1A00' }} />
                    </div>

                    <button type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                      style={{ background: '#1B4332', color: 'white', fontFamily: "'Playfair Display',sans-serif", boxShadow: '0 4px 14px rgba(27,67,50,0.35)' }}>
                      <Send size={15} /> Send Catering Inquiry
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact Info Card */}
            <div className="rounded-2xl p-6"
              style={{ background: 'white', border: '1.5px solid rgba(196,150,10,0.3)' }}>
              <h3 style={{ fontFamily: "'Playfair Display',sans-serif", color: '#1B4332', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
                📍 Contact Details
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: <MapPin size={18} />, title: 'Location', val: 'Bahadurpally, Hyderabad, Telangana 500043', link: 'https://www.google.com/maps/dir//SRI+MAHALAKSHMI+KITCHEN+%26+CATERERS,+HC5R%2B7R2,+Bahadurpally,+Hyderabad,+Telangana+500043/@17.4343544,78.3955979,2663m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3bcb8f0050329baf:0x8f493cc97407ac3!2m2!1d78.4419977!2d17.5581314?entry=ttu&g_ep=EgoyMDI2MDkyNy4xIKXMDSoASAFQAw%3D%3D' },
                  { icon: <Phone size={18} />, title: 'Phone', val: '+91 77948 00042', link: 'tel:+917794800042' },
                  { icon: <MessageCircle size={18} />, title: 'WhatsApp', val: '+91 77948 00042', link: 'https://wa.me/917794800042' },
                  { icon: <Mail size={18} />, title: 'Email', val: 'info@smahalakshmikitchen.com', link: 'mailto:info@smahalakshmikitchen.com' },
                  { icon: <Clock size={18} />, title: 'Working Hours', val: 'Mon – Sun: 11 AM – 11 PM' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: '#D4731A', marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold uppercase mb-0.5" style={{ color: '#1B4332', fontFamily: "'Playfair Display',sans-serif", letterSpacing: '0.05em' }}>{item.title}</p>
                      {item.link ? (
                        <a href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" className="text-sm hover:text-[#D4731A] transition-colors block leading-tight" style={{ color: '#6B4423', fontFamily: "'Inter',sans-serif" }}>{item.val}</a>
                      ) : (
                        <p className="text-sm" style={{ color: '#6B4423', fontFamily: "'Inter',sans-serif" }}>{item.val}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Quick CTA */}
              <div className="mt-5 flex gap-3">
                <a href="https://wa.me/917794800042" target="_blank" rel="noreferrer"
                  className="flex-1 text-center py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: '#25D366', color: 'white', fontFamily: "'Playfair Display',sans-serif", boxShadow: '0 3px 10px rgba(37,211,102,0.35)' }}>
                  💬 WhatsApp
                </a>
                <a href="tel:+917794800042"
                  className="flex-1 text-center py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: '#D4731A', color: 'white', fontFamily: "'Playfair Display',sans-serif", boxShadow: '0 3px 10px rgba(212,115,26,0.35)' }}>
                  📞 Call Now
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1.5px solid rgba(196,150,10,0.3)', height: '160px' }}>
              <iframe title="Sri Mahalakshmi Location"
                src="https://maps.google.com/maps?q=SRI%20MAHALAKSHMI%20KITCHEN%20%26%20CATERERS,%20Bahadurpally,%20Hyderabad,%20Telangana%20500043&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;