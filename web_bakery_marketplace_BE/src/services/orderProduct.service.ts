import { NotFoundError } from "../core/error.response";
import order_product_repo from "../repositories/oder_product.repo";

class OrderProductService {
    static getPersonalOderProduct = async (userId: string) => {
        return await order_product_repo.getPersonalOderProduct(userId);
    }

    static getPersonalOderCakeDesign = async (userId: string) => {
        return await order_product_repo.getPersonalOderCakeDesign(userId);
    }

    static getOderProductByBakeryId = async (bakeryId: string) => {
        return await order_product_repo.getOderProductByBakeryId(bakeryId);
    }

    static getOrderProductById = async (orderProductId: string) => {
        const order_product = await order_product_repo.getOrderProductById(orderProductId);
        if (!order_product) {
            throw new NotFoundError("Order product not found");
        }
        return order_product;
    }

    static acceptOrderProduct = async (orderProductId: string) => {
        return await order_product_repo.changeStatusOrderProduct(orderProductId, 'confir    med');
    }

    static rejectOrderProduct = async (orderProductId: string) => {
        return await order_product_repo.changeStatusOrderProduct(orderProductId, 'rejected');
    }

    static changeStatusOrderProduct = async (orderProductId: string, status: string) => {
        return await order_product_repo.changeStatusOrderProduct(orderProductId, status);
    }
    static getOrderProduct = async (query: any) => {
        return await order_product_repo.getOrderProduct(query);
    }

    static getOrderProductStatistics = async (startDate: Date, endDate: Date) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return await order_product_repo.getOrderProductStatistics(start, end);
    }

    static getOrderProductStatisticsByBakeryId = async (bakeryId: string, startDate?: string, endDate?: string) => {
    let start: Date;
    let end: Date;

    console.log('Received dates:', { startDate, endDate });

    if (!startDate && !endDate) {
        // Nếu không có ngày nào được cung cấp, lấy 30 ngày gần nhất
        console.log('No date provided, using default range');
        end = new Date();
        start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else {
        // Nếu có ít nhất một ngày được cung cấp
        end = endDate ? new Date(endDate) : new Date();
        start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
        return await order_product_repo.getOrderProductStatisticsByBakeryId(bakeryId, start, end);
    }

    static getCashFlowByBakeryId = async (bakeryId: string, startDate?: string, endDate?: string) => {
        return await order_product_repo.getCashFlowByBakeryId(bakeryId, startDate, endDate);
    }

}

export default OrderProductService;