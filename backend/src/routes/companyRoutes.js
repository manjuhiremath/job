import { createCompany, deleteCompany, getCompanies, updateCompany } from '../controllers/companyController.js';
import express from 'express';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateUser,createCompany);
router.get('/', authenticateUser,getCompanies);
router.put('/:id', authenticateUser,updateCompany);
router.delete('/:id', authenticateUser,deleteCompany);

export default router;