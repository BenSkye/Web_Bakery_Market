import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import { apiKey, permission } from '../../auth/checkAuth';
import CartController from '../../controllers/cart.controller';

const cartRouter = Router();

// Apply middleware
cartRouter.use(authentication);
cartRouter.use(apiKey);
cartRouter.use(permission('member'));

// Cart routes
cartRouter.post('/', CartController.createCart);
cartRouter.get('/get-cart', CartController.getCart);
cartRouter.post('/add-to-cart', CartController.addToCart);
cartRouter.delete('/remove/:productId', CartController.removeFromCart);
cartRouter.put('/update/:productId', CartController.updateProductQuantity);
cartRouter.delete('/clear', CartController.clearCart);
cartRouter.get('/total', CartController.getCartTotal);

export default cartRouter;
