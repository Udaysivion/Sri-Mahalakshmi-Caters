import { ValidationError } from '../../../shared/errors/AppError.js';

export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

export class OrderItem {
  constructor({ menuItemId = null, name, unitPrice, quantity }) {
    if (!name || !name.trim()) {
      throw new ValidationError('Order item name is required');
    }
    const price = parseFloat(unitPrice);
    if (isNaN(price) || price < 0) {
      throw new ValidationError(`Invalid price for item: ${name}`);
    }
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      throw new ValidationError(`Invalid quantity for item: ${name}. Must be at least 1`);
    }

    this.menuItemId = menuItemId;
    this.name = name.trim();
    this.unitPrice = price;
    this.quantity = qty;
    this.total = parseFloat((this.unitPrice * this.quantity).toFixed(2));
  }
}

export class Order {
  constructor({
    id = null,
    orderNumber = null,
    customerName,
    phone,
    deliveryAddress,
    paymentMethod = 'COD',
    paymentStatus = 'PENDING',
    orderStatus = OrderStatus.PENDING,
    items = [],
    deliveryFee = 0,
    notes = '',
    createdAt = null,
    updatedAt = null,
  }) {
    this.validateCustomer(customerName, phone, deliveryAddress);

    this.id = id;
    this.orderNumber = orderNumber || this.generateOrderNumber();
    this.customerName = customerName.trim();
    this.phone = phone.trim();
    this.deliveryAddress = deliveryAddress.trim();
    this.paymentMethod = paymentMethod.toUpperCase();
    this.paymentStatus = paymentStatus.toUpperCase();
    this.orderStatus = orderStatus.toUpperCase();
    this.notes = notes ? notes.trim() : '';
    this.deliveryFee = parseFloat(deliveryFee) || 0;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.setItems(items);
  }

  generateOrderNumber() {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    return `SMK-${randomSuffix}`;
  }

  validateCustomer(customerName, phone, deliveryAddress) {
    if (!customerName || !customerName.trim()) {
      throw new ValidationError('Customer name is required');
    }
    if (!phone || !phone.trim() || phone.trim().length < 7) {
      throw new ValidationError('A valid contact phone number is required');
    }
    if (!deliveryAddress || !deliveryAddress.trim()) {
      throw new ValidationError('Delivery address is required');
    }
  }

  setItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new ValidationError('Order must contain at least one item');
    }
    this.items = items.map((i) => (i instanceof OrderItem ? i : new OrderItem(i)));
    this.subtotal = parseFloat(this.items.reduce((sum, item) => sum + item.total, 0).toFixed(2));
    this.totalAmount = parseFloat((this.subtotal + this.deliveryFee).toFixed(2));
  }

  updateStatus(newStatus) {
    const validStatuses = Object.values(OrderStatus);
    if (!validStatuses.includes(newStatus)) {
      throw new ValidationError(`Invalid order status: ${newStatus}. Valid: ${validStatuses.join(', ')}`);
    }
    this.orderStatus = newStatus;
  }

  toDTO() {
    return {
      id: this.id,
      orderNumber: this.orderNumber,
      customerName: this.customerName,
      phone: this.phone,
      deliveryAddress: this.deliveryAddress,
      paymentMethod: this.paymentMethod,
      paymentStatus: this.paymentStatus,
      orderStatus: this.orderStatus,
      subtotal: this.subtotal,
      deliveryFee: this.deliveryFee,
      totalAmount: this.totalAmount,
      notes: this.notes,
      items: this.items.map((i) => ({
        menuItemId: i.menuItemId,
        name: i.name,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
        total: i.total,
      })),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
