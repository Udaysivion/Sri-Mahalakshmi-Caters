import { Router } from 'express';
import { adminLogin, verifyAdminSession } from './adminController.js';

const router = Router();

router.post('/login', adminLogin);
router.get('/verify', verifyAdminSession);

export default router;
