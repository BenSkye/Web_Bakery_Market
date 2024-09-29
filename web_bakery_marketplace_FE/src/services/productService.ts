import apiClient from "./apiClient";

export const getProductsByBakery = async (bakeryId: string) => {
    try {
        const response = await apiClient.get(`/product/get-by-bakery/${bakeryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bakeries:', error);
        throw error;
    }
};

export const getProductById = async (productId: string) => {
    try {
        const response = await apiClient.get(`/product/get-by-id/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

