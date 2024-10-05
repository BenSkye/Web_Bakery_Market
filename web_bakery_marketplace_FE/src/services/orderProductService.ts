import apiClient from "./apiClient";

export const getPersonalOrderProduct = async () => {
    try {
        const response = await apiClient.get(`/order-product/get-personal-order-product`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bakeries:', error);
        throw error;
    }
};
