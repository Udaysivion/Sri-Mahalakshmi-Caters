import apiClient from '@/core/api/apiClient';

export const adminApi = {
  login: async (username, password) => {
    const res = await apiClient.post('/admin/login', { username, password });
    if (res?.data?.token) {
      localStorage.setItem('admin_token', res.data.token);
      localStorage.setItem('admin_user', JSON.stringify(res.data.user));
    }
    return res;
  },

  verify: async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return false;
    try {
      const res = await apiClient.get('/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res?.success;
    } catch {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  getCurrentUser: () => {
    try {
      const u = localStorage.getItem('admin_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  }
};

export default adminApi;
