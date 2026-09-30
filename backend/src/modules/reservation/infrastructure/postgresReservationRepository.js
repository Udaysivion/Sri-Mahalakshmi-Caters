import { query } from '../../../config/database.js';
import { Reservation } from '../domain/Reservation.js';
import { IReservationRepository } from '../domain/IReservationRepository.js';

export class PostgresReservationRepository extends IReservationRepository {
  mapRowToEntity(row) {
    if (!row) return null;
    return new Reservation({
      id: row.id,
      name: row.name,
      phone: row.phone,
      reservationDate: row.reservation_date,
      reservationTime: row.reservation_time,
      guests: row.guests,
      specialRequests: row.special_requests,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  async create(reservation) {
    const sql = `
      INSERT INTO reservations (name, phone, reservation_date, reservation_time, guests, special_requests, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const params = [
      reservation.name,
      reservation.phone,
      reservation.reservationDate,
      reservation.reservationTime,
      reservation.guests,
      reservation.specialRequests,
      reservation.status,
    ];

    const result = await query(sql, params);
    return this.mapRowToEntity(result.rows[0]);
  }

  async findById(id) {
    const result = await query('SELECT * FROM reservations WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return this.mapRowToEntity(result.rows[0]);
  }

  async findAll({ date, status, phone } = {}) {
    let sql = 'SELECT * FROM reservations WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (date) {
      sql += ` AND reservation_date = $${paramIndex++}`;
      params.push(date);
    }

    if (status) {
      sql += ` AND UPPER(status) = UPPER($${paramIndex++})`;
      params.push(status);
    }

    if (phone) {
      sql += ` AND phone LIKE $${paramIndex++}`;
      params.push(`%${phone}%`);
    }

    sql += ' ORDER BY reservation_date DESC, reservation_time DESC';

    const result = await query(sql, params);
    return result.rows.map((r) => this.mapRowToEntity(r));
  }

  async updateStatus(id, newStatus) {
    const result = await query(
      `UPDATE reservations
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [newStatus, id]
    );
    if (result.rows.length === 0) return null;
    return this.mapRowToEntity(result.rows[0]);
  }
}
