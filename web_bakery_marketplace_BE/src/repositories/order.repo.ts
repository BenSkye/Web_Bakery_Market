import { Types } from "mongoose";
import { categoryModel } from "../models/category.model";
import { ordersModel } from "../models/order.model";
import { convertObjectId } from "../utils";


class OrderRepo {
    async createOder(userId: string, order_products: Array<Types.ObjectId>, checkout: Object, shipping_address: Object, payment_method: string) {
        const newOder = {
            user_id: userId,
            order_products: order_products,
            checkout: checkout,
            shipping_address: shipping_address,
            payment_method: payment_method
        }

        return await ordersModel.create(newOder);
    }

    async getPersonalOder(userId: string) {
        return await ordersModel.find({ user_id: userId }).populate('order_products');
    }

}

export default new OrderRepo();