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


export const getPersonalOrderCustomCake = async () => {
    try {
        const response = await apiClient.get(`/order-product/get-personal-order-cake-design`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bakeries:', error);
        throw error;
    }
};

export const getOrderProductById = async (id: any) => {
    try {
        const response = await apiClient.get(`/order-product/get-order-product-by-id/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order product:', error);
        throw error;
    }
};



