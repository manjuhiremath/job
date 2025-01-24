import { createJob, deleteJob, getJobs, updateJob } from "../controllers/jobController.js";
import express from 'express';
import { authenticateUser } from "../middleware/auth.js";
import multer from 'multer';

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const router = express.Router();


router.post('/', authenticateUser, upload.single('file'), createJob); 
router.get('/', authenticateUser, getJobs);
router.put('/:id', authenticateUser,upload.single('file'), updateJob);
router.delete('/:id', authenticateUser, deleteJob);

export default router;
