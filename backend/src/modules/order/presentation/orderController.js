import { ApiResponse } from '../../../shared/utils/apiResponse.js';

export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  create = async (req, res, next) => {
    try {
      const order = await this.orderService.placeOrder(req.body);
      return ApiResponse.created(res, order, 'Order placed successfully');
    } catch (err) {
      next(err);
    }
  };

  getByNumber = async (req, res, next) => {
    try {
      const { orderNumber } = req.params;
      const order = await this.orderService.getOrderByNumber(orderNumber);
      return ApiResponse.success(res, order, 'Order retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const order = await this.orderService.getOrderById(id);
      return ApiResponse.success(res, order, 'Order retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const { status, phone, limit, offset } = req.query;
      const orders = await this.orderService.listOrders({
        status,
        phone,
        limit: limit ? parseInt(limit, 10) : 50,
        offset: offset ? parseInt(offset, 10) : 0,
      });
      return ApiResponse.success(res, orders, 'Orders retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { status } = req.body;
      const updated = await this.orderService.updateOrderStatus(id, status);
      return ApiResponse.success(res, updated, 'Order status updated successfully');
    } catch (err) {
      next(err);
    }
  };
}
