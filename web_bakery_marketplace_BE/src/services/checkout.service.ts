import { BadRequestError } from "../core/error.response";
import cartRepo from "../repositories/cart.repo"
import orderRepo from "../repositories/order.repo";
import productRepo from "../repositories/product.repo";
import { acquireLock, releaseLock } from "./redis.service";
import orderProductRepo from "../repositories/oder_product.repo";
import VnpayService from "./vnpay.service";
class CheckoutService {
    static checkoutReview = async (userId: String, product_list: any) => {
        const cart = await cartRepo.findCart({ user_id: userId });
        if (!cart) {
            throw new BadRequestError('Cart not found');
        }
        const checkout_oder = {
            total_price: 0,
        }

        // calculate total price
        for (const product of product_list) {
            const product_detail = await productRepo.getProductById(product.product_id, ['price']);
            if (!product_detail) {
                throw new BadRequestError('Product not found');
            }
            checkout_oder.total_price += product_detail.price * product.quantity;
        }
        return {
            product_list,
            checkout_oder
        };
    }

    static oderByUser = async (userId: string, product_list: Object, user_address: Object, payment_method: string, req: any) => {
        const checkout_info = await this.checkoutReview(userId, product_list);

        //check if it has enough stock
        console.log("[1]::", checkout_info.product_list);
        const acquireProduct = [];
        for (const product of checkout_info.product_list) {
            const { product_id, quantity } = product;
            const keyLock = await acquireLock(product_id, quantity);
            acquireProduct.push(keyLock ? true : false);
            console.log('keyLock:::', keyLock);
            if (keyLock) {
                await releaseLock(keyLock);
            }
        }

        if (acquireProduct.includes(false)) {
            throw new BadRequestError('Product stock is not enough');
        }

        //create oder
        const order_products = [];
        for (const product of checkout_info.product_list) {
            const { product_id, quantity } = product;
            const product_detail = await productRepo.getProductById(product_id, ['_id', 'price', 'bakery']);
            if (!product_detail) {
                throw new BadRequestError('Product not found');
            }
            const newOrderProduct = await orderProductRepo.createOderProduct(
                userId, product_id, product_detail.bakery, quantity, product_detail.price * quantity, user_address, payment_method
            );

            order_products.push(product_detail._id);
        }
        const newOder = await orderRepo.createOder(userId, order_products, checkout_info.checkout_oder, user_address, payment_method);

        //create succes, remove product in cart
        if (newOder) {
            for (const product of checkout_info.product_list) {
                const { product_id, quantity } = product;
                await cartRepo.removeProductFromCart(userId, product_id);
            }
        }
        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log('ipAddr:::', ipAddr);
        const paymentInfo = {
            orderId: newOder._id.toString(),
            amount: checkout_info.checkout_oder.total_price,
            orderDescription: 'thanh toan don hang' + newOder._id.toString(),
            language: 'vn',
            ipAddr: ipAddr
        }
        const vnpayService = new VnpayService();
        const paymentUrl = await vnpayService.createPaymentUrl(paymentInfo);

        return {
            paymentUrl,
            newOder
        };
    }
}
export default CheckoutService;

