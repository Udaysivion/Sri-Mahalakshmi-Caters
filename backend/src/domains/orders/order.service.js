/**
 * Orders Domain Service
 * Business logic for orders processing
 */

const orderRepository = require('./order.repository');

class OrderService {
  async placeOrder(payload) {
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
    } = payload;

    if (!customerName || !phone) {
      const error = new Error('Customer name and phone number are required to place an order.');
      error.statusCode = 400;
      throw error;
    }

    const generatedOrderId = orderId || `SMK-${Date.now().toString().slice(-6)}`;
    const serializedItems = typeof items === 'object' ? JSON.stringify(items) : String(items || '');

    const record = await orderRepository.createOrUpdate({
      orderId: generatedOrderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: (address || '').trim(),
      items: serializedItems,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentStatus || 'Pending',
      paymentId: paymentId || ''
    });

    return record;
  }

  async getAllOrders() {
    const rawOrders = await orderRepository.findAll();
    return rawOrders.map(row => ({
      orderId: row.order_id,
      customerName: row.customer_name,
      phone: row.phone,
      address: row.address,
      items: row.items,
      totalAmount: Number(row.total_amount),
      paymentMethod: row.payment_method,
      paymentStatus: row.payment_status,
      paymentId: row.payment_id,
      timestamp: row.created_at
    }));
  }

  async updateOrderStatus(orderId, paymentStatus) {
    if (!orderId || !paymentStatus) {
      const error = new Error('Order ID and new payment status are required.');
      error.statusCode = 400;
      throw error;
    }

    const updated = await orderRepository.updateStatus(orderId, paymentStatus);
    if (!updated) {
      const error = new Error(`Order #${orderId} was not found.`);
      error.statusCode = 404;
      throw error;
    }

    return updated;
  }
}

module.exports = new OrderService();
