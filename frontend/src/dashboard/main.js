import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Job from './job';
import Company  from './company';
import { MyProfile } from './myProfile';
import Login from './login';

export const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('Job'); // Default to 'Job'

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Job':
                return <Job />;
            case 'Company':
                return <Company />;
            case 'MyProfile':
                return <MyProfile />;
            case 'Login':
                return <Login />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex p-5 fixed top-0 right-0 left-0 items-center justify-between">
                <div className="font-bold text-3xl">Job Application</div>
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
                        onClick={() => setActiveComponent('Login')}
                    >
                        Login
                    </Button>
                </div>
            </div>
            <Container maxWidth="lg" className='flex justify-center items-center' style={{ marginTop: '40px' }}>
                {renderComponent()}
            </Container>
        </div>
    );
};
