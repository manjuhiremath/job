import { createJob, deleteJob, getJobs, updateJob } from "../controllers/jobController";
import express from 'express';

const jobRouter = express.Router();


jobRouter.post('/', createJob);
jobRouter.get('/:userId', getJobs);
jobRouter.put('/:id', updateJob);
jobRouter.delete('/:id', deleteJob);

export { jobRouter };