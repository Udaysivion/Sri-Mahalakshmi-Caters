import { Order, OrderItem } from '../domain/Order.js';
import { NotFoundError, ValidationError } from '../../../shared/errors/AppError.js';

export class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async placeOrder(payload) {
    const {
      customerName,
      phone,
      deliveryAddress,
      paymentMethod = 'COD',
      items,
      deliveryFee = 0,
      notes = '',
    } = payload;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new ValidationError('An order requires at least one item from the cart');
    }

    const orderItems = items.map((item) => {
      return new OrderItem({
        menuItemId: item.id || item.menuItemId || null,
        name: item.name,
        unitPrice: item.price !== undefined ? item.price : item.unitPrice,
        quantity: item.quantity,
      });
    });

    const order = new Order({
      customerName,
      phone,
      deliveryAddress,
      paymentMethod,
      items: orderItems,
      deliveryFee,
      notes,
    });

    const savedOrder = await this.orderRepository.create(order);
    return savedOrder.toDTO();
  }

  async getOrderByNumber(orderNumber) {
    const order = await this.orderRepository.findByOrderNumber(orderNumber);
    if (!order) {
      throw new NotFoundError(`Order with number ${orderNumber}`);
    }
    return order.toDTO();
  }

  async getOrderById(id) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundError(`Order with ID ${id}`);
    }
    return order.toDTO();
  }

  async listOrders(filters) {
    const orders = await this.orderRepository.findAll(filters);
    return orders.map((o) => o.toDTO());
  }

  async updateOrderStatus(id, newStatus) {
    // Validate status format through domain entity
    const existing = await this.orderRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Order with ID ${id}`);
    }

    existing.updateStatus(newStatus);
    const updated = await this.orderRepository.updateStatus(id, existing.orderStatus);
    return updated.toDTO();
  }
}
