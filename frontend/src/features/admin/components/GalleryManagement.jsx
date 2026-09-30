import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, Trash2, RefreshCw, X, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import galleryApi from '@/features/gallery/api/galleryApi';

const CATEGORIES = ['Kitchen', 'Events', 'Catering', 'Dishes'];

export const GalleryManagement = () => {
  const [gallery, setGallery] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Kitchen',
    imageUrl: '',
  });

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await galleryApi.getGallery('All');
      setGallery(data.gallery || []);
      setDishes(data.dishes || []);
    } catch {
      toast.error('Failed to load gallery items from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.imageUrl.trim()) {
      toast.error('Please enter title and image URL');
      return;
    }

    setSubmitting(true);
    try {
      await galleryApi.createItem(form);
      toast.success('Gallery moment added to database! 📸');
      setIsModalOpen(false);
      setForm({ title: '', category: 'Kitchen', imageUrl: '' });
      fetchGallery();
    } catch (err) {
      toast.error(err.message || 'Failed to add image');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery photo from database?')) return;
    try {
      await galleryApi.deleteItem(id);
      toast.success('Gallery photo deleted');
      fetchGallery();
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gallery Showcase Management
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Manage photo moments and food highlights displayed on the public Gallery page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchGallery}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#255b44] rounded-xl shadow-md transition-all"
          >
            <Plus size={16} /> Add Gallery Photo
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Custom Gallery Photos</p>
          <p className="text-2xl font-bold text-[#1B4332] mt-1">{gallery.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Products in Gallery</p>
          <p className="text-2xl font-bold text-[#D4731A] mt-1">{dishes.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Total Live Gallery Photos</p>
          <p className="text-2xl font-bold text-stone-900 mt-1">{gallery.length + dishes.length}</p>
        </div>
      </div>

      {/* Grid of gallery moments */}
      {loading ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-stone-200">
          <RefreshCw size={24} className="animate-spin text-[#D4731A] mx-auto mb-2" />
          <p className="text-sm text-stone-500">Loading gallery photos from database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-lg shadow-sm transition-all"
                  title="Delete image"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold text-stone-800 truncate" title={item.title}>
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5">PostgreSQL ID #{item.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Add Gallery Photo
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">Saves directly into your Neon PostgreSQL database.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 p-2">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Chef Hand-tossed Parotta"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-[#1B4332]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                {form.imageUrl && (
                  <div className="rounded-xl overflow-hidden aspect-video border border-stone-200">
                    <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#255b44] transition-all flex items-center gap-2"
                  >
                    {submitting ? 'Saving to DB...' : 'Save to Gallery'}
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

export default GalleryManagement;
