import apiClient from "./apiClient";
import Cookies from 'js-cookie';
export const signup = async (data: unknown) => {
    try {
        const response = await apiClient.post('/user/signup', data);
        console.log('response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error signup:', error);
        return error.response.data;
        throw error;
    }
};

export const login = async (data: unknown) => {
    try {
        const response = await apiClient.post('/user/login', data);
        console.log('response:', response.data);
        Cookies.set('x-api-key', response.data.metadata.apiKey);
        Cookies.set('x-client-id', response.data.metadata.user._id);
        Cookies.set('authorization', response.data.metadata.tokens.accessToken);
        Cookies.set('x-refresh-token', response.data.metadata.tokens.refreshToken);
        return response.data;
    } catch (error: any) {
        console.error('Error signup:', error);
        return error.response.data;
        throw error;
    }
};

export const SignUpManager = async (data: unknown) => {
    try {
        const response = await apiClient.post('/user/signup', data);
        console.log('response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error signup:', error);
        return error.response.data;
        throw error;
    }
}