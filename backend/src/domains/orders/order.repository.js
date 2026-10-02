/**
 * Orders Repository
 * Data Access Layer for Food Orders on PostgreSQL
 */

const { query } = require('../../config/database');

class OrderRepository {
  async createOrUpdate(orderData) {
    const {
      orderId,
      customerName,
      phone,
      address,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
      paymentId
    } = orderData;

    const sql = `
      INSERT INTO orders 
        (order_id, customer_name, phone, address, items, total_amount, payment_method, payment_status, payment_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (order_id) DO UPDATE SET
        customer_name = EXCLUDED.customer_name,
        phone = EXCLUDED.phone,
        address = EXCLUDED.address,
        items = EXCLUDED.items,
        total_amount = EXCLUDED.total_amount,
        payment_method = EXCLUDED.payment_method,
        payment_status = EXCLUDED.payment_status,
        payment_id = EXCLUDED.payment_id
      RETURNING *
    `;

    const values = [
      orderId,
      customerName,
      phone,
      address || '',
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
      paymentId
    ];

    const result = await query(sql, values);
    return result.rows[0];
  }

  async findAll() {
    const sql = 'SELECT * FROM orders ORDER BY created_at DESC';
    const result = await query(sql);
    return result.rows;
  }

  async findByOrderId(orderId) {
    const sql = 'SELECT * FROM orders WHERE order_id = $1';
    const result = await query(sql, [orderId]);
    return result.rows[0] || null;
  }

  async updateStatus(orderId, paymentStatus) {
    const sql = 'UPDATE orders SET payment_status = $1 WHERE order_id = $2 RETURNING *';
    const result = await query(sql, [paymentStatus, orderId]);
    return result.rows[0] || null;
  }
}

module.exports = new OrderRepository();
