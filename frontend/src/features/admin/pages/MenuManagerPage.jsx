import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuData } from '../../../hooks/useMenuData';
import { Plus, Edit2, Trash2, Image as ImageIcon, Save, X, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import LogoLoader from '../../../components/common/LogoLoader';
import toast from 'react-hot-toast';

export const MenuManagerPage = () => {
  const { menuItems, loading } = useMenuData();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form state
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    price: '',
    img: ''
  });

  const categories = ['All', ...new Set(menuItems.map(item => item.cat || item.category || 'Other').filter(Boolean))];

  const filteredItems = menuItems.filter(item => {
    const itemName = item.name || '';
    const itemCat = item.cat || item.category || 'Other';
    
    const matchesSearch = itemName.toLowerCase().includes(search.toLowerCase()) || 
                          itemCat.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || itemCat === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
    
    if (!scriptUrl) {
      setIsSubmitting(false);
      toast.error(
        (t) => (
          <div className="flex flex-col gap-2">
            <p className="font-bold">Missing Apps Script URL!</p>
            <p className="text-xs opacity-90">Please set VITE_GOOGLE_APPS_SCRIPT_URL in your .env file to enable writing to Google Sheets.</p>
          </div>
        ), 
        { duration: 5000, style: { minWidth: '300px' } }
      );
      return;
    }

    try {
      const urlEncodedData = new URLSearchParams(formData).toString();

      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData,
      });

      // Because of no-cors, we can't read the exact response, so we assume success if no error was thrown
      toast.success('Item added to Google Sheet! Refresh the page to see changes.');
      setIsAddModalOpen(false);
      setFormData({ category: '', name: '', price: '', img: '' });
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item to Google Sheet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <div>
          <h2 className="text-xl font-extrabold text-[#1B4332] flex items-center gap-2">
            Menu Database Manager
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Live synchronization with your Google Sheet CMS
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#DCA145] hover:bg-[#B05D10] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
        >
          <Plus size={16} /> Add New Dish
        </button>
      </div>

      {/* Setup Instructions Warning */}
      {!import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
          <AlertCircle size={20} className="shrink-0 text-amber-600" />
          <div>
            <p className="font-bold mb-1">Write access is not yet configured</p>
            <p className="opacity-90 leading-relaxed">
              To allow this admin panel to add items directly to your Google Sheet, you need to create a Google Apps Script deployment and add the URL to your <code className="bg-amber-100 px-1 rounded">.env</code> file as <code className="bg-amber-100 px-1 rounded">VITE_GOOGLE_APPS_SCRIPT_URL</code>.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search by dish name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 focus:border-[#DCA145] focus:ring-2 focus:ring-[#DCA145]/20 outline-none transition-all shadow-sm"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-stone-200 focus:border-[#DCA145] focus:ring-2 focus:ring-[#DCA145]/20 outline-none transition-all shadow-sm bg-white text-stone-700 min-w-[200px]"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Menu Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <LogoLoader size="sm" message="Loading Google Sheet..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Dish Name</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Price (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredItems.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      {item.img ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg border border-dashed border-stone-300 bg-stone-50 flex items-center justify-center text-stone-400">
                          <ImageIcon size={18} />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-[#1B4332]">{item.name}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-semibold">
                        {item.category || item.cat}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-black text-[#DCA145]">₹{item.price}</p>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-stone-500">
                      No menu items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-3xl p-6 sm:p-8 z-[101] shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#1B4332]">Add Menu Item</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider">Category</label>
                    <button type="button" onClick={() => setFormData({...formData, category: ''})} className="text-[10px] font-bold text-[#DCA145] hover:underline">
                      Clear / New
                    </button>
                  </div>
                  <div className="relative">
                    <input 
                      required 
                      type="text" 
                      list="category-options"
                      placeholder="Select existing or type new category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#DCA145] focus:ring-2 focus:ring-[#DCA145]/20 outline-none transition-all text-sm font-semibold text-[#1B4332]"
                    />
                    <datalist id="category-options">
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Dish Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Chicken Dum Biryani"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#DCA145] focus:ring-2 focus:ring-[#DCA145]/20 outline-none transition-all text-sm font-semibold text-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Price (₹)</label>
                  <input 
                    required 
                    type="number" 
                    min="0"
                    placeholder="e.g. 250"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#DCA145] focus:ring-2 focus:ring-[#DCA145]/20 outline-none transition-all text-sm font-semibold text-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">Image URL</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/image.jpg"
                    value={formData.img}
                    onChange={(e) => setFormData({...formData, img: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#DCA145] focus:ring-2 focus:ring-[#DCA145]/20 outline-none transition-all text-sm font-semibold text-[#1B4332]"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">Paste a direct link to an image (optional).</p>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#1B4332] hover:bg-[#112A1F] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <><Save size={18} /> Save to Google Sheet</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
