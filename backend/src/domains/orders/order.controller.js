/**
 * Orders Controller
 * Handles HTTP requests and delegates to OrderService
 */

const orderService = require('./order.service');

class OrderController {
  async create(req, res, next) {
    try {
      const order = await orderService.placeOrder(req.body);
      res.status(201).json({
        success: true,
        message: 'Order placed and saved to PostgreSQL successfully.',
        order
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      res.json({
        success: true,
        count: orders.length,
        orders
      });
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { orderId } = req.params;
      const { paymentStatus } = req.body;
      const updated = await orderService.updateOrderStatus(orderId, paymentStatus);
      res.json({
        success: true,
        message: `Order #${orderId} status updated to ${paymentStatus}`,
        order: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OrderController();
