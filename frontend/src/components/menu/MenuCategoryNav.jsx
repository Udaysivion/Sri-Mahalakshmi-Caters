import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Drumstick, Utensils } from 'lucide-react';

export const categories = [
  "All", "Tiffins", "Chinese", "Biryani & Curries"
];

const MenuCategoryNav = ({ activeCategory, setActiveCategory, dietaryPreference, setDietaryPreference }) => {
  return (
    <div className="bg-bg relative z-40 py-8 mb-8 border-y border-luxury">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Dietary Preferences Toggle */}
          <div className="flex items-center gap-4 bg-bg border border-luxury p-1">
            <button
              onClick={() => setDietaryPreference("All")}
              className={`flex items-center gap-2 px-6 py-3 text-[10px] tracking-widest uppercase font-bold transition-all duration-500 ${
                dietaryPreference === "All" ? "bg-primary text-bg" : "text-text-muted hover:text-white"
              }`}
            >
              <Utensils size={14} /> All
            </button>
            <button
              onClick={() => setDietaryPreference("Veg")}
              className={`flex items-center gap-2 px-6 py-3 text-[10px] tracking-widest uppercase font-bold transition-all duration-500 ${
                dietaryPreference === "Veg" ? "bg-green-600 text-white" : "text-text-muted hover:text-white"
              }`}
            >
              <Leaf size={14} className={dietaryPreference === "Veg" ? "text-white" : "text-green-500"} /> Veg
            </button>
            <button
              onClick={() => setDietaryPreference("Non-Veg")}
              className={`flex items-center gap-2 px-6 py-3 text-[10px] tracking-widest uppercase font-bold transition-all duration-500 ${
                dietaryPreference === "Non-Veg" ? "bg-red-600 text-white" : "text-text-muted hover:text-white"
              }`}
            >
              <Drumstick size={14} className={dietaryPreference === "Non-Veg" ? "text-white" : "text-red-500"} /> Non-Veg
            </button>
          </div>

          {/* Right: Category Selector */}
          <div className="w-full lg:w-auto flex flex-wrap gap-2 items-center justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative whitespace-nowrap px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors duration-500 border ${
                    isActive ? "text-bg border-primary" : "text-text-muted border-transparent hover:text-white hover:border-luxury"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBox"
                      className="absolute inset-0 bg-primary z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};

export default MenuCategoryNav;
