import { ValidationError } from '../../../shared/errors/AppError.js';

export const CateringStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUOTED: 'QUOTED',
  CONFIRMED: 'CONFIRMED',
  DECLINED: 'DECLINED',
};

export class CateringInquiry {
  constructor({
    id = null,
    name,
    phone,
    eventType = 'Wedding/Reception',
    guestCount = 50,
    eventDate,
    message = '',
    status = CateringStatus.NEW,
    createdAt = null,
    updatedAt = null,
  }) {
    this.validate(name, phone, eventDate, guestCount);

    this.id = id;
    this.name = name.trim();
    this.phone = phone.trim();
    this.eventType = eventType;
    this.guestCount = parseInt(guestCount, 10) || 0;
    this.eventDate = eventDate;
    this.message = message ? message.trim() : '';
    this.status = status.toUpperCase();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validate(name, phone, eventDate, guestCount) {
    if (!name || !name.trim()) {
      throw new ValidationError('Name is required for catering inquiry');
    }
    if (!phone || !phone.trim() || phone.trim().length < 7) {
      throw new ValidationError('Valid contact phone number is required');
    }
    if (!eventDate) {
      throw new ValidationError('Event date is required');
    }
    const count = parseInt(guestCount, 10);
    if (isNaN(count) || count <= 0) {
      throw new ValidationError('Estimated guest count must be a positive number');
    }
  }

  updateStatus(newStatus) {
    const valid = Object.values(CateringStatus);
    if (!valid.includes(newStatus)) {
      throw new ValidationError(`Invalid catering status: ${newStatus}`);
    }
    this.status = newStatus;
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      eventType: this.eventType,
      guestCount: this.guestCount,
      eventDate: this.eventDate,
      message: this.message,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
