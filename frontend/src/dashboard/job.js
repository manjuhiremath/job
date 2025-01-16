import React, { useState } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    TextField,
    Modal,
    Paper,
    Select,
    MenuItem,
} from '@mui/material';

const Job = () => {
    const [jobs, setJobs] = useState([
        { id: 1, companyName: 'TechCorp', jobTitle: 'Software Engineer', applicationDate: '2025-01-01', status: 'Applied', notes: 'Awaiting response.' },
        { id: 2, companyName: 'HealthPlus', jobTitle: 'Data Analyst', applicationDate: '2025-01-05', status: 'Interview Scheduled', notes: 'Prepare for interview.' },
    ]);

    const [editingJobId, setEditingJobId] = useState(null);
    const [newJob, setNewJob] = useState({
        companyName: '',
        jobTitle: '',
        applicationDate: '',
        status: '',
        notes: '',
    });

    const [openModal, setOpenModal] = useState(false);

    const statusOptions = ['Bookmarked', 'Applied', 'Interview Scheduled', 'Accepted'];

    const handleEditChange = (id, field, value) => {
        setJobs((prev) =>
            prev.map((job) => (job.id === id ? { ...job, [field]: value } : job))
        );
    };

    const handleSaveEdit = () => {
        setEditingJobId(null);
    };

    const handleDeleteJob = (id) => {
        setJobs((prev) => prev.filter((job) => job.id !== id));
    };

    const handleAddJob = () => {
        setJobs((prev) => [
            ...prev,
            { ...newJob, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
        ]);
        setNewJob({ companyName: '', jobTitle: '', applicationDate: '', status: '', notes: '' });
        setOpenModal(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Job Applications
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} style={{ marginBottom: '20px' }}>
                Add Job
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['Company Name', 'Job Title', 'Application Date', 'Status', 'Notes', 'Actions'].map((header) => (
                                <TableCell
                                    key={header}
                                    className="border"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id}>
                                {['companyName', 'jobTitle', 'applicationDate', 'status', 'notes'].map((field) => (
                                    <TableCell className="border" key={field}>
                                        {editingJobId === job.id && field === 'status' ? (
                                            <Select
                                                value={job[field]}
                                                onChange={(e) => handleEditChange(job.id, field, e.target.value)}
                                                fullWidth
                                            >
                                                {statusOptions.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        ) : editingJobId === job.id ? (
                                            <TextField
                                                value={job[field]}
                                                onChange={(e) => handleEditChange(job.id, field, e.target.value)}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        ) : (
                                            job[field]
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {editingJobId === job.id ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSaveEdit}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="text"
                                                color="secondary"
                                                onClick={() => setEditingJobId(job.id)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="text"
                                                color="error"
                                                onClick={() => handleDeleteJob(job.id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Job Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Add Job
                    </Typography>
                    {['companyName', 'jobTitle', 'applicationDate', 'notes'].map((field) => (
                        <TextField
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={newJob[field]}
                            onChange={(e) => setNewJob({ ...newJob, [field]: e.target.value })}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    ))}
                    <Select
                        value={newJob.status}
                        onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                        fullWidth
                        margin="normal"
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Select Status
                        </MenuItem>
                        {statusOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    <Box display="flex" justifyContent="space-between" marginTop="20px">
                        <Button variant="text" color="primary" onClick={handleAddJob}>
                            Save
                        </Button>
                        <Button variant="text" color="secondary" onClick={() => setOpenModal(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default Job;
