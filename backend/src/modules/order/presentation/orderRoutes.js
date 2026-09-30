import { Router } from 'express';
import { PostgresOrderRepository } from '../infrastructure/postgresOrderRepository.js';
import { OrderService } from '../application/orderService.js';
import { OrderController } from './orderController.js';

const router = Router();

// Dependency Injection wiring
const orderRepository = new PostgresOrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

// Routes
router.post('/', orderController.create);
router.get('/', orderController.getAll);
router.get('/track/:orderNumber', orderController.getByNumber);
router.get('/:id', orderController.getById);
router.patch('/:id/status', orderController.updateStatus);

export default router;
