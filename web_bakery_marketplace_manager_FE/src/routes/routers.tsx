import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home/HomePage';
import SignUp from '../pages/home/SignUp';
import LoginManager from '../pages/home/LoginManager';
import ManageBakery from '../pages/home/ManageBakery';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginManager />} />
            <Route path="/manage" element={<ManageBakery />} />

        </Routes>
    );
};

export default AppRoutes;
