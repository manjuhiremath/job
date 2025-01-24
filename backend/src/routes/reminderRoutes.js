import express from 'express';
import { createReminder } from '../controllers/reminderController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateUser,createReminder);


export default router;

