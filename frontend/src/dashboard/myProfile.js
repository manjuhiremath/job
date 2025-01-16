import React, { useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import Container from '@mui/material/Container';

export const MyProfile = () => {
    const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
    const [userDetails, setUserDetails] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '********',
        careerGoals: 'To become a software architect and lead impactful projects.',
    });

    const [formValues, setFormValues] = useState({ ...userDetails });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSave = () => {
        setUserDetails({ ...formValues });
        setIsEditing(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h4" color="initial" gutterBottom>
                My Profile
            </Typography>

            {isEditing ? (
                // Edit View
                <Box component="form" className='' noValidate autoComplete="off">
                    <TextField
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="email"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <TextField
                        label="Career Goals"
                        name="careerGoals"
                        value={formValues.careerGoals}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                    <Box display="flex" justifyContent="space-between" marginTop="20px">
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            ) : (
                // View Mode
                <Box>
                    <Typography variant="body1" gutterBottom>
                        <strong>Name:</strong> {userDetails.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Email:</strong> {userDetails.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Password:</strong> {userDetails.password}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Career Goals:</strong> {userDetails.careerGoals}
                    </Typography>
                    <Box marginTop="20px">
                        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};
