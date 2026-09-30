import apiClient from '@/core/api/apiClient';

export const galleryApi = {
  getGallery: async (category = 'All') => {
    try {
      const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
      const response = await apiClient.get(`/gallery${query}`);
      return response?.data || { gallery: [], dishes: [], all: [] };
    } catch (err) {
      console.warn('Backend gallery API unavailable:', err.message);
      return { gallery: [], dishes: [], all: [] };
    }
  },

  createItem: async (data) => {
    return apiClient.post('/gallery', data);
  },

  deleteItem: async (id) => {
    return apiClient.delete(`/gallery/${id}`);
  },
};

export default galleryApi;
