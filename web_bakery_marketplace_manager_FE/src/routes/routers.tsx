import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import SignUp from '../pages/signup/SignUp';
import LoginManager from '../pages/login/LoginManager';
// import ManageBakery from '../pages/home/ManageBakery';
// import BakeryDetail from '../pages/home/ManageBakeryDetail';
import MainLayout from '../layouts/DefaultLayout';
import StatisticsPage from '../components/chart/ChartStatic';
// import OrderManagement from '../pages/manageOrder/OrderManagement';
import ProtectedRoute from './ProtectedRoute';
// import ManageProducts from '../pages/manageProduct/ManageProducts';
import BakeryManagement from '../pages/manageBakery/BakeryManagement';
import ManageProfileManager from '../pages/profile/ManageProfileManager';
import { useAuth } from '../stores/authContex';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginManager />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    {/* <Route path="/manage" element={<ManageBakery />} />
                    <Route path="/bakery/:id" element={<BakeryDetail />} /> */}
                    <Route path='/statistics' element={<StatisticsPage />} />
                    <Route path='/bakery-management/:bakeryId' element={<BakeryManagement />} />
                    <Route path='/manage-profile-manager' element={<ManageProfileManager />} />
                    {/* <Route path='/getOrdersByBakeryId/:bakeryId' element={<OrderManagement />} />
                    <Route path='/getAllProductsByBakeryId/:bakeryId' element={<ManageProducts/>} /> */}
                </Route>
            </Route>
            <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>
    );
};


export default AppRoutes;
