import { Stream } from "stream";
import cloudinary from "../config/cloudinary.js";
import Job from "../models/JobApplication.js";


const uploadToCloudinary = async (file) => {
    try {
        const bufferStream = new Stream.PassThrough();
        bufferStream.end(file.buffer);  
        const result = await new Promise((resolve, reject) => {
            bufferStream.pipe(
                cloudinary.v2.uploader.upload_stream(
                    { folder: 'job_applications', resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            reject(new Error('Cloudinary upload failed: ' + error.message));
                        } else {
                            resolve(result);
                        }
                    }
                )
            );
        });
        return result.secure_url; 
    } catch (error) {
        console.log('Cloudinary upload failed: ' + error.message);
        throw error;
    }
};

export const createJob = async (req, res) => {
    try {
        const { companyName, jobTitle, applicationDate, status, notes } = req.body;
        let fileUrl = '';
        const userId = req.user
        fileUrl = await uploadToCloudinary(req.file);
        const job = await Job.create({
            companyName,
            jobTitle,
            applicationDate,
            status,
            notes,
            userId,
            fileUrl 
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};

export const getJobs = async (req, res) => {
    try {
        const id = req.user;
        const jobs = await Job.findAll({ where: { userId: id } });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, jobTitle, applicationDate, status, notes } = req.body;
        console.log('the updated data',req.body)
        let updatedData = { companyName, jobTitle, applicationDate, status, notes };
        if (req.file) {
            const fileUrl = await uploadToCloudinary(req.file);
            updatedData.fileUrl = fileUrl;
        }
        const job = await Job.update(updatedData, { where: { id } });
        if (job[0] === 0) {
            return res.status(404).json({ error: 'Job not found or no changes made' });
        }
        res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job: ' + error.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findOne({ where: { id } });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.fileUrl) {
            const publicId = job.fileUrl.split('/').pop().split('.')[0]; 
            await cloudinary.v2.uploader.destroy(`job_applications/${publicId}`);
        }
        await Job.destroy({ where: { id } });
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job: ' + error.message });
    }
};
