import apiClient from './apiClient';

export const getUsersByRole = async (role: string) => {
    const response = await apiClient.get(`/user-service/get-all-user-by-role?role=${role}`);
    return response.data;
};

export const getStatisUser = async () => {
    const response = await apiClient.get('/user-service/statis-user');
    return response.data;
};
