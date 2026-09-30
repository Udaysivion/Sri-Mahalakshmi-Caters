import apiClient from '@/core/api/apiClient';

export const orderApi = {
  /**
   * Place an order with delivery details and cart items
   */
  async placeOrder(orderPayload) {
    const response = await apiClient.post('/orders', orderPayload);
    return response.data;
  },

  /**
   * Track order by Order Number (e.g. SMK-24819)
   */
  async trackOrder(orderNumber) {
    const response = await apiClient.get(`/orders/track/${orderNumber}`);
    return response.data;
  },

  /**
   * Get order by ID
   */
  async getOrderById(id) {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  /**
   * Get all orders with optional filter by status or phone
   */
  async getAllOrders(filters = {}) {
    const params = new URLSearchParams(filters);
    const qs = params.toString();
    const endpoint = `/orders${qs ? `?${qs}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  /**
   * Update order status (PENDING, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED)
   */
  async updateOrderStatus(id, status) {
    const response = await apiClient.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export default orderApi;
