/**
 * Feature: Bookings Module
 * Public API
 */

export {
  submitDiningReservation,
  submitCateringInquiry,
  fetchAllDiningReservations,
  fetchAllCateringInquiries,
  updateLocalDiningStatus,
  updateLocalCateringStatus
} from './services/bookingService';
