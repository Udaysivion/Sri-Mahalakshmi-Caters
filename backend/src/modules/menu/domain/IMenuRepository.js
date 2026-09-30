/**
 * Interface definition for Menu Repository (DDD Port)
 */
export class IMenuRepository {
  async findAll(filters) {
    throw new Error('Method not implemented.');
  }

  async findById(id) {
    throw new Error('Method not implemented.');
  }

  async create(menuItem) {
    throw new Error('Method not implemented.');
  }

  async update(id, menuItem) {
    throw new Error('Method not implemented.');
  }

  async delete(id) {
    throw new Error('Method not implemented.');
  }

  async getCategories() {
    throw new Error('Method not implemented.');
  }
}
