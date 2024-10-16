import { Router } from 'express';
import OrderController from '../../controllers/order.controller';
import { authentication } from '../../auth/authUtils';
import { apiKey, permission } from '../../auth/checkAuth';

const orderRouter = Router();

orderRouter.use(authentication);
orderRouter.use(apiKey);

// orderRouter.get('/get-order-by-bakery-id/:bakeryId', permission('shop'), OrderController.getOrderByBakeryId);

export default orderRouter;

