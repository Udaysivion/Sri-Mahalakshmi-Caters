import { Router } from 'express';
import { PostgresMenuRepository } from '../infrastructure/postgresMenuRepository.js';
import { MenuService } from '../application/menuService.js';
import { MenuController } from './menuController.js';

const router = Router();

// Dependency Injection wiring
const menuRepository = new PostgresMenuRepository();
const menuService = new MenuService(menuRepository);
const menuController = new MenuController(menuService);

// Routes
router.get('/categories', menuController.getCategories);
router.get('/', menuController.getAll);
router.get('/:id', menuController.getById);
router.post('/', menuController.create);
router.put('/:id', menuController.update);
router.delete('/:id', menuController.delete);

export default router;
