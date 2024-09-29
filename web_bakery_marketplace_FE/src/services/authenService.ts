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

// export const login = async (data: unknown) => {
//     try {
//         const response = await apiClient.post('/user/login', data);
//         console.log('response:', response.data);
//         Cookies.set('x-api-key', response.data.metadata.apiKey);
//         Cookies.set('x-client-id', response.data.metadata.user._id);
//         Cookies.set('authorization', response.data.metadata.tokens.accessToken);
//         Cookies.set('x-refresh-token', response.data.metadata.tokens.refreshToken);

//         return response.data;
//     } catch (error) {
//         console.error('Error signup:', error);
//         return error.response.data;
//         throw error;
//     }
// };

export const forgotPassword = async (data: any) => {
    try {
        const response = await apiClient.post('/user/forgot-password', data);
        console.log('response forgotpassword:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error forgotPassword:', error);
        return { status: error.response?.status, message: error.response?.data.message };
    }
}



export const resetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await apiClient.post(`/user/reset-password/${token}`, { newPassword });
        console.log('response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error resetPassword:', error);
        // Ensure that we only return error.response.data if it exists
        return error.response ? error.response.data : { message: 'An error occurred' };
    }
};

