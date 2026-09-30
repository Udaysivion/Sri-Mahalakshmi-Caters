import { ApiResponse } from '../../../shared/utils/apiResponse.js';

export class ReservationController {
  constructor(reservationService) {
    this.reservationService = reservationService;
  }

  create = async (req, res, next) => {
    try {
      const reservation = await this.reservationService.createReservation(req.body);
      return ApiResponse.created(
        res,
        reservation,
        'Table reservation requested successfully. We will call you to confirm shortly!'
      );
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const { date, status, phone } = req.query;
      const reservations = await this.reservationService.listReservations({ date, status, phone });
      return ApiResponse.success(res, reservations, 'Reservations retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const reservation = await this.reservationService.getReservationById(id);
      return ApiResponse.success(res, reservation, 'Reservation retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { status } = req.body;
      const updated = await this.reservationService.updateStatus(id, status);
      return ApiResponse.success(res, updated, 'Reservation status updated successfully');
    } catch (err) {
      next(err);
    }
  };
}
