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

export const createOrderCakeDesign = async (orderCakeDesign: any) => {
    try {
        const response = await apiClient.post('/checkout/oder-by-user-cake-design', orderCakeDesign);
        return response.data;
    } catch (error) {
        console.error('Error creating order cake design:', error);
        throw error;
    }
};
