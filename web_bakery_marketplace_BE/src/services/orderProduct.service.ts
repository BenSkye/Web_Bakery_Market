import order_product_repo from "../repositories/oder_product.repo";

class OrderProductService {
    static getPersonalOderProduct = async (userId: string) => {
        return await order_product_repo.getPersonalOderProduct(userId);
    }

    static getOderProductByBakeryId = async (bakeryId: string) => {
        return await order_product_repo.getOderProductByBakeryId(bakeryId);
    }

}
export default OrderProductService;