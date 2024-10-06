import apiClient from "./apiClient";


export const getCakeOptionByBakeryId = async (bakeryId: string) => {
    try {
        const response = await apiClient.get(`/cakeoption/get-by-bakery-id/${bakeryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cake options:', error);
        throw error;
    }
}

