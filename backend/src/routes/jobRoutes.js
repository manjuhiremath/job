import { createJob, deleteJob, getJobs, updateJob } from "../controllers/jobController.js";
import express from 'express';
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();


router.post('/',authenticateUser, createJob);
router.get('/:userId', authenticateUser,getJobs);
router.put('/:id', authenticateUser,updateJob);
router.delete('/:id', authenticateUser,deleteJob);

export default router ;