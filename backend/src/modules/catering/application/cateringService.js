import { CateringInquiry } from '../domain/CateringInquiry.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class CateringService {
  constructor(cateringRepository) {
    this.cateringRepository = cateringRepository;
  }

  async submitInquiry(payload) {
    const inquiry = new CateringInquiry({
      name: payload.name,
      phone: payload.phone,
      eventType: payload.eventType || 'Wedding/Reception',
      guestCount: payload.guests || payload.guestCount,
      eventDate: payload.date || payload.eventDate,
      message: payload.message || payload.notes,
    });

    const created = await this.cateringRepository.create(inquiry);
    return created.toDTO();
  }

  async getInquiryById(id) {
    const inquiry = await this.cateringRepository.findById(id);
    if (!inquiry) {
      throw new NotFoundError(`Catering inquiry with ID ${id}`);
    }
    return inquiry.toDTO();
  }

  async listInquiries(filters) {
    const inquiries = await this.cateringRepository.findAll(filters);
    return inquiries.map((i) => i.toDTO());
  }

  async updateStatus(id, newStatus) {
    const existing = await this.cateringRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Catering inquiry with ID ${id}`);
    }

    existing.updateStatus(newStatus);
    const updated = await this.cateringRepository.updateStatus(id, existing.status);
    return updated.toDTO();
  }
}
