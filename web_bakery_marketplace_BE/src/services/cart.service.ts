import { BadRequestError, NotFoundError } from "../core/error.response";
import cartRepo from "../repositories/cart.repo";
import inventoryRepo from "../repositories/inventory.repo";
import { convertObjectId } from "../utils";

class CartService {

    static createCart = async (userId: string) => {
        return await cartRepo.createCart(userId);
    }

    static addToCart = async (userId: string, productData: {
        product_id: string,
        quantity: number,
    }) => {
        const inventory = await inventoryRepo.findInventory({ product_id: productData.product_id });
        if (!inventory || inventory.stock < productData.quantity) {
            throw new BadRequestError('Not enough stock');
        }
        const userCart = await cartRepo.findCart({ user_id: userId });
        if (!userCart) {
            const newCart = await cartRepo.createCart(userId);
            return await cartRepo.addToCart(userId, productData);
        }
        console.log('userCart', userCart);
        const productInCart = userCart.cart_products.find((product: any) => product.product_id._id.toString() === productData.product_id);
        console.log('productInCart', productInCart);
        if (productInCart) {
            return await cartRepo.updateProductQuantity(userId, productData.product_id, productData.quantity);
        }
        return await cartRepo.addToCart(userId, productData);
    }

    static removeFromCart = async (userId: string, productId: string) => {
        const userCart = await cartRepo.findCart({ user_id: userId });
        if (!userCart) {
            throw new NotFoundError('Cart not found');
        }
        return await cartRepo.removeProductFromCart(userId, productId);
    }

    static updateProductQuantity = async (userId: string, productId: string, quantity: number) => {
        const userCart = await cartRepo.findCart({ user_id: convertObjectId(userId) });
        if (!userCart) {
            throw new NotFoundError('Cart not found');
        }
        return await cartRepo.updateProductQuantity(userId, productId, quantity);
    }

    static clearCart = async (userId: string) => {
        const userCart = await cartRepo.findCart({ user_id: userId });
        if (!userCart) {
            throw new NotFoundError('Cart not found');
        }
        return await cartRepo.clearCart(userId);
    }

    static getCartTotal = async (userId: string) => {
        const userCart = await cartRepo.findCart({ user_id: userId });
        if (!userCart) {
            throw new NotFoundError('Cart not found');
        }
        return await cartRepo.calculateCartTotal(userId);
    }

    static getCart = async (userId: string) => {
        const userCart = await cartRepo.findCart({ user_id: userId });
        if (!userCart) {
            throw new NotFoundError('Cart not found');
        }
        return userCart;
    }
}

export default CartService;