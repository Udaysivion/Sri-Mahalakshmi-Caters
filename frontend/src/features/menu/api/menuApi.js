import apiClient from '@/core/api/apiClient';

export const menuApi = {
  /**
   * Fetch all menu items with optional category, type (Veg/Non-Veg), search query
   */
  async getMenuItems({ category, type, search } = {}) {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (type && type !== 'All') params.append('type', type);
    if (search && search.trim()) params.append('search', search.trim());

    const qs = params.toString();
    const endpoint = `/menu${qs ? `?${qs}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  /**
   * Fetch unique menu categories
   */
  async getCategories() {
    const response = await apiClient.get('/menu/categories');
    return response.data;
  },

  /**
   * Fetch single menu item by ID
   */
  async getMenuItemById(id) {
    const response = await apiClient.get(`/menu/${id}`);
    return response.data;
  },

  /**
   * Create a new menu item in PostgreSQL database
   */
  async createMenuItem(itemData) {
    const response = await apiClient.post('/menu', itemData);
    return response.data;
  },

  /**
   * Update an existing menu item in database
   */
  async updateMenuItem(id, itemData) {
    const response = await apiClient.put(`/menu/${id}`, itemData);
    return response.data;
  },

  /**
   * Delete a menu item from database
   */
  async deleteMenuItem(id) {
    const response = await apiClient.delete(`/menu/${id}`);
    return response.data;
  },
};

export default menuApi;
