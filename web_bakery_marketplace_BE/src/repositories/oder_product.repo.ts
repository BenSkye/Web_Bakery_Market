import { orderProductModel } from "../models/oderProduct.model";
import { convertObjectId } from "../utils";


class OrderProductRepo {
    async createOderProduct(userId: string, productId: string, bakeryId: string, quantity: number, price: number, address: Object, payment_method: string) {
        const newOder = {
            user_id: userId,
            product_id: productId,
            bakery_id: bakeryId,
            quantity: quantity,
            price: price,
            address: address,
            payment_method: payment_method,
        }

        return await orderProductModel.create(newOder);
    }

    async getPersonalOderProduct(userId: string) {
        return await orderProductModel.find({ user_id: userId });
    }
    async getOderProductByBakeryId(bakeryId: string) {
        return await orderProductModel.find({ bakery_id: bakeryId });
    }

}

export default new OrderProductRepo();