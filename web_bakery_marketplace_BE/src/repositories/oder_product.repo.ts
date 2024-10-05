import { Types } from "mongoose";
import { orderProductModel } from "../models/oderProduct.model";
import { convertObjectId } from "../utils";


class OrderProductRepo {
    async createOderProduct(userId: string, productId: string, bakeryId: Types.ObjectId, quantity: number, price: number, address: Object, payment_method: string) {
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
        return await orderProductModel.find({ user_id: userId }).populate('product_id', 'name thumbnail');
    }
    async getOderProductByBakeryId(bakeryId: string) {
        return await orderProductModel.find({ bakery_id: bakeryId });
    }
    async getOderProductById(oderProductId: string) {
        return await orderProductModel.findById(oderProductId);
    }
    async updateOderProduct(oderProductId: string, update: Object) {
        return await orderProductModel.findByIdAndUpdate(oderProductId, update, { new: true, upsert: true });
    }
    async deleteOderProduct(oderProductId: string) {
        return await orderProductModel.findByIdAndDelete(oderProductId);
    }
    async getOrderProductById(orderProductId: string) {
        return await orderProductModel.findById(orderProductId);
    }

}

export default new OrderProductRepo();