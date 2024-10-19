import apiClient from './apiClient';

export const getCategories = async () => {
    try {
        const response = await apiClient.get('/category/list');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};