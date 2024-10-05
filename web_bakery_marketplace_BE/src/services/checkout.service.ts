import { BadRequestError } from "../core/error.response";
import cartRepo from "../repositories/cart.repo"
import orderRepo from "../repositories/order.repo";
import productRepo from "../repositories/product.repo";
import { acquireLock, releaseLock } from "./redis.service";
import orderProductRepo from "../repositories/oder_product.repo";
import VnpayService from "./vnpay.service";
import inventoryRepo from "../repositories/inventory.repo";
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

            order_products.push(newOrderProduct._id);
        }
        const newOder = await orderRepo.createOder(userId, order_products, checkout_info.checkout_oder, user_address, payment_method);


        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log('ipAddr:::', ipAddr);
        const paymentInfo = {
            orderId: newOder._id.toString(),
            amount: checkout_info.checkout_oder.total_price,
            orderDescription: 'thanh toan don hang ' + newOder._id.toString(),
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

    static getVnpayReturn = async (reqQuery: any) => {
        console.log('reqQuery:::', reqQuery);
        const order_products = [];
        if (reqQuery.vnp_ResponseCode === '00') {
            //update order status and remove prouduct in cart
            const order = await orderRepo.getOderById(reqQuery.vnp_TxnRef);
            console.log(order)
            if (order) {
                for (const orderProductID of order.order_products) {
                    const orderProduct = await orderProductRepo.getOderProductById(orderProductID.toString());
                    if (orderProduct) {
                        const updateOderProduct = await orderProductRepo.updateOderProduct(orderProduct._id.toString(), { status: 'confirmed' });
                        console.log("updateOderProduct", updateOderProduct)
                        order_products.push(updateOderProduct);
                        //payment success, remove product in cart
                        await cartRepo.removeProductFromCart(order.user_id.toString(), orderProduct.product_id.toString());
                    }
                }

            }
            else {
                throw new BadRequestError('Order not found');
            }
        }
        else {
            //delete order,product order and update stock
            const order = await orderRepo.getOderById(reqQuery.vnp_TxnRef);
            if (order) {
                for (const orderProductID of order.order_products) {
                    const orderProduct = await orderProductRepo.getOderProductById(orderProductID.toString());
                    if (orderProduct) {
                        const quantity = orderProduct.quantity;
                        const updateInventory = await inventoryRepo.updateInventory(orderProduct.product_id.toString(), quantity);
                        console.log("updateInventory", updateInventory)
                        await orderProductRepo.deleteOderProduct(orderProduct._id.toString());
                    }
                }
                await orderRepo.deleteOder(order._id.toString());
            }
            throw new BadRequestError('Payment failed');
        }
        return {
            order_products
        }
    }
}
export default CheckoutService;

