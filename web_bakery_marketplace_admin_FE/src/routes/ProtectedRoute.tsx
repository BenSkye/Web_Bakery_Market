import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../stores/authContex';
import { Spin } from 'antd';

const ProtectedRoute: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Spin />;
    }

    if (!user) {
        console.log('user', user);
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;