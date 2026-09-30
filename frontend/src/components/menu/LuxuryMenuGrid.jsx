import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, RefreshCw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMenuData } from '../../hooks/useMenuData';
import toast from 'react-hot-toast';

const LuxuryMenuGrid = ({ activeCategory = 'All', dietaryPreference = 'All' }) => {
  const { addToCart } = useCart();
  const { menuItems, loading } = useMenuData();

  const filteredMenu = menuItems.filter((item) => {
    const category = item.cat || item.category || '';
    const categoryMatch =
      activeCategory === 'All' || category.toLowerCase() === activeCategory.toLowerCase();
    const dietaryMatch = dietaryPreference === 'All' || item.type === dietaryPreference;
    return categoryMatch && dietaryMatch;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <section className="py-16 bg-[#FFF8EC]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <RefreshCw size={28} className="animate-spin text-[#D4731A] mb-3" />
            <p className="text-sm font-semibold text-[#1B4332]">Fetching fresh dishes from kitchen...</p>
          </div>
        ) : (
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
                    transition={{ duration: 0.4 }}
                    className="group relative flex flex-col bg-white border border-stone-200 hover:border-[#D4731A] transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl w-full"
                  >
                    <div className="relative h-48 w-full overflow-hidden border-b border-stone-100">
                      <img
                        src={item.img || item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'}
                        alt={item.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.special && (
                          <span className="bg-[#1B4332] text-white px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-md shadow-sm">
                            SIGNATURE
                          </span>
                        )}
                        {item.best && (
                          <span className="bg-[#D4731A] text-white px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-md shadow-sm">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${item.type === 'Veg' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          <span className="text-stone-500 text-[10px] font-bold uppercase">{item.cat || item.category}</span>
                        </div>
                        <span className="text-[#1B4332] font-bold text-lg">₹{item.price}</span>
                      </div>

                      <h3 className="text-lg font-bold text-stone-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.name}
                      </h3>

                      <p className="text-stone-500 text-xs leading-relaxed mb-6 flex-grow">
                        {item.desc || item.description}
                      </p>

                      <div className="pt-3 border-t border-stone-100 mt-auto">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className="w-full flex justify-center items-center gap-2 py-2.5 bg-[#1B4332] hover:bg-[#255b44] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 rounded-xl shadow-sm"
                        >
                          <ShoppingCart size={14} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-24 bg-white rounded-2xl border border-stone-200">
                  <Search size={32} className="text-[#D4731A] mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-[#1B4332] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    No dishes found
                  </h3>
                  <p className="text-xs text-stone-500">Please select another category or clear your filters.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default LuxuryMenuGrid;
