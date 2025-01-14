import express from 'express';
import { createReminder, deleteReminder, getReminders, updateReminder } from '../controllers/reminderController.js';

const reminderRouter = express.Router();

reminderRouter.post('/', createReminder);
reminderRouter.get('/:userId', getReminders);
reminderRouter.put('/:id', updateReminder);
reminderRouter.delete('/:id', deleteReminder);

export { reminderRouter };

