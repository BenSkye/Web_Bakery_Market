import apiClient from './apiClient';
import { OrderProduct } from './ordersProductService';

export interface Order {
    _id: string;
    user_id: string;
    bakery_id: string;
    order_products: OrderProduct[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const getOrdersByBakeryId = async (bakeryId: string) => {
    const response = await apiClient.get<OrderProduct[]>(`order/get-order-by-bakery-id/${bakeryId}`);
    return response.data;
};

