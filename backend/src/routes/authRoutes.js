import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser,getProfile);
router.put('/profile', authenticateUser,updateProfile);

export default router;
