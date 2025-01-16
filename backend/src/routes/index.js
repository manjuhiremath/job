import { Router } from 'express';
import authRoutes from './authRoutes.js';
import companyRoutes from './companyRoutes.js';
import jobRouter from './jobRoutes.js';
import remainderRouter from './reminderRoutes.js';
const router = Router();

router.use('/auth', authRoutes);
router.use('/company',companyRoutes);
router.use('/job',jobRouter);
router.use('/remainder',remainderRouter);

export default router;
