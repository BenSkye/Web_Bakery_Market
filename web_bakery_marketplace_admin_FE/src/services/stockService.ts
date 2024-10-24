import apiClient from './apiClient'; 

export const addStockToInventory = async (productId: string, quantity: number) => {
    return await apiClient.put(`/inventories/add-stock`, { 
        product_id: productId, 
        quantity 
    });
};

export const removeStockFromInventory = async (productId: string, quantity: number) => {
    return await apiClient.put(`/inventories/remove-stock`, { 
        product_id: productId, 
        quantity 
    });
};

