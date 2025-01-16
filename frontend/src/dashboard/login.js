import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { registerUser } from '../api/api';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup forms
    const handleClick = ()=>{
        try{
            payload = {
                
            }
            registerUser()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <Card maxWidth="xs" className='p-5 w-96 border' style={{ marginTop: '200px' }}>
            <Typography variant="h4" color="initial" align="center" gutterBottom>
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
                // Login Form
                <form>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                    />
                    <Box display="flex" justifyContent="center" marginTop="20px">
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </Box>
                </form>
            ) : (
                // Signup Form
                <form>
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
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
                    />
                    <Box display="flex" justifyContent="center" marginTop="20px">
                        <Button type="submit" onClick={handleClick} variant="contained" color="primary">
                            Signup
                        </Button>
                    </Box>
                </form>
            )}
        </Card>
    );
};

export default Login;
