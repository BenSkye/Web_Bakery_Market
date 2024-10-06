import { NotFoundError } from "../core/error.response";
import order_product_repo from "../repositories/oder_product.repo";

class OrderProductService {
    static getPersonalOderProduct = async (userId: string) => {
        return await order_product_repo.getPersonalOderProduct(userId);
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
        return await order_product_repo.changeStatusOrderProduct(orderProductId, 'confirmed');
    }

    static rejectOrderProduct = async (orderProductId: string) => {
        return await order_product_repo.changeStatusOrderProduct(orderProductId, 'rejected');
    }


}
export default OrderProductService;