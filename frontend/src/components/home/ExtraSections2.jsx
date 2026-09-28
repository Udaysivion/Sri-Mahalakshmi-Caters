import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, Award, CheckCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const SectionHeader = ({ title, subtitle }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-16">
      <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-3 block">~ {subtitle} ~</span>
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary">{title}</h2>
      <div className="w-24 h-1 bg-secondary mx-auto mt-6 rounded-full"></div>
    </motion.div>
  );
};

export const AwardsRecognition = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const awards = [
    { title: "Best Family Dining", org: "Times Food Awards", year: "2024" },
    { title: "Michelin Star", org: "Michelin Guide", year: "2023" },
    { title: "Top 50 Restaurants", org: "Culinary Excellence", year: "2022" },
    { title: "Master Chef", org: "Global Kitchen Awards", year: "2021" }
  ];

  return (
    <section className="py-32 bg-bg relative border-b border-luxury">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <SectionHeader title="Awards & Recognition" subtitle="Excellence" />
         <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {awards.map((award, idx) => (
             <motion.div key={idx} variants={fadeUp} className="bg-transparent p-10 border border-luxury text-center group hover:border-primary transition-colors duration-500 relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 transform translate-x-10 -translate-y-10 group-hover:bg-primary/10 transition-colors duration-500"></div>
               <div className="w-16 h-16 mx-auto border border-luxury flex items-center justify-center text-primary mb-8 relative z-10 group-hover:bg-primary group-hover:text-bg transition-colors duration-500">
                 <Award size={24} strokeWidth={1} />
               </div>
               <h3 className="text-xl font-heading font-light text-white mb-4 relative z-10">{award.title}</h3>
               <p className="text-text-muted text-sm mb-6 font-light relative z-10">{award.org}</p>
               <span className="inline-block border border-luxury text-white px-4 py-1 text-[10px] tracking-widest uppercase relative z-10">{award.year}</span>
             </motion.div>
           ))}
         </motion.div>
       </div>
    </section>
  );
};

export const TestimonialsCarousel = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const reviews = [
    { name: "Priya Sharma", type: "Google Review", text: "The most authentic Indian food I have ever tasted outside of my grandmother's kitchen. The luxury ambience is a bonus!" },
    { name: "Rahul Verma", type: "Food Critic", text: "A masterful display of spices and traditional cooking methods. The Mutton Biryani is absolute perfection." },
    { name: "Ananya Desai", type: "Family Dinner", text: "We celebrated our parent's 50th anniversary here. The staff made us feel like royalty. Unforgettable experience." },
    { name: "Karan Singh", type: "Corporate Event", text: "Hosted our annual company dinner here. Flawless execution, brilliant food, and top-tier service." },
  ];

  return (
    <section className="py-32 bg-bg relative overflow-hidden border-b border-luxury">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <SectionHeader title="Guest Experiences" subtitle="Testimonials" />
         
         <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: "easeOut" }}>
           <Swiper
             modules={[Autoplay, Pagination]}
             spaceBetween={40}
             slidesPerView={1}
             breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
             autoplay={{ delay: 5000, disableOnInteraction: false }}
             pagination={{ clickable: true, dynamicBullets: true }}
             className="pb-20"
           >
             {reviews.map((rev, idx) => (
               <SwiperSlide key={idx}>
                 <div className="bg-transparent p-10 border border-luxury h-full flex flex-col relative group hover:border-primary transition-colors duration-500">
                   <Quote className="absolute top-8 right-8 text-primary opacity-20 group-hover:opacity-40 transition-opacity duration-500" size={32} strokeWidth={1} />
                   <div className="flex text-primary mb-8 gap-1"><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/></div>
                   <p className="text-text-muted font-light italic leading-relaxed mb-10 flex-grow text-sm">"{rev.text}"</p>
                   <div>
                     <h4 className="font-heading font-light text-white mb-2 tracking-wide">{rev.name}</h4>
                     <p className="text-xs text-primary font-semibold flex items-center gap-2 uppercase tracking-widest"><CheckCircle size={10}/> {rev.type}</p>
                   </div>
                 </div>
               </SwiperSlide>
             ))}
           </Swiper>
         </motion.div>
       </div>
    </section>
  );
};

export const InstagramGallery = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const images = [
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
  ];

  return (
    <section className="py-32 bg-bg relative overflow-hidden border-b border-luxury">
      <SectionHeader title="Follow Our Journey" subtitle="@tasteofhome" />
      <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
        {images.map((img, i) => (
          <motion.div key={i} variants={fadeUp} className="relative group overflow-hidden aspect-square border border-luxury">
            <img src={img} alt="Instagram Feed" className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000" />
            <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-light tracking-[0.3em] text-xs uppercase transform scale-50 group-hover:scale-100 transition-transform duration-500 border border-white px-4 py-2">View</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
