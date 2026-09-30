/**
 * Interface definition for Order Repository (DDD Port)
 */
export class IOrderRepository {
  async create(order) {
    throw new Error('Method not implemented.');
  }

  async findById(id) {
    throw new Error('Method not implemented.');
  }

  async findByOrderNumber(orderNumber) {
    throw new Error('Method not implemented.');
  }

  async findAll(filters) {
    throw new Error('Method not implemented.');
  }

  async updateStatus(id, newStatus) {
    throw new Error('Method not implemented.');
  }
}
