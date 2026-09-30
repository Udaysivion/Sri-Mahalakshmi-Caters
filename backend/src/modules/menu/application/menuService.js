import { MenuItem } from '../domain/MenuItem.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class MenuService {
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  async getMenuItems(filters) {
    const items = await this.menuRepository.findAll(filters);
    return items.map((item) => item.toDTO());
  }

  async getMenuItemById(id) {
    const item = await this.menuRepository.findById(id);
    if (!item) {
      throw new NotFoundError(`Menu item with ID ${id}`);
    }
    return item.toDTO();
  }

  async createMenuItem(data) {
    const entity = new MenuItem(data);
    const created = await this.menuRepository.create(entity);
    return created.toDTO();
  }

  async updateMenuItem(id, data) {
    const updated = await this.menuRepository.update(id, data);
    if (!updated) {
      throw new NotFoundError(`Menu item with ID ${id}`);
    }
    return updated.toDTO();
  }

  async deleteMenuItem(id) {
    const deleted = await this.menuRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Menu item with ID ${id}`);
    }
    return { id, deleted: true };
  }

  async getCategories() {
    return await this.menuRepository.getCategories();
  }
}
