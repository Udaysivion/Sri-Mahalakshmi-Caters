/**
 * Catering Inquiries Repository
 * Data Access Layer for Large Catering & Event Bookings on PostgreSQL
 */

const { query } = require('../../config/database');

class CateringRepository {
  async createOrUpdate(cateringData) {
    const {
      inquiryId,
      customerName,
      phone,
      eventType,
      guests,
      date,
      message,
      status
    } = cateringData;

    const sql = `
      INSERT INTO catering_inquiries
        (inquiry_id, customer_name, phone, event_type, guests, date, message, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (inquiry_id) DO UPDATE SET
        customer_name = EXCLUDED.customer_name,
        phone = EXCLUDED.phone,
        event_type = EXCLUDED.event_type,
        guests = EXCLUDED.guests,
        date = EXCLUDED.date,
        message = EXCLUDED.message,
        status = EXCLUDED.status
      RETURNING *
    `;

    const values = [
      inquiryId,
      customerName,
      phone,
      eventType,
      guests,
      date,
      message,
      status
    ];

    const result = await query(sql, values);
    return result.rows[0];
  }

  async findAll() {
    const sql = 'SELECT * FROM catering_inquiries ORDER BY created_at DESC';
    const result = await query(sql);
    return result.rows;
  }

  async updateStatus(inquiryId, status) {
    const sql = 'UPDATE catering_inquiries SET status = $1 WHERE inquiry_id = $2 RETURNING *';
    const result = await query(sql, [status, inquiryId]);
    return result.rows[0] || null;
  }
}

module.exports = new CateringRepository();
