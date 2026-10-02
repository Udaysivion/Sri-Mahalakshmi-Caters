/**
 * Catering Domain Service
 * Business logic for large events & catering inquiries
 */

const cateringRepository = require('./catering.repository');

class CateringService {
  async submitInquiry(payload) {
    const {
      inquiryId,
      customerName,
      phone,
      eventType,
      guests,
      date,
      message,
      status
    } = payload;

    if (!customerName || !phone) {
      const error = new Error('Customer name and contact phone are required for catering inquiries.');
      error.statusCode = 400;
      throw error;
    }

    const generatedInquiryId = inquiryId || `CAT-${Date.now().toString().slice(-6)}`;

    const record = await cateringRepository.createOrUpdate({
      inquiryId: generatedInquiryId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      eventType: eventType || 'Event',
      guests: guests || '50+ Guests',
      date: date || '',
      message: message || '',
      status: status || 'New'
    });

    return record;
  }

  async getAllInquiries() {
    const rows = await cateringRepository.findAll();
    return rows.map(row => ({
      inquiryId: row.inquiry_id,
      customerName: row.customer_name,
      phone: row.phone,
      eventType: row.event_type,
      guests: row.guests,
      date: row.date,
      message: row.message,
      status: row.status,
      timestamp: row.created_at
    }));
  }

  async updateInquiryStatus(inquiryId, status) {
    if (!inquiryId || !status) {
      const error = new Error('Inquiry ID and new status are required.');
      error.statusCode = 400;
      throw error;
    }

    const updated = await cateringRepository.updateStatus(inquiryId, status);
    if (!updated) {
      const error = new Error(`Inquiry #${inquiryId} was not found.`);
      error.statusCode = 404;
      throw error;
    }

    return updated;
  }
}

module.exports = new CateringService();
