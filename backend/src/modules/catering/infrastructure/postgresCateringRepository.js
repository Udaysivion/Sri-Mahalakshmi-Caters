import { query } from '../../../config/database.js';
import { CateringInquiry } from '../domain/CateringInquiry.js';
import { ICateringRepository } from '../domain/ICateringRepository.js';

export class PostgresCateringRepository extends ICateringRepository {
  mapRowToEntity(row) {
    if (!row) return null;
    return new CateringInquiry({
      id: row.id,
      name: row.name,
      phone: row.phone,
      eventType: row.event_type,
      guestCount: row.guest_count,
      eventDate: row.event_date,
      message: row.message,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  async create(inquiry) {
    const sql = `
      INSERT INTO catering_inquiries (name, phone, event_type, guest_count, event_date, message, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const params = [
      inquiry.name,
      inquiry.phone,
      inquiry.eventType,
      inquiry.guestCount,
      inquiry.eventDate,
      inquiry.message,
      inquiry.status,
    ];

    const result = await query(sql, params);
    return this.mapRowToEntity(result.rows[0]);
  }

  async findById(id) {
    const result = await query('SELECT * FROM catering_inquiries WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return this.mapRowToEntity(result.rows[0]);
  }

  async findAll({ eventType, status, phone } = {}) {
    let sql = 'SELECT * FROM catering_inquiries WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (eventType) {
      sql += ` AND LOWER(event_type) = LOWER($${paramIndex++})`;
      params.push(eventType);
    }

    if (status) {
      sql += ` AND UPPER(status) = UPPER($${paramIndex++})`;
      params.push(status);
    }

    if (phone) {
      sql += ` AND phone LIKE $${paramIndex++}`;
      params.push(`%${phone}%`);
    }

    sql += ' ORDER BY event_date ASC, created_at DESC';

    const result = await query(sql, params);
    return result.rows.map((r) => this.mapRowToEntity(r));
  }

  async updateStatus(id, newStatus) {
    const result = await query(
      `UPDATE catering_inquiries
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [newStatus, id]
    );
    if (result.rows.length === 0) return null;
    return this.mapRowToEntity(result.rows[0]);
  }
}
