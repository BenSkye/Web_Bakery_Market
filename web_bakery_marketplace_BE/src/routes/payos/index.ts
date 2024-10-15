import { Router } from 'express';
import checkoutController from '../../controllers/checkout.controller';

const payosRouter = Router();

payosRouter.get('/return-product-payment', checkoutController.getPayOsReturn);
payosRouter.get('/cancel-product-payment', checkoutController.getPayOsCancel);




export default payosRouter;
