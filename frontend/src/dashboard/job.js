import React, { useEffect, useState } from 'react';
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
import { getToken } from '../api/baseurl';
import { deleteJob, getJob, postJob, postRemainder, putJob } from '../api/api';


const Job = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);
    const [editingFile, setEditingFile] = useState(null); 
    const [filteredJobs, setFilteredJobs] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [statusFilter, setStatusFilter] = useState(''); 
    const [newremainder, setNewremainder] = useState({
        email: '',
        message: '',
        datetime: '', 
    });
    const [newJob, setNewJob] = useState({
        companyName: '',
        jobTitle: '',
        applicationDate: '',
        status: '',
        notes: '',
        file: null,
    });
    const [openModal, setOpenModal] = useState(false);
    const [remainderModel, setRemainderModel] = useState(false);
    const statusOptions = ['Bookmarked', 'Applied', 'Interview Scheduled', 'Accepted'];

    const handleEditChange = (id, field, value) => {
        setJobs((prev) =>
            prev.map((job) =>
                job.id === id ? { ...job, [field]: value } : job
            )
        );
    };

    const handleFileChange = (e) => {
        setNewJob({ ...newJob, file: e.target.files[0] });
    };

    const handleEditFileChange = (e) => {
        setEditingFile(e.target.files[0]); 
    };


    const handleSaveRemainder = async () => {
        console.log('Form Data:', newremainder); 
        try {
            if(getToken()){
                const payload = {
                    sendAt : newremainder.datetime,
                    message: newremainder.message,
                    email:newremainder.email
                }
                await postRemainder(payload,getToken()).then((resp)=>{
                    console.log(resp);
                }).catch((err)=>{
                    console.log(err)
                })
            }
        } catch (error) {
        }
        setRemainderModel(false); 
    };
    const handleSaveEdit = async () => {
        try {
            if (editingJobId) {
                const updatedJob = jobs.find((job) => job.id === editingJobId);
                if (!updatedJob) {
                    console.error("Job not found.");
                    return;
                }

                const formData = new FormData();
                formData.append('companyName', updatedJob.companyName);
                formData.append('jobTitle', updatedJob.jobTitle);
                formData.append('applicationDate', updatedJob.applicationDate);
                formData.append('status', updatedJob.status);
                formData.append('notes', updatedJob.notes);

                if (editingFile) {
                    formData.append('file', editingFile);
                }

                const token = getToken();
                await putJob(editingJobId, formData, token); 
                await getJobdetails();
                setEditingJobId(null);
                setEditingFile(null);
            }
        } catch (error) {
            console.error(`Error saving job with ID ${editingJobId}:`, error);
        }
    };

    const handleDeleteJob = async (id) => {
        try {
            const token = getToken();
            await deleteJob(id, token);
            await getJobdetails();
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    const handleAddJob = async () => {
        try {
            const formData = new FormData();
            formData.append('companyName', newJob.companyName);
            formData.append('jobTitle', newJob.jobTitle);
            formData.append('applicationDate', newJob.applicationDate);
            formData.append('status', newJob.status);
            formData.append('notes', newJob.notes);
            if (newJob.file) formData.append('file', newJob.file);

            await postJob(formData, getToken());
            await getJobdetails();
            setNewJob({ companyName: '', jobTitle: '', applicationDate: '', status: '', notes: '', file: null });
            setOpenModal(false);
        } catch (error) {
            console.error("Error adding job: ", error);
        }
    };

    const getJobdetails = async () => {
        try {
            const token = getToken();
            if (token) {
                const response = await getJob(token);
                const jobData = response?.data || [];
                const formattedJobs = jobData.map((job) => ({
                    id: job.id,
                    companyName: job.companyName,
                    jobTitle: job.jobTitle,
                    applicationDate: new Date(job.applicationDate).toISOString().split('T')[0],
                    status: job.status,
                    notes: job.notes,
                    fileUrl: job.fileUrl,
                }));

                setJobs(formattedJobs);
                setFilteredJobs(formattedJobs);
            }
        } catch (err) {
            console.error("Error fetching job details:", err);
        }
    };
    const handleSetRemainder = () => {
        setRemainderModel(true)
    }
    useEffect(() => {
        const filtered = jobs.filter((job) => {
            const matchesSearch =
                job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter ? job.status === statusFilter : true;

            return matchesSearch && matchesStatus;
        });

        setFilteredJobs(filtered);
    }, [searchQuery, statusFilter, jobs]);

    useEffect(() => {
        getJobdetails();
    }, []);

    return (
        <Container maxWidth="full" style={{ marginTop: '30px' }}>
            <Typography variant="h5" gutterBottom>
                Job Applications
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    style={{ marginBottom: '20px', marginLeft: '20px' }}
                >
                    Add Job
                </Button>
            </Typography>
            <Box display="flex" justifyContent="end" marginBottom="20px">
                <TextField
                    label="Search by Name or Title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="outlined"
                    width='800px'
                    style={{ marginRight: '20px' }}
                />
                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    style={{ width: '200px' }}
                >
                    <MenuItem value="">All Statuses</MenuItem>
                    {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#A888B5' }}>
                            {['Company Name', 'Job Title', 'Application Date', 'Status', 'Notes', 'Resume', 'Actions', 'Remainder'].map((header) => (
                                <TableCell key={header} className="border" sx={{ fontWeight: 'bold' }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredJobs.map((job) => (
                            <TableRow key={job.id}>
                                {['companyName', 'jobTitle', 'applicationDate', 'status', 'notes'].map((field) => (
                                    <TableCell className="border" key={field}>
                                        {editingJobId === job.id && field === 'status' ? (
                                            <Select value={job[field]} onChange={(e) => handleEditChange(job.id, field, e.target.value)} fullWidth>
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
                                        <TextField
                                            type="file"
                                            variant="outlined"
                                            onChange={handleEditFileChange}
                                            inputProps={{ accept: '.pdf' }}
                                            fullWidth
                                        />
                                    ) : (
                                        <Button variant="text" href={`${job.fileUrl}`} color="primary">
                                            Preview
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingJobId === job.id ? (
                                        <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                                            Save
                                        </Button>
                                    ) : (
                                        <div className='flex'>
                                            <Button variant="text" color="secondary" onClick={() => setEditingJobId(job.id)} style={{ marginRight: '10px' }}>
                                                Edit
                                            </Button>
                                            <Button variant="text" color="error" onClick={() => handleDeleteJob(job.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => setRemainderModel(true)}>
                                        Set Reminder
                                    </Button>
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
                            label={field === 'applicationDate' ? 'Application Date' : field.charAt(0).toUpperCase() + field.slice(1)}
                            value={newJob[field]}
                            onChange={(e) => setNewJob({ ...newJob, [field]: e.target.value })}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type={field === 'applicationDate' ? 'date' : 'text'}
                            InputLabelProps={field === 'applicationDate' ? { shrink: true } : undefined}
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

                    <Typography mt={2} variant="button" color="initial">
                        Upload Resume:
                    </Typography>
                    <TextField
                        variant="outlined"
                        type="file"
                        fullWidth
                        margin="normal"
                        onChange={handleFileChange}
                        inputProps={{ accept: '.pdf' }}
                    />

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
            <Modal open={remainderModel} onClose={() => setRemainderModel(false)}>
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
                        Add Remainder
                    </Typography>
                    {['email', 'message'].map((field) => (
                        <TextField
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={newremainder[field]}
                            onChange={(e) => setNewremainder({ ...newremainder, [field]: e.target.value })}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type="text"
                        />
                    ))}
                    <input
                        aria-label="Date and time"
                        type="datetime-local"
                        value={newremainder.datetime}
                        onChange={(e) => setNewremainder({ ...newremainder, datetime: e.target.value })}
                        style={{ width: '100%', marginTop: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <Box display="flex" justifyContent="space-between" marginTop="20px">
                        <Button variant="text" color="primary" onClick={handleSaveRemainder}>
                            Save
                        </Button>
                        <Button variant="text" color="secondary" onClick={() => setRemainderModel(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default Job;
