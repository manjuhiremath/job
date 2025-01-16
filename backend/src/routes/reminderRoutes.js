import express from 'express';
import { createReminder, deleteReminder, getReminders, updateReminder } from '../controllers/reminderController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateUser,createReminder);
router.get('/:userId', authenticateUser,getReminders);
router.put('/:id', authenticateUser,updateReminder);
router.delete('/:id', authenticateUser,deleteReminder);

export default router;

