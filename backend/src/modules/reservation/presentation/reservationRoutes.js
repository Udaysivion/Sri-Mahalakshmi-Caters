import { Router } from 'express';
import { PostgresReservationRepository } from '../infrastructure/postgresReservationRepository.js';
import { ReservationService } from '../application/reservationService.js';
import { ReservationController } from './reservationController.js';

const router = Router();

// Dependency Injection wiring
const reservationRepository = new PostgresReservationRepository();
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

// Routes
router.post('/', reservationController.create);
router.get('/', reservationController.getAll);
router.get('/:id', reservationController.getById);
router.patch('/:id/status', reservationController.updateStatus);

export default router;
