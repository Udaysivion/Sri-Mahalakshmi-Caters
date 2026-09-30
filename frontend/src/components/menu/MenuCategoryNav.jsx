import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Drumstick, Utensils } from 'lucide-react';
import { useMenuData } from '../../hooks/useMenuData';

export const defaultCategories = [
  "All", "Tiffins", "Chinese", "Biryani", "Curries", "Rice"
];

export const categories = defaultCategories;

const MenuCategoryNav = ({ activeCategory, setActiveCategory, dietaryPreference, setDietaryPreference, customCategories }) => {
  const { menuItems } = useMenuData();

  // Derive categories dynamically from database items
  const dynamicCategories = Array.from(new Set((menuItems || []).map(i => i.cat || i.category).filter(Boolean)));
  const displayCategories = customCategories || (dynamicCategories.length > 0 ? ['All', ...dynamicCategories] : defaultCategories);
  return (
    <div className="bg-[#FFF8EC] relative z-40 py-6 mb-8 border-y border-[#1B4332]/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Dietary Preferences Toggle */}
          <div className="flex items-center gap-2 bg-white border border-[#1B4332]/15 p-1 rounded-xl">
            <button
              onClick={() => setDietaryPreference("All")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                dietaryPreference === "All" ? "bg-[#1B4332] text-white" : "text-[#1B4332] hover:bg-stone-50"
              }`}
            >
              <Utensils size={13} /> All
            </button>
            <button
              onClick={() => setDietaryPreference("Veg")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                dietaryPreference === "Veg" ? "bg-emerald-700 text-white" : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <Leaf size={13} /> Veg
            </button>
            <button
              onClick={() => setDietaryPreference("Non-Veg")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                dietaryPreference === "Non-Veg" ? "bg-rose-700 text-white" : "text-rose-700 hover:bg-rose-50"
              }`}
            >
              <Drumstick size={13} /> Non-Veg
            </button>
          </div>

          {/* Right: Category Selector */}
          <div className="w-full lg:w-auto flex flex-wrap gap-2 items-center justify-center">
            {displayCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all border ${
                    isActive
                      ? "bg-[#1B4332] text-white border-[#1B4332] shadow-sm"
                      : "bg-white text-[#1B4332] border-stone-200 hover:border-[#1B4332]"
                  }`}
                >
                  {cat}
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
