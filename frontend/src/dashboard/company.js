import React, { useEffect, useState } from 'react';
import {
    Typography,
    Container,
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
} from '@mui/material';
import { getToken } from '../api/baseurl';
import { deleteCompany, getCompany, postCompany, putCompany } from '../api/api';
import { green } from '@mui/material/colors';

const Company = () => {
    const [companies, setCompanies] = useState([]);

    const [editingCompanyId, setEditingCompanyId] = useState(null);
    const [newCompany, setNewCompany] = useState({
        name: '',
        contactDetails: '',
        industry: '',
        companySize: '',
        notes: '',
    });

    const [openModal, setOpenModal] = useState(false);

    const handleEditChange = (id, field, value) => {
        setCompanies((prev) =>
            prev.map((company) => (company.id === id ? { ...company, [field]: value } : company))
        );
    };

    const handleSaveEdit = async () => {
        try {
            if (editingCompanyId) {
                const updatedCompany = companies.find((company) => company.id === editingCompanyId);

                if (!updatedCompany) {
                    console.error("Job not found.");
                    return;
                }

                const token = getToken();
                await putCompany(editingCompanyId, updatedCompany, token);
                console.log(`Job with ID ${editingCompanyId} updated successfully.`);
            }

            setEditingCompanyId(null);
        } catch (error) {
            console.error(`Error saving job with ID ${editingCompanyId}:`, error);
        }
    };

    const handleAddCompany = async () => {
        try {
            const id = localStorage.getItem('userId');
            console.log(id)
            const payload = {
                name: newCompany.name,
                contactDetails: newCompany.contactDetails,
                industry: newCompany.industry,
                companySize: newCompany.companySize,
                notes: newCompany.notes,
                userId: id
            }
            await postCompany(payload, getToken()).then((resp) => {
                console.log(resp)
            }).catch((err) => {
                console.log(err);
            })
            setNewCompany({ name: '', contactDetails: '', industry: '', companySize: '', notes: '' });
            setOpenModal(false);
            await getCompanydetails();
        } catch (error) {
            console.log(error)
        }

    };

    const handleDeleteCompany = async (id) => {
        try {
            const token = getToken();
            await deleteCompany(id, token).then((resp) => {
                console.log(resp);
            }).catch((err) => {
                console.log(err);
            })
            await getCompanydetails();
        } catch (error) {

        }
    };

    const getCompanydetails = async () => {
        try {
            const token = getToken();
            if (token) {
                const response = await getCompany(token);
                const companyData = response?.data || [];

                const formattedCompanies = companyData.map((company) => ({
                    id: company.id,
                    name: company.name,
                    contactDetails: company.contactDetails,
                    industry: company.industry,
                    companySize: company.companySize,
                    notes: company.notes,
                }));

                setCompanies(formattedCompanies);
            }
        } catch (err) {
            console.error("Error fetching company details:", err);
        }
    };

    useEffect(() => {
        getCompanydetails();
    }, []);

    return (
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Company
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
                style={{ marginBottom: '20px' }}
            >
                Add Company
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#A888B5' }}>
                            <TableCell>Name</TableCell>
                            <TableCell>Contact Details</TableCell>
                            <TableCell>Industry</TableCell>
                            <TableCell>Company Size</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id}>
                                {['name', 'contactDetails', 'industry', 'companySize', 'notes'].map((field) => (
                                    <TableCell key={field}>
                                        {editingCompanyId === company.id ? (
                                            <TextField
                                                value={company[field]}
                                                onChange={(e) => handleEditChange(company.id, field, e.target.value)}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        ) : (
                                            company[field]
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell >
                                    <div className='flex'>
                                    {editingCompanyId === company.id ? (
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={handleSaveEdit}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="text"
                                            color="secondary"
                                            onClick={() => setEditingCompanyId(company.id)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        variant="text"
                                        color="error"
                                        onClick={() => handleDeleteCompany(company.id)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Company Modal */}
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
                        Add Company
                    </Typography>
                    {['name', 'contactDetails', 'industry', 'companySize', 'notes'].map((field) => (
                        <TextField
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={newCompany[field]}
                            onChange={(e) => setNewCompany({ ...newCompany, [field]: e.target.value })}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    ))}
                    <Box display="flex" justifyContent="space-between" marginTop="20px">
                        <Button variant="contained" color="primary" onClick={handleAddCompany}>
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default Company;

