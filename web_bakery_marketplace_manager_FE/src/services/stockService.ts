import apiClient from './apiClient'; 

export const updateStock = {
    addStockToInventory: (productId: string, quantity: number) => apiClient.put(`/inventories/add-stock`, { productId, quantity }),
    removeStockFromInventory: (productId: string, quantity: number) => apiClient.put(`/inventories/remove-stock`, { productId, quantity }),
};

