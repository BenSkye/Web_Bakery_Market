import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';


import LoginPage from '../pages/login/Login';
import MainLayout from '../layouts/DefaultLayout';
import SignUp from '../pages/signup/signup';








const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />

            </Route>
        </Routes>
    );
};

export default AppRoutes;
