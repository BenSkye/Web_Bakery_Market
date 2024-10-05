import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import { apiKey, permission } from '../../auth/checkAuth';
import OrderProductController from '../../controllers/orderproduct.controller';

const oderProductRouter = Router();

//authentication//
oderProductRouter.use(authentication);
////////////////////////////
oderProductRouter.use(apiKey)
oderProductRouter.get('/get-personal-order-product', permission('member'), OrderProductController.getPersonalOderProduct);
oderProductRouter.get('/get-order-product-by-bakery-id/:bakeryId', permission('shop'), OrderProductController.getOderProductByBakeryId);
oderProductRouter.get('/get-order-product-by-id/:orderProductId', OrderProductController.getOrderProductById);
export default oderProductRouter;
