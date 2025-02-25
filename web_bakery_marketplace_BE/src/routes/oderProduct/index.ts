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
oderProductRouter.get('/get-personal-order-cake-design', permission('member'), OrderProductController.getPersonalOderCakeDesign);
oderProductRouter.get('/get-order-product-by-bakery-id/:bakeryId', permission('shop'), OrderProductController.getOderProductByBakeryId);
oderProductRouter.get('/get-order-product-by-id/:orderProductId', OrderProductController.getOrderProductById);
oderProductRouter.put('/accept-order-product/:orderProductId', permission('shop'), OrderProductController.acceptOrderProduct);
oderProductRouter.put('/reject-order-product/:orderProductId', permission('shop'), OrderProductController.rejectOrderProduct);
oderProductRouter.put('/change-status-order-product/:orderProductId', permission('shop'), OrderProductController.changeStatusOrderProduct);
oderProductRouter.put('/get-order-product', permission('admin'), OrderProductController.getOrderProduct);
oderProductRouter.get('/get-order-product-statistics', permission('shop'), OrderProductController.getOrderProductStatistics);
oderProductRouter.post('/get-order-product-statistics-by-bakery-id/:bakeryId', permission('shop'), OrderProductController.getOrderProductStatisticsByBakeryId);
oderProductRouter.post('/get-cash-flow-by-bakery-id/:bakeryId', permission('shop'), OrderProductController.getCashFlowByBakeryId);
oderProductRouter.get('/get-order-product-statistics-and-cash-flow-bakeries', permission('admin'), OrderProductController.getOrderProductStatisticsAndCashFlowBakeries);

export default oderProductRouter;
