import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import SignUp from '../pages/home/SignUp';
import LoginManager from '../pages/home/LoginManager';
import ManageBakery from '../pages/home/ManageBakery';
import BakeryDetail from '../pages/home/ManageBakeryDetail';
import MainLayout from '../layouts/DefaultLayout';
import StatisticsPage from '../components/chart/ChartStatic';
const AppRoutes: React.FC = () => {
    return (
        <Routes>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginManager />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/manage" element={<ManageBakery />} />
                <Route path="/bakery/:id" element={<BakeryDetail />} />
                <Route path='/statistics' element={<StatisticsPage />} />
            </Route>

        </Routes>
    );
};

export default AppRoutes;
