import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { getToken } from '../api/baseurl';
import { getProfile, putProfile } from '../api/api';

export const MyProfile = () => {
    const [isEditing, setIsEditing] = useState(false); 
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        careerGoals: ''
    });

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        careerGoals: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSave = async () => {
        try {
            const payload = {
                name: formValues.name,
                email: formValues.email,
                careerGoals: formValues.careerGoals,
            };

            const token = getToken();
            await putProfile(payload, token);
            setUserDetails({ ...formValues }); 
            setIsEditing(false); 

            console.log('Profile updated successfully.');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const getProfiledetails = async () => {
        try {
            if (getToken()) {
                const resp = await getProfile(getToken());
                setUserDetails({
                    name: resp?.data?.user?.name,
                    email: resp?.data?.user?.email,
                    careerGoals: resp?.data?.user?.careerGoals,
                });

                setFormValues({
                    name: resp?.data?.user?.name,
                    email: resp?.data?.user?.email,
                    careerGoals: resp?.data?.user?.careerGoals,
                });
            }
        } catch (err) {
            console.error('Error fetching profile details:', err);
        }
    };

    useEffect(() => {
        getProfiledetails();
    }, []);

    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h4" color="initial" gutterBottom>
                My Profile
            </Typography>

            {isEditing ? (
                <Box component="form" noValidate autoComplete="off">
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
                <Box>
                    <Typography variant="body1" gutterBottom>
                        <strong>Name:</strong> {userDetails.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Email:</strong> {userDetails.email}
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
