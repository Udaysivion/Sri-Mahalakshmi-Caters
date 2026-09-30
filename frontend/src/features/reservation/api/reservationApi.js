import apiClient from '@/core/api/apiClient';

export const reservationApi = {
  /**
   * Request a table reservation
   */
  async createReservation(reservationPayload) {
    const response = await apiClient.post('/reservations', reservationPayload);
    return response.data;
  },

  /**
   * Get list of reservations (with optional filters)
   */
  async getReservations(filters = {}) {
    const params = new URLSearchParams(filters);
    const endpoint = `/reservations${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  /**
   * Update reservation status (PENDING, CONFIRMED, CANCELLED, COMPLETED)
   */
  async updateReservationStatus(id, status) {
    const response = await apiClient.patch(`/reservations/${id}/status`, { status });
    return response.data;
  },
};

export default reservationApi;
