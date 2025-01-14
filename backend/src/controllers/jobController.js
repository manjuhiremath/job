import Job from "../models/JobApplication.js";

export const createJob = async (req, res) => {
    try {
        const { companyName, jobTitle, applicationDate, status, notes, userId } = req.body;
        const job = await Job.create({ companyName, jobTitle, applicationDate, status, notes, userId });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};

export const getJobs = async (req, res) => {
    try {
        const { userId } = req.params;
        const jobs = await Job.findAll({ where: { userId } });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, jobTitle, applicationDate, status, notes } = req.body;
        const job = await Job.update({ companyName, jobTitle, applicationDate, status, notes }, { where: { id } });
        res.status(200).json({ message: 'Job updated', job });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job' });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await Job.destroy({ where: { id } });
        res.status(200).json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
};
