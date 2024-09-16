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
