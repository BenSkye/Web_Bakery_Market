import { ObjectId, Types } from "mongoose";
import { cartModel } from "../models/cart.model";
import { convertObjectId } from "../utils";
import { NotFoundError } from "../core/error.response";

class CartRepository {

    async findCart(filter: any) {
        return await cartModel.findOne(filter).populate('cart_products.product_id', 'price name');
    }

    async createCart(userId: string) {
        const userObjectId = convertObjectId(userId);
        console.log('userId', userObjectId);

        const newCart = cartModel.create({
            user_id: userId,
            cart_products: [],
            cart_count_products: 0
        })
        return await newCart;
    }

    async addToCart(userId: string, productData: {
        product_id: string,
        quantity: number,
    }) {
        const query = { user_id: userId };
        const update = {
            $push: { cart_products: { ...productData, product_id: productData.product_id } },
            $inc: { cart_count_products: productData.quantity }
        };
        const options = { upsert: true, new: true };
        return await cartModel.findOneAndUpdate(query, update, options).populate('cart_products.product_id', 'price name');
    }

    async removeProductFromCart(userId: string, productId: string) {
        const query = { user_id: userId };
        const cart = await this.findCart(query);
        if (!cart) { throw new NotFoundError('Cart not found') }
        const productToRemove = cart?.cart_products.find(p => p.product_id._id.toString() === productId);
        const quantityToRemove = productToRemove ? productToRemove.quantity : 0;
        cart.cart_products.pull({ product_id: productId });
        cart.cart_count_products -= quantityToRemove;
        await cart.save();
        return await this.findCart({ user_id: userId });

    }

    async updateProductQuantity(userId: string, productId: string, newQuantity: number) {
        const cart = await this.findCart({ user_id: userId });
        if (!cart) { throw new Error('Cart not found') }
        console.log('cart', cart)
        const productIndex = cart?.cart_products.findIndex(p => p.product_id._id.toString() === productId);
        if (productIndex === -1 || productIndex === undefined) throw new Error('Product not found in cart');
        const old_cart_count_products = cart?.cart_count_products || 0;
        const quantityDifference = newQuantity - (cart?.cart_products[productIndex].quantity || 0);

        const new_cart_count_products = old_cart_count_products + quantityDifference;

        cart.cart_products[productIndex].quantity = newQuantity;
        cart.cart_count_products = new_cart_count_products;

        await cart.save();
        return await this.findCart({ user_id: userId });
    }

    async clearCart(userId: string) {
        const query = { user_id: convertObjectId(userId) };
        const update = {
            $set: { cart_products: [], cart_count_products: 0 }
        };
        const options = { new: true };
        return await cartModel.findOneAndUpdate(query, update, options).populate('cart_products.product_id', 'price name');
    }

    async calculateCartTotal(userId: string) {
        const result = await cartModel.aggregate([
            { $match: { user_id: convertObjectId(userId) } },
            { $unwind: '$cart_products' },
            { $lookup: { from: 'Products', localField: 'cart_products.product_id', foreignField: '_id', as: 'product' } },
            { $unwind: '$product' },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $multiply: ['$cart_products.quantity', '$product.price'] } }
                }
            }
        ]);
        return result.length > 0 ? result[0].total : 0;
    }
}

export default new CartRepository();