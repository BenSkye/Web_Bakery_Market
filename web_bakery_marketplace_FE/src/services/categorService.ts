import apiClient from "./apiClient";

export const getListCategory = async () => {
    try {
        const response = await apiClient.get(`/category/list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bakeries:', error);
        throw error;
    }
};
