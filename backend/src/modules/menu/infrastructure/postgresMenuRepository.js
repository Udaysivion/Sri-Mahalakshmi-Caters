import { query } from '../../../config/database.js';
import { MenuItem } from '../domain/MenuItem.js';
import { IMenuRepository } from '../domain/IMenuRepository.js';

export class PostgresMenuRepository extends IMenuRepository {
  mapRowToEntity(row) {
    if (!row) return null;
    return new MenuItem({
      id: row.id,
      name: row.name,
      category: row.category,
      price: row.price,
      type: row.type,
      imageUrl: row.image_url,
      description: row.description,
      isPopular: row.is_popular,
      isSignature: row.is_signature,
      isAvailable: row.is_available,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  async findAll({ category, type, search, isAvailable } = {}) {
    let sql = 'SELECT * FROM menu_items WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (isAvailable !== undefined && isAvailable !== null) {
      sql += ` AND is_available = $${paramIndex++}`;
      params.push(isAvailable);
    }

    if (category && category !== 'All') {
      sql += ` AND LOWER(category) = LOWER($${paramIndex++})`;
      params.push(category);
    }

    if (type && type !== 'All') {
      sql += ` AND type = $${paramIndex++}`;
      params.push(type);
    }

    if (search && search.trim() !== '') {
      sql += ` AND (LOWER(name) LIKE $${paramIndex} OR LOWER(description) LIKE $${paramIndex})`;
      params.push(`%${search.trim().toLowerCase()}%`);
      paramIndex++;
    }

    sql += ' ORDER BY category ASC, id ASC';

    const result = await query(sql, params);
    return result.rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id) {
    const result = await query('SELECT * FROM menu_items WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return this.mapRowToEntity(result.rows[0]);
  }

  async create(menuItem) {
    const sql = `
      INSERT INTO menu_items (name, category, price, type, image_url, description, is_popular, is_signature, is_available)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const params = [
      menuItem.name,
      menuItem.category,
      menuItem.price,
      menuItem.type,
      menuItem.imageUrl,
      menuItem.description,
      menuItem.isPopular,
      menuItem.isSignature,
      menuItem.isAvailable,
    ];

    const result = await query(sql, params);
    return this.mapRowToEntity(result.rows[0]);
  }

  async update(id, updateData) {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updated = new MenuItem({
      id,
      name: updateData.name ?? existing.name,
      category: updateData.category ?? existing.category,
      price: updateData.price ?? existing.price,
      type: updateData.type ?? existing.type,
      imageUrl: updateData.imageUrl ?? existing.imageUrl,
      description: updateData.description ?? existing.description,
      isPopular: updateData.isPopular ?? existing.isPopular,
      isSignature: updateData.isSignature ?? existing.isSignature,
      isAvailable: updateData.isAvailable ?? existing.isAvailable,
    });

    const sql = `
      UPDATE menu_items
      SET name = $1, category = $2, price = $3, type = $4, image_url = $5,
          description = $6, is_popular = $7, is_signature = $8, is_available = $9,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
    `;
    const params = [
      updated.name,
      updated.category,
      updated.price,
      updated.type,
      updated.imageUrl,
      updated.description,
      updated.isPopular,
      updated.isSignature,
      updated.isAvailable,
      id,
    ];

    const result = await query(sql, params);
    return this.mapRowToEntity(result.rows[0]);
  }

  async delete(id) {
    const result = await query('DELETE FROM menu_items WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  }

  async getCategories() {
    const result = await query('SELECT DISTINCT category FROM menu_items ORDER BY category ASC');
    return result.rows.map((r) => r.category);
  }
}
