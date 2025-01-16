import React, { useState } from 'react';
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

const Company = () => {
    const [companies, setCompanies] = useState([
        { id: 1, name: 'TechCorp', contactDetails: '123-456-7890', industry: 'Technology', companySize: '500', notes: 'Leading in AI.' },
        { id: 2, name: 'HealthPlus', contactDetails: '987-654-3210', industry: 'Healthcare', companySize: '200', notes: 'Innovative health solutions.' },
    ]);

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

    const handleSaveEdit = () => {
        setEditingCompanyId(null);
    };

    const handleAddCompany = () => {
        setCompanies((prev) => [
            ...prev,
            { ...newCompany, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
        ]);
        setNewCompany({ name: '', contactDetails: '', industry: '', companySize: '', notes: '' });
        setOpenModal(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Company
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} style={{ marginBottom: '20px' }}>
                Add Company
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                                <TableCell>
                                    {editingCompanyId === company.id ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSaveEdit}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => setEditingCompanyId(company.id)}
                                        >
                                            Edit
                                        </Button>
                                    )}
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
