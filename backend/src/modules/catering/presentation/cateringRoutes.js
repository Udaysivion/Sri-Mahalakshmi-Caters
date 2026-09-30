import { Router } from 'express';
import { PostgresCateringRepository } from '../infrastructure/postgresCateringRepository.js';
import { CateringService } from '../application/cateringService.js';
import { CateringController } from './cateringController.js';

const router = Router();

// Dependency Injection wiring
const cateringRepository = new PostgresCateringRepository();
const cateringService = new CateringService(cateringRepository);
const cateringController = new CateringController(cateringService);

// Routes
router.post('/', cateringController.create);
router.get('/', cateringController.getAll);
router.get('/:id', cateringController.getById);
router.patch('/:id/status', cateringController.updateStatus);

export default router;
