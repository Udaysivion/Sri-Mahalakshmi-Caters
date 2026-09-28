import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Medal } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const SectionHeader = ({ title, subtitle }) => (
  <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16 relative z-10">
    <span className="text-secondary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">~ {subtitle} ~</span>
    <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark">{title}</h2>
    <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
  </motion.div>
);

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Awards = () => {
  const awardsData = [
    { title: "Best Traditional Restaurant", org: "National Food Board", year: "2024", desc: "Awarded for keeping authentic authentic recipes alive.", icon: <Trophy size={40}/> },
    { title: "Best Family Dining", org: "Local Food Awards", year: "2023", desc: "Recognized as the top destination for family gatherings.", icon: <Star size={40}/> },
    { title: "Master Chef Excellence", org: "Kitchen Awards", year: "2021", desc: "Our Head Chef was honored for his authentic recipes.", icon: <Award size={40}/> },
    { title: "Top 50 Authentic Spots", org: "Culinary Guide", year: "2020", desc: "Listed among the top authentic places to eat in the country.", icon: <Medal size={40}/> },
  ];

  const pressMentions = [
    { pub: "The Daily Foodie", quote: "A wonderful place to experience traditional Indian dining." },
    { pub: "Lifestyle Magazine", quote: "Where every meal feels like a warm hug." },
    { pub: "Food Network", quote: "The absolute best homestyle Dal you will ever eat." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-50 min-h-screen pt-24 pb-20">
      <Helmet>
        <title>Awards & Recognition | Taste of Home</title>
        <meta name="description" content="Explore our awards, press mentions, and certificates of excellence." />
      </Helmet>

      {/* Hero */}
      <div className="bg-white text-dark py-32 relative overflow-hidden border-b border-gray-200 mb-24 shadow-sm">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10 filter" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576615278693-e407886477d9?auto=format&fit=crop&q=80&w=2000')" }}></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <Trophy size={48} className="text-secondary mx-auto mb-8 opacity-50" strokeWidth={2} />
          <span className="text-secondary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">~ Recognition ~</span>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-dark">Hall of Fame</h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">Celebrating years of hard work, passion, and culinary excellence.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statistics */}
        <section className="mb-24">
          <div className="bg-white p-10 md:p-16 border border-gray-200 rounded-md shadow-sm flex flex-col md:flex-row justify-around items-center gap-10 text-center relative overflow-hidden group hover:border-secondary transition-colors duration-500">
             <div className="relative z-10">
               <h4 className="text-5xl font-heading font-bold text-secondary mb-4"><AnimatedCounter end={15} suffix="+" /></h4>
               <p className="text-gray-600 font-bold uppercase text-xs">National Awards</p>
             </div>
             <div className="hidden md:block w-px h-24 bg-gray-200 relative z-10"></div>
             <div className="relative z-10">
               <h4 className="text-5xl font-heading font-bold text-secondary mb-4"><AnimatedCounter end={50} suffix="+" /></h4>
               <p className="text-gray-600 font-bold uppercase text-xs">Media Mentions</p>
             </div>
             <div className="hidden md:block w-px h-24 bg-gray-200 relative z-10"></div>
             <div className="relative z-10">
               <h4 className="text-5xl font-heading font-bold text-secondary mb-4"><AnimatedCounter end={5} suffix=" Stars" /></h4>
               <p className="text-gray-600 font-bold uppercase text-xs">Average Rating</p>
             </div>
          </div>
        </section>

        {/* Awards Timeline */}
        <section className="mb-24">
          <SectionHeader title="Achievements" subtitle="Trophies" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {awardsData.map((award, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.3 }} className="bg-white p-8 border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-secondary transition-all duration-300 flex flex-col sm:flex-row items-start gap-8 relative overflow-hidden">
                <div className="w-20 h-20 bg-gray-50 border border-gray-200 text-secondary flex items-center justify-center rounded-full flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 relative z-10">
                  {award.icon}
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-2xl font-heading font-bold text-dark leading-tight">{award.title}</h3>
                    <span className="bg-primary text-white px-3 py-1 text-xs font-bold uppercase rounded-md flex-shrink-0">{award.year}</span>
                  </div>
                  <p className="text-secondary font-bold text-sm uppercase mb-3">{award.org}</p>
                  <p className="text-gray-600 font-medium leading-relaxed text-sm">{award.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Press Mentions */}
        <section>
           <SectionHeader title="Press Coverage" subtitle="In The Media" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pressMentions.map((press, i) => (
                <div key={i} className="bg-white p-10 text-center border border-gray-200 rounded-md shadow-sm hover:border-secondary transition-colors duration-300 group">
                   <Star className="text-secondary mx-auto mb-6 opacity-50 group-hover:opacity-100 transition-opacity duration-300" size={32} strokeWidth={2} />
                   <p className="text-gray-600 font-medium italic leading-relaxed mb-6 text-sm">"{press.quote}"</p>
                   <h4 className="text-dark font-bold uppercase text-xs">— {press.pub}</h4>
                </div>
              ))}
           </div>
        </section>

      </div>
    </motion.div>
  );
};

export default Awards;
