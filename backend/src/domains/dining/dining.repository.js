/**
 * Dining Reservations Repository
 * Data Access Layer for Table Reservations on PostgreSQL
 */

const { query } = require('../../config/database');

class DiningRepository {
  async createOrUpdate(diningData) {
    const {
      bookingId,
      customerName,
      phone,
      guests,
      date,
      time,
      message,
      status
    } = diningData;

    const sql = `
      INSERT INTO dining_reservations
        (booking_id, customer_name, phone, guests, date, time, message, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (booking_id) DO UPDATE SET
        customer_name = EXCLUDED.customer_name,
        phone = EXCLUDED.phone,
        guests = EXCLUDED.guests,
        date = EXCLUDED.date,
        time = EXCLUDED.time,
        message = EXCLUDED.message,
        status = EXCLUDED.status
      RETURNING *
    `;

    const values = [
      bookingId,
      customerName,
      phone,
      guests,
      date,
      time,
      message,
      status
    ];

    const result = await query(sql, values);
    return result.rows[0];
  }

  async findAll() {
    const sql = 'SELECT * FROM dining_reservations ORDER BY created_at DESC';
    const result = await query(sql);
    return result.rows;
  }

  async updateStatus(bookingId, status) {
    const sql = 'UPDATE dining_reservations SET status = $1 WHERE booking_id = $2 RETURNING *';
    const result = await query(sql, [status, bookingId]);
    return result.rows[0] || null;
  }
}

module.exports = new DiningRepository();
