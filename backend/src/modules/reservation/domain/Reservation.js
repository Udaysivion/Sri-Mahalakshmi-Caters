import { ValidationError } from '../../../shared/errors/AppError.js';

export const ReservationStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
};

export class Reservation {
  constructor({
    id = null,
    name,
    phone,
    reservationDate,
    reservationTime,
    guests = '1-2 People',
    specialRequests = '',
    status = ReservationStatus.PENDING,
    createdAt = null,
    updatedAt = null,
  }) {
    this.validate(name, phone, reservationDate, reservationTime);

    this.id = id;
    this.name = name.trim();
    this.phone = phone.trim();
    this.reservationDate = reservationDate;
    this.reservationTime = reservationTime;
    this.guests = guests || '1-2 People';
    this.specialRequests = specialRequests ? specialRequests.trim() : '';
    this.status = status.toUpperCase();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validate(name, phone, reservationDate, reservationTime) {
    if (!name || !name.trim()) {
      throw new ValidationError('Guest name is required for table reservation');
    }
    if (!phone || !phone.trim() || phone.trim().length < 7) {
      throw new ValidationError('Valid contact phone number is required');
    }
    if (!reservationDate) {
      throw new ValidationError('Reservation date is required');
    }
    if (!reservationTime) {
      throw new ValidationError('Reservation time is required');
    }
  }

  updateStatus(newStatus) {
    const valid = Object.values(ReservationStatus);
    if (!valid.includes(newStatus)) {
      throw new ValidationError(`Invalid reservation status: ${newStatus}`);
    }
    this.status = newStatus;
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      reservationDate: this.reservationDate,
      reservationTime: this.reservationTime,
      guests: this.guests,
      specialRequests: this.specialRequests,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
