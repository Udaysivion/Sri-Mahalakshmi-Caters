import { query, getClient } from '../../../config/database.js';
import { Order, OrderItem } from '../domain/Order.js';
import { IOrderRepository } from '../domain/IOrderRepository.js';

export class PostgresOrderRepository extends IOrderRepository {
  mapRowToEntity(orderRow, itemRows = []) {
    if (!orderRow) return null;

    const items = itemRows.map(
      (item) =>
        new OrderItem({
          menuItemId: item.menu_item_id,
          name: item.item_name,
          unitPrice: parseFloat(item.unit_price),
          quantity: item.quantity,
        })
    );

    return new Order({
      id: orderRow.id,
      orderNumber: orderRow.order_number,
      customerName: orderRow.customer_name,
      phone: orderRow.phone,
      deliveryAddress: orderRow.delivery_address,
      paymentMethod: orderRow.payment_method,
      paymentStatus: orderRow.payment_status,
      orderStatus: orderRow.order_status,
      deliveryFee: parseFloat(orderRow.delivery_fee),
      notes: orderRow.notes,
      items,
      createdAt: orderRow.created_at,
      updatedAt: orderRow.updated_at,
    });
  }

  async create(order) {
    const client = await getClient();
    try {
      await client.query('BEGIN');

      const insertOrderSql = `
        INSERT INTO orders (
          order_number, customer_name, phone, delivery_address,
          payment_method, payment_status, order_status,
          subtotal, delivery_fee, total_amount, notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;
      const orderParams = [
        order.orderNumber,
        order.customerName,
        order.phone,
        order.deliveryAddress,
        order.paymentMethod,
        order.paymentStatus,
        order.orderStatus,
        order.subtotal,
        order.deliveryFee,
        order.totalAmount,
        order.notes,
      ];

      const orderResult = await client.query(insertOrderSql, orderParams);
      const createdOrderRow = orderResult.rows[0];

      const createdItems = [];
      for (const item of order.items) {
        const insertItemSql = `
          INSERT INTO order_items (order_id, menu_item_id, item_name, unit_price, quantity, item_total)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `;
        const itemParams = [
          createdOrderRow.id,
          item.menuItemId,
          item.name,
          item.unitPrice,
          item.quantity,
          item.total,
        ];
        const itemResult = await client.query(insertItemSql, itemParams);
        createdItems.push(itemResult.rows[0]);
      }

      await client.query('COMMIT');
      return this.mapRowToEntity(createdOrderRow, createdItems);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async findById(id) {
    const orderResult = await query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderResult.rows.length === 0) return null;

    const itemsResult = await query('SELECT * FROM order_items WHERE order_id = $1', [id]);
    return this.mapRowToEntity(orderResult.rows[0], itemsResult.rows);
  }

  async findByOrderNumber(orderNumber) {
    const orderResult = await query('SELECT * FROM orders WHERE LOWER(order_number) = LOWER($1)', [orderNumber]);
    if (orderResult.rows.length === 0) return null;

    const itemsResult = await query('SELECT * FROM order_items WHERE order_id = $1', [orderResult.rows[0].id]);
    return this.mapRowToEntity(orderResult.rows[0], itemsResult.rows);
  }

  async findAll({ status, phone, limit = 50, offset = 0 } = {}) {
    let sql = 'SELECT * FROM orders WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (status) {
      sql += ` AND UPPER(order_status) = UPPER($${paramIndex++})`;
      params.push(status);
    }

    if (phone) {
      sql += ` AND phone LIKE $${paramIndex++}`;
      params.push(`%${phone}%`);
    }

    sql += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);

    const orderResults = await query(sql, params);
    if (orderResults.rows.length === 0) return [];

    const orderIds = orderResults.rows.map((r) => r.id);
    const itemsResult = await query(
      `SELECT * FROM order_items WHERE order_id = ANY($1::int[])`,
      [orderIds]
    );

    const itemsByOrderId = {};
    for (const item of itemsResult.rows) {
      if (!itemsByOrderId[item.order_id]) itemsByOrderId[item.order_id] = [];
      itemsByOrderId[item.order_id].push(item);
    }

    return orderResults.rows.map((row) =>
      this.mapRowToEntity(row, itemsByOrderId[row.id] || [])
    );
  }

  async updateStatus(id, newStatus) {
    const result = await query(
      `UPDATE orders
       SET order_status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [newStatus, id]
    );
    if (result.rows.length === 0) return null;

    const itemsResult = await query('SELECT * FROM order_items WHERE order_id = $1', [id]);
    return this.mapRowToEntity(result.rows[0], itemsResult.rows);
  }
}
