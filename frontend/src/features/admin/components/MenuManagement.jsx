import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, Edit2, Check, X, Sparkles, Utensils, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import menuApi from '@/features/menu/api/menuApi';

const PRESET_IMAGES = [
  { label: 'Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600' },
  { label: 'Thali', url: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=600' },
  { label: 'Chicken Fry', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600' },
  { label: 'Paneer Masala', url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600' },
  { label: 'Chinese / Wok', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600' },
  { label: 'Dessert', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600' },
];

export const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    category: 'Biryani',
    price: '',
    type: 'Veg',
    imageUrl: PRESET_IMAGES[0].url,
    description: '',
    isPopular: false,
    isSignature: false,
    isAvailable: true,
  };
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await menuApi.getMenuItems();
      setItems(data || []);
    } catch (err) {
      console.warn('Could not fetch menu from DB:', err.message);
      toast.error('Unable to fetch live dishes from PostgreSQL DB. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      type: item.type,
      imageUrl: item.imageUrl || '',
      description: item.description || '',
      isPopular: Boolean(item.isPopular),
      isSignature: Boolean(item.isSignature),
      isAvailable: Boolean(item.isAvailable),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error('Name and Price are required');
      return;
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        // Update in PostgreSQL
        await menuApi.updateMenuItem(editingItem.id, formData);
        toast.success(`Updated "${formData.name}" in database! ✨`);
      } else {
        // Create in PostgreSQL
        await menuApi.createMenuItem(formData);
        toast.success(`Added "${formData.name}" to database! 🍛`);
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      toast.error(err.message || 'Operation failed. Check backend connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the database?`)) return;
    try {
      await menuApi.deleteMenuItem(id);
      toast.success(`Removed "${name}" from database.`);
      fetchItems();
    } catch (err) {
      toast.error(err.message || 'Failed to delete item.');
    }
  };

  const handleToggleAvailability = async (item) => {
    try {
      await menuApi.updateMenuItem(item.id, { isAvailable: !item.isAvailable });
      toast.success(`${item.name} is now ${!item.isAvailable ? 'In Stock' : 'Out of Stock'}`);
      fetchItems();
    } catch (err) {
      toast.error('Failed to update availability status.');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(items.map((i) => i.category))];

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-900/10 shadow-sm">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search dishes by name or ingredient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:border-[#D4731A]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#D4731A]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
            className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
            title="Refresh database records"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-[#1B4332] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#255b44] transition-all shadow-md"
          >
            <Plus size={16} /> Add New Dish
          </button>
        </div>
      </div>

      {/* Dishes Table */}
      <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-bold text-base text-[#1B4332]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dishes in PostgreSQL Database ({filteredItems.length})
          </h3>
          <span className="text-xs text-stone-500 font-medium">Real-time DB synced</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-stone-400 flex flex-col items-center gap-3">
            <RefreshCw size={24} className="animate-spin text-[#D4731A]" />
            <p className="text-sm">Fetching dishes from database...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-stone-400">
            <Utensils size={36} className="mx-auto mb-2 opacity-40 text-stone-300" />
            <p className="text-sm font-semibold">No dishes found matching criteria.</p>
            <p className="text-xs mt-1">Click "Add New Dish" to add dishes to your PostgreSQL database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100">
                  <th className="py-3.5 px-4">Dish</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                        />
                        <div>
                          <p className="font-bold text-stone-800 leading-snug">{item.name}</p>
                          <p className="text-xs text-stone-500 line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-600">{item.category}</td>
                    <td className="py-3 px-4 font-bold text-[#1B4332]">₹{item.price}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.type === 'Veg' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.isSignature && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-800 text-white">Signature</span>
                        )}
                        {item.isPopular && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#D4731A] text-white">Popular</span>
                        )}
                        {!item.isSignature && !item.isPopular && (
                          <span className="text-xs text-stone-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${item.isAvailable ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' : 'bg-stone-100 text-stone-500 border-stone-300 hover:bg-stone-200'}`}
                      >
                        {item.isAvailable ? '● In Stock' : '○ Out of Stock'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg border border-stone-200 hover:border-[#D4731A] hover:text-[#D4731A] text-stone-600 transition-colors"
                          title="Edit Dish"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-1.5 rounded-lg border border-stone-200 hover:border-rose-500 hover:text-rose-600 text-stone-600 transition-colors"
                          title="Delete Dish"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
            >
              <div className="p-6 bg-[#112A1F] text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {editingItem ? 'Edit Dish in Database' : 'Add New Dish to PostgreSQL'}
                  </h3>
                  <p className="text-xs text-white/70">
                    {editingItem ? `Updating ID #${editingItem.id}` : 'Item will be instantly available on live menu'}
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Dish Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Gongura Mutton Biryani"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4731A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D4731A]"
                    >
                      <option value="Biryani">Biryani</option>
                      <option value="South Indian">South Indian</option>
                      <option value="Starters">Starters</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Tandoor">Tandoor</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Price (₹) *</label>
                    <input
                      required
                      type="number"
                      step="1"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="280"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4731A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Diet Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D4731A]"
                    >
                      <option value="Veg">Veg (🟢)</option>
                      <option value="Non-Veg">Non-Veg (🔴)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4731A]"
                  />
                  <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                    <span className="text-[11px] text-stone-400 whitespace-nowrap">Presets:</span>
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 whitespace-nowrap"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">Sensory Description</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Slow-cooked authentic spices, layered fragrant rice, garnishing..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4731A] resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-stone-200 hover:bg-stone-50">
                    <input
                      type="checkbox"
                      checked={formData.isSignature}
                      onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                      className="rounded text-[#1B4332]"
                    />
                    <span className="text-xs font-bold text-stone-700">Signature</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-stone-200 hover:bg-stone-50">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="rounded text-[#D4731A]"
                    />
                    <span className="text-xs font-bold text-stone-700">Popular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-stone-200 hover:bg-stone-50">
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <span className="text-xs font-bold text-stone-700">In Stock</span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#1B4332] hover:bg-[#255b44] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Saving to Database...' : editingItem ? 'Save Changes' : 'Insert into Database'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuManagement;
