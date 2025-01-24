import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Job from './job';
import Company from './company';
import { MyProfile } from './myProfile';
import Login from './login';
import { checkToken } from '../api/baseurl';

export const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('Login'); // Default to 'Login'
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const renderComponent = () => {
        if (!isLoggedIn) {
            return <Login />;
        }

        switch (activeComponent) {
            case 'Job':
                return <Job />;
            case 'Company':
                return <Company />;
            case 'MyProfile':
                return <MyProfile />;
            default:
                return <Job />;
        }
    };

    useEffect(() => {
        if (checkToken()) {
            setIsLoggedIn(true);
            setActiveComponent('Job'); 
        } else {
            setIsLoggedIn(false);
            setActiveComponent('Login');
        }
    }, []);

    return (
        <div>
            <div className="flex p-5 fixed top-0 right-0 left-0 items-center justify-between bg-white shadow">
                <div className="font-bold text-3xl">Job Application</div>
                {isLoggedIn && (
                    <div className="flex font-bold text-xl space-x-2 justify-between items-center">
                        <Button
                            variant="outlined"
                            className="text-xl font-bold"
                            color="secondary"
                            onClick={() => setActiveComponent('Job')}
                        >
                            Job
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setActiveComponent('Company')}
                        >
                            Company
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setActiveComponent('MyProfile')}
                        >
                            My Profile
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('userId');
                                setIsLoggedIn(false);
                                setActiveComponent('Login');
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </div>
            <Container
                maxWidth="2xl"
                className="flex justify-center items-center"
                style={{ marginTop: '80px' }}
            >
                {renderComponent()}
            </Container>
        </div>
    );
};
