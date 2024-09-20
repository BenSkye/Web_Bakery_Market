import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import { apiKey, permission } from '../../auth/checkAuth';
import checkoutController from '../../controllers/checkout.controller';

const checkoutRouter = Router();



//authentication//
checkoutRouter.use(authentication);
////////////////////////////
checkoutRouter.use(apiKey)
checkoutRouter.use(permission('member'));
checkoutRouter.get('/review', checkoutController.checkoutReview);
checkoutRouter.post('/oder-by-user', checkoutController.oderByUser);



export default checkoutRouter;
