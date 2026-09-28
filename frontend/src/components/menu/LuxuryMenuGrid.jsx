import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, ChefHat, Search, ArrowUpRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

export const menuData = [
  // Tiffins
  { id: 1, name: "Plain Pesarattu", category: "Tiffins", img: "https://images.unsplash.com/photo-1627308595229-7830f5c90663?auto=format&fit=crop&q=80&w=800", type: "Veg", spice: "Low", desc: "Crispy crepe made from green gram batter, served with ginger chutney.", chefSpecial: false, bestSeller: true, price: 50 },
  { id: 2, name: "Onion Pesarattu", category: "Tiffins", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800", type: "Veg", spice: "Medium", desc: "Green gram crepe topped with finely chopped onions and chillies.", chefSpecial: true, bestSeller: true, price: 60 },
  { id: 3, name: "Paneer Dosa", category: "Tiffins", img: "https://images.unsplash.com/photo-1551239841-f7e9f3b14bb2?auto=format&fit=crop&q=80&w=800", type: "Veg", spice: "Medium", desc: "Golden dosa stuffed with spiced paneer filling.", chefSpecial: false, bestSeller: false, price: 80 },
  { id: 4, name: "Chapathi (2)", category: "Tiffins", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800", type: "Veg", spice: "None", desc: "Soft, whole wheat flatbreads cooked on a tawa.", chefSpecial: false, bestSeller: true, price: 50 },
  
  // Chinese & Fast Food
  { id: 5, name: "Veg Noodles", category: "Chinese", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800", type: "Veg", spice: "Medium", desc: "Stir-fried noodles with crunchy vegetables.", chefSpecial: false, bestSeller: true, price: 80 },
  { id: 6, name: "Egg Noodles", category: "Chinese", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800", type: "Non-Veg", spice: "Medium", desc: "Classic noodles tossed with scrambled egg and veggies.", chefSpecial: false, bestSeller: false, price: 90 },
  { id: 7, name: "Chicken Noodles", category: "Chinese", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", type: "Non-Veg", spice: "High", desc: "Spicy chicken and noodles stir-fried to perfection.", chefSpecial: true, bestSeller: true, price: 110 },
  
  // Biryani & Curries
  { id: 8, name: "Veg Biryani", category: "Biryani & Curries", img: "https://images.unsplash.com/photo-1526315274106-ee192b028682?auto=format&fit=crop&q=80&w=800", type: "Veg", spice: "Medium", desc: "Aromatic basmati rice cooked with mixed vegetables and spices.", chefSpecial: false, bestSeller: true, price: 120 },
  { id: 9, name: "Egg Biryani", category: "Biryani & Curries", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", type: "Non-Veg", spice: "Medium", desc: "Flavorful biryani served with boiled and fried eggs (2pc).", chefSpecial: false, bestSeller: false, price: 140 },
  { id: 10, name: "Chicken Dum Biryani", category: "Biryani & Curries", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800", type: "Non-Veg", spice: "High", desc: "Authentic Hyderabadi style slow-cooked chicken biryani.", chefSpecial: true, bestSeller: true, price: 140 },
  { id: 11, name: "Chicken 65 Biryani", category: "Biryani & Curries", img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4859?auto=format&fit=crop&q=80&w=800", type: "Non-Veg", spice: "High", desc: "Spicy Chicken 65 chunks served over aromatic biryani rice.", chefSpecial: true, bestSeller: false, price: 190 },
];

const getCategoryIcon = (category, type) => {
  switch (category) {
    case 'Tiffins':
      return <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
    case 'Chinese':
      return <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" /></svg>;
    case 'Biryani & Curries':
      return <Flame className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />;
    default:
      if (type === 'Veg') {
        return <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /></svg>;
      } else {
        return <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.8 4.2c-.6-.6-1.5-.9-2.4-.9-1.9 0-3.5 1.6-3.5 3.5v.3c-2.4 1.3-4 3.9-4 6.9 0 2.8 1.4 5.3 3.5 6.8v.7c0 .6.4 1 1 1s1-.4 1-1v-2c2.5-.2 4.4-2.3 4.4-4.8 0-2.3-1.6-4.2-3.8-4.7V7.8c0-.8.7-1.5 1.5-1.5.4 0 .8.2 1.1.5.3.3.4.7.4 1.1v.6c0 .6.4 1 1 1s1-.4 1-1v-.6c0-.8-.3-1.6-.9-2.2z" /></svg>;
      }
  }
};

const LuxuryMenuGrid = ({ activeCategory, dietaryPreference }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const filteredMenu = menuData.filter(item => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const dietaryMatch = dietaryPreference === "All" || item.type === dietaryPreference;
    return categoryMatch && dietaryMatch;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <section className="py-24 bg-bg border-b border-luxury">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="group relative flex flex-col bg-white border border-gray-200 hover:border-primary transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl mx-auto w-full max-w-[320px]"
                >
                  <div className="relative h-44 w-full overflow-hidden z-10 border-b border-gray-100">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.chefSpecial && (
                        <span className="bg-primary text-white px-2 py-1 text-[10px] uppercase font-bold flex items-center gap-1 rounded-sm shadow-sm">
                          SPECIAL
                        </span>
                      )}
                      {item.bestSeller && (
                        <span className="bg-accent text-white px-2 py-1 text-[10px] uppercase font-bold rounded-sm shadow-sm">
                          POPULAR
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative z-20 p-5 flex flex-col flex-grow bg-white">
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.type === 'Veg' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                        <span className="text-gray-500 text-[10px] font-bold uppercase">{item.category}</span>
                      </div>
                      <span className="text-dark font-price font-bold text-lg">₹{item.price}</span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-gray-800 group-hover:text-dark transition-colors duration-300 mb-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-snug mb-6 flex-grow min-h-[40px]">
                      {item.desc}
                    </p>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 mt-auto">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 flex justify-center items-center gap-2 py-2 bg-secondary text-white font-bold text-sm hover:bg-dark transition-all duration-300 rounded-md shadow-sm"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-32 border border-luxury bg-cream/5"
              >
                <Search size={32} strokeWidth={1} className="text-primary mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl font-heading font-light text-white mb-4">No culinary creations found</h3>
                <p className="text-text-muted font-light">Please select another category to explore our menu.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LuxuryMenuGrid;
