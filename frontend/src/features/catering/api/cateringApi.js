import apiClient from '@/core/api/apiClient';

export const cateringApi = {
  /**
   * Submit an event catering inquiry
   */
  async submitInquiry(inquiryPayload) {
    const response = await apiClient.post('/catering', inquiryPayload);
    return response.data;
  },

  /**
   * Get list of catering inquiries
   */
  async getInquiries(filters = {}) {
    const params = new URLSearchParams(filters);
    const endpoint = `/catering${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  /**
   * Update catering inquiry status (NEW, CONTACTED, QUOTED, CONFIRMED, DECLINED)
   */
  async updateCateringStatus(id, status) {
    const response = await apiClient.patch(`/catering/${id}/status`, { status });
    return response.data;
  },
};

export default cateringApi;
