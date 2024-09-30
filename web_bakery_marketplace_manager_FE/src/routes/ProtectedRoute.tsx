import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../stores/authContex';

interface ProtectedRouteProps {
    element: React.ReactNode; // Element mà bạn muốn bảo vệ
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user } = useAuth(); // Lấy thông tin người dùng từ context

    // Nếu không có user, chuyển hướng đến trang đăng nhập
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Nếu có user, trả về element được truyền vào
    return <>{element}</>;
};

export default ProtectedRoute;
