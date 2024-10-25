import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '../pages/signup/SignUp';
import LoginManager from '../pages/login/LoginManager';
// import ManageBakery from '../pages/home/ManageBakery';
// import BakeryDetail from '../pages/home/ManageBakeryDetail';
import MainLayout from '../layouts/DefaultLayout';
import StatisticsPage from '../pages/statistics/StatisticsPage';
// import OrderManagement from '../pages/manageOrder/OrderManagement';
import ProtectedRoute from './ProtectedRoute';
// import ManageProducts from '../pages/manageProduct/ManageProducts';
import BakeryManagement from '../pages/manageBakery/BakeryManagement';
import ManageProfileManager from '../pages/profile/ManageProfileManager';
import ReportsPage from '../pages/reports/ReportsPage';
import { useAuth } from '../stores/authContex';
import ManageUser from '../pages/manageUser/ManageUser';
import ManageBakeries from '../pages/manageBakeries/ManageBekeries';
import Dashboard from '../pages/dashboard/Dashboard';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginManager />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    {/* <Route path="/home" element={<HomePage />} /> */}
                    {/* <Route path="/manage" element={<ManageBakery />} />
                    <Route path="/bakery/:id" element={<BakeryDetail />} /> */}

                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/statistics' element={<StatisticsPage />} />
                    <Route path='/reports' element={<ReportsPage />} />
                    <Route path='/bakery-management/:bakeryId' element={<BakeryManagement />} />
                    <Route path='/manage-profile-manager' element={<ManageProfileManager />} />
                    <Route path='/manage-user' element={<ManageUser />} />
                    <Route path='/bakeries' element={<ManageBakeries />} />
                    {/* <Route path='/getOrdersByBakeryId/:bakeryId' element={<OrderManagement />} />
                    <Route path='/getAllProductsByBakeryId/:bakeryId' element={<ManageProducts/>} /> */}
                </Route>
            </Route>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
    );
};


export default AppRoutes;
