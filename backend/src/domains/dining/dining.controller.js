/**
 * Dining Controller
 * Handles HTTP requests and delegates to DiningService
 */

const diningService = require('./dining.service');

class DiningController {
  async create(req, res, next) {
    try {
      const reservation = await diningService.reserveTable(req.body);
      res.status(201).json({
        success: true,
        message: 'Dining table reservation confirmed and saved to PostgreSQL.',
        reservation
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const reservations = await diningService.getAllReservations();
      res.json({
        success: true,
        count: reservations.length,
        reservations
      });
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;
      const updated = await diningService.updateReservationStatus(bookingId, status);
      res.json({
        success: true,
        message: `Reservation #${bookingId} updated to ${status}`,
        reservation: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DiningController();
