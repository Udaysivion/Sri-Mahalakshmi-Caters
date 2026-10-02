/**
 * Dining Domain Service
 * Business logic for table reservations
 */

const diningRepository = require('./dining.repository');

class DiningService {
  async reserveTable(payload) {
    const {
      bookingId,
      customerName,
      phone,
      guests,
      date,
      time,
      message,
      status
    } = payload;

    if (!customerName || !phone) {
      const error = new Error('Guest name and phone number are required for table reservations.');
      error.statusCode = 400;
      throw error;
    }

    const generatedBookingId = bookingId || `DIN-${Date.now().toString().slice(-6)}`;

    const reservation = await diningRepository.createOrUpdate({
      bookingId: generatedBookingId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      guests: guests || '2 Guests',
      date: date || new Date().toISOString().split('T')[0],
      time: time || '12:30 PM',
      message: message || '',
      status: status || 'Pending'
    });

    return reservation;
  }

  async getAllReservations() {
    const rows = await diningRepository.findAll();
    return rows.map(row => ({
      bookingId: row.booking_id,
      customerName: row.customer_name,
      phone: row.phone,
      guests: row.guests,
      date: row.date,
      time: row.time,
      message: row.message,
      status: row.status,
      timestamp: row.created_at
    }));
  }

  async updateReservationStatus(bookingId, status) {
    if (!bookingId || !status) {
      const error = new Error('Booking ID and new status are required.');
      error.statusCode = 400;
      throw error;
    }

    const updated = await diningRepository.updateStatus(bookingId, status);
    if (!updated) {
      const error = new Error(`Reservation #${bookingId} was not found.`);
      error.statusCode = 404;
      throw error;
    }

    return updated;
  }
}

module.exports = new DiningService();
