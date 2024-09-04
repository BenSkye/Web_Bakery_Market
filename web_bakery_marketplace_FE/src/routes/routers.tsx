import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/about/About';
import StoresPage from '../pages/stores/Stores';
import WorkshopPage from '../pages/workshop/Workshop';
import LoginPage from '../pages/login/Login';
import MainLayout from '../layouts/DefaultLayout';
import SignUp from '../pages/signup/signup';
import Detail from '../pages/detail/Detail';

const AppRoutes: React.FC = () => {
    return (
        <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/stores" element={<StoresPage />} />
                <Route path="/workshop" element={<WorkshopPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
