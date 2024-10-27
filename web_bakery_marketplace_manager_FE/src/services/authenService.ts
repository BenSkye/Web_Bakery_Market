import apiClient from "./apiClient";
import Cookies from 'js-cookie';

interface UserData {
    email: string;
    password: string;

}

interface ErrorResponse {
    message: string;
}

export const signup = async (data: UserData) => {
    try {
        const response = await apiClient.post('/user/signup', data);
        console.log('response:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Error signup:', error);
        return error.response.data;
        throw error;
    }
};

export const login = async (data: unknown) => {
    try {
        const response = await apiClient.post('/user/login', data);

        console.log('response:', response.data);


        // Kiểm tra vai trò của người dùng
        const userRoles = response.data.metadata.user.roles;
        if (!userRoles.includes('shop')) {
            throw new Error('Access denied. Only shop users are allowed.');
        }


        console.log('response:', response.data);
        Cookies.set('x-api-key', response.data.metadata.apiKey);
        Cookies.set('x-client-id', response.data.metadata.user._id);
        Cookies.set('authorization', response.data.metadata.tokens.accessToken);
        Cookies.set('x-refresh-token', response.data.metadata.tokens.refreshToken);
        return response.data;
    } catch (error: unknown) {
        console.error('Error login:', error);
        if (error instanceof Error && error.message === 'Access denied. Only shop users are allowed.') {
            return { error: error.message };
        }
        return (error as { response?: { data: ErrorResponse } }).response?.data || { error: 'An error occurred during login' };
    }
};

export const SignUpManager = async (data: unknown) => {
    try {
        const response = await apiClient.post('/user/signup', data);
        console.log('response:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Error signup:', error);
        return error.response.data;
        throw error;
    }
}

export const forgotPassword = async (data: { email: string }) => {
    try {
        const response = await apiClient.post('/user/forgot-password', data);
        console.log('response forgotpassword:', response.data);

        return response.data.metadata;
    } catch (error: unknown) {
        console.error('Error forgotPassword:', error);
        return error.response.data;
        throw error;
    }
}

export const forgotPasswordManager = async (data: { email: string }) => {
    try {
        const response = await apiClient.post('/user/forgot-password-manager', data);
        console.log('response forgotpassword:', response.data);

        return response.data.metadata;
    } catch (error: unknown) {
        console.error('Error forgotPassword:', error);
        return error.response.data;
        throw error;
    }
}

export const resetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await apiClient.post(`/user/reset-password/${token}`, { newPassword });
        console.log('response:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Error resetPassword:', error);
        // Ensure that we only return error.response.data if it exists
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
};

export const getManagerProfile = async (id: string) => {
    const response = await apiClient.get(`/user/profile/${id}`);
    return response.data;
};

export const updateManagerProfile = async (id: string, data: unknown) => {
    const response = await apiClient.put(`/user/profile/${id}`, data);
    return response.data;
};
