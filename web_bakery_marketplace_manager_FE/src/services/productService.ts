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

export const addProduct = async (product: any) => {
    try {
        const response = await apiClient.post('/product/create', product);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProduct = async (productId: string, product: any) => {
    try {
        const response = await apiClient.put(`/product/update/${productId}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};
