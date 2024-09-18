import { Response, NextFunction } from 'express';
import CartService from '../services/cart.service';
import { OK, CREATED } from '../core/success.response';
import { asyncHandler } from '../helpers/asyncHandler';

class CartController {
    createCart = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Cart created successfully',
            metadata: await CartService.createCart(req.keyStore.user),
        }).send(res);
    });

    addToCart = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new OK({
            message: 'Update cart successfully',
            metadata: await CartService.addToCart(req.keyStore.user, req.body.productData),
        }).send(res);
    });

    removeFromCart = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new OK({
            message: 'Product removed from cart successfully',
            metadata: await CartService.removeFromCart(req.keyStore.user, req.params.productId),
        }).send(res);
    });

    updateProductQuantity = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new OK({
            message: 'Product quantity updated successfully',
            metadata: await CartService.updateProductQuantity(req.keyStore.user, req.params.productId, req.body.quantity),
        }).send(res);
    });

    clearCart = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new OK({
            message: 'Cart cleared successfully',
            metadata: await CartService.clearCart(req.keyStore.user),
        }).send(res);
    });

    getCartTotal = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new OK({
            message: 'Cart total retrieved successfully',
            metadata: await CartService.getCartTotal(req.keyStore.user),
        }).send(res);
    });

    getCart = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new OK({
            message: 'Cart retrieved successfully',
            metadata: await CartService.getCart(req.keyStore.user),
        }).send(res);
    });
}

export default new CartController();