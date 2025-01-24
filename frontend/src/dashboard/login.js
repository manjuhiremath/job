import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Box, Card } from '@mui/material';
import { loginUser, registerUser } from '../api/api';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [careerGoals, setCareerGoals] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password || !careerGoals) {
            setError('All fields are required');
            return;
        }
        try {
            const payload = { name, email, password, careerGoals };
            await registerUser(payload);
            console.log('User registered successfully');
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        }
    };

    const handleLoginSubmit = async(event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('All fields are required');
            return;
        }
        try {
            const payload = { email, password};
            await loginUser(payload).then((resp)=>{
                console.log(resp)
                localStorage.setItem('token', resp?.data?.token);
                localStorage.setItem('userId', resp?.data?.userId);
                setIsLoggedIn(true);
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <Card className="p-5 w-96 border" style={{ marginTop: '200px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                {isLogin ? 'Login' : 'Signup'}
            </Typography>

            <Box display="flex" justifyContent="center" marginBottom="20px">
                <Button
                    variant={isLogin ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setIsLogin(true)}
                    style={{ marginRight: '10px' }}
                >
                    Login
                </Button>
                <Button
                    variant={!isLogin ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setIsLogin(false)}
                >
                    Signup
                </Button>
            </Box>

            {isLogin ? (
                <form onSubmit={handleLoginSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box display="flex" justifyContent="center" marginTop="20px">
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </Box>
                </form>
            ) : (
                <form onSubmit={handleSignupSubmit}>
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Career Goals"
                        type="text"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={3}
                        onChange={(e) => setCareerGoals(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Box display="flex" justifyContent="center" marginTop="20px">
                        <Button type="submit" variant="contained" color="primary">
                            Signup
                        </Button>
                    </Box>
                </form>
            )}
        </Card>
    );
};

export default Login;
