import apiClient from "./apiClient";


export const createOrder = async (order: any) => {
    try {
        const response = await apiClient.post('/checkout/oder-by-user', order);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};
