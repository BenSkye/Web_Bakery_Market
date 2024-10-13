import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../stores/authContex';
import { Spin } from 'antd';

interface ProtectedRouteProps {
    element: React.ReactNode; // Element mà bạn muốn bảo vệ
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user, isLoading } = useAuth(); // Lấy thông tin người dùng từ context

    if (isLoading) {
        return <Spin />;
    }

    // Nếu không có user, chuyển hướng đến trang đăng nhập
    if (!user) {
        console.log('user', user);
        return <Navigate to="/login" replace />;
    }

    // Nếu có user, trả về element được truyền vào
    return <>{element}</>;
};

export default ProtectedRoute;
