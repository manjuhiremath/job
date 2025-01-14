import controller, { createCompany, deleteCompany, getCompanies, updateCompany } from '../controllers/companyController';
import express from 'express';

const router = express.Router();

router.post('/', createCompany);
router.get('/:userId', getCompanies);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

export default router;