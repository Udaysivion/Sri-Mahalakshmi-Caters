import { Reservation } from '../domain/Reservation.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async createReservation(payload) {
    const reservation = new Reservation({
      name: payload.name,
      phone: payload.phone,
      reservationDate: payload.date || payload.reservationDate,
      reservationTime: payload.time || payload.reservationTime,
      guests: payload.guests,
      specialRequests: payload.message || payload.specialRequests,
    });

    const created = await this.reservationRepository.create(reservation);
    return created.toDTO();
  }

  async getReservationById(id) {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundError(`Reservation with ID ${id}`);
    }
    return reservation.toDTO();
  }

  async listReservations(filters) {
    const reservations = await this.reservationRepository.findAll(filters);
    return reservations.map((r) => r.toDTO());
  }

  async updateStatus(id, newStatus) {
    const existing = await this.reservationRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Reservation with ID ${id}`);
    }

    existing.updateStatus(newStatus);
    const updated = await this.reservationRepository.updateStatus(id, existing.status);
    return updated.toDTO();
  }
}
