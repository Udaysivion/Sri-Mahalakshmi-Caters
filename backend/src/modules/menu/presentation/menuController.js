import { ApiResponse } from '../../../shared/utils/apiResponse.js';

export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  getAll = async (req, res, next) => {
    try {
      const { category, type, search, isAvailable } = req.query;
      const items = await this.menuService.getMenuItems({
        category,
        type,
        search,
        isAvailable: isAvailable !== undefined ? isAvailable === 'true' : undefined,
      });
      return ApiResponse.success(res, items, 'Menu items retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const item = await this.menuService.getMenuItemById(id);
      return ApiResponse.success(res, item, 'Menu item retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const created = await this.menuService.createMenuItem(req.body);
      return ApiResponse.created(res, created, 'Menu item created successfully');
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updated = await this.menuService.updateMenuItem(id, req.body);
      return ApiResponse.success(res, updated, 'Menu item updated successfully');
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.menuService.deleteMenuItem(id);
      return ApiResponse.success(res, result, 'Menu item deleted successfully');
    } catch (err) {
      next(err);
    }
  };

  getCategories = async (req, res, next) => {
    try {
      const categories = await this.menuService.getCategories();
      return ApiResponse.success(res, categories, 'Categories retrieved successfully');
    } catch (err) {
      next(err);
    }
  };
}
