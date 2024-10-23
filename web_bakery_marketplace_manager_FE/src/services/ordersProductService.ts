import apiClient from './apiClient';

export interface OrderProduct {
    _id: string;
    user_id: string;
    bakery_id: string;
    quantity: number;
    price: number;
    address: {
        name: string;
        phone: string;
        address: string;
    };
    customCake?: unknown;
    isCustomCake: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const getOrdersProductByBakeryId = async (bakeryId: string) => {
    const response = await apiClient.get<OrderProduct[]>(`order-product/get-order-product-by-bakery-id/${bakeryId}`);
    return response.data;
};


export const changeStatusOrderProduct = async (orderProductId: string, status: string) => {
    const response = await apiClient.put(`order-product/change-status-order-product/${orderProductId}`, { status });
    return response.data;
};

export const getOrderProductStatisticsByBakeryId = async (bakeryId: string, startDate: string, endDate: string) => {
    const response = await apiClient.post(`order-product/get-order-product-statistics-by-bakery-id/${bakeryId}`, { startDate, endDate });
    return response.data;
};

export const getCashFlowByBakeryId = async (bakeryId: string, startDate: string, endDate: string) => {
    const response = await apiClient.post(`order-product/get-cash-flow-by-bakery-id/${bakeryId}`, { startDate, endDate });
    return response.data;
};

