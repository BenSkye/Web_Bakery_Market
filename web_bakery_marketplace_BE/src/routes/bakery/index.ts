import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import bakeryController from '../../controllers/bakery.controller';
import { apiKey, permission } from '../../auth/checkAuth';

const bakeryRouter = Router();



//authentication//
bakeryRouter.use(authentication);
////////////////////////////
bakeryRouter.use(apiKey)
bakeryRouter.use(permission('shop'));
bakeryRouter.post('/create', bakeryController.createBakery);


export default bakeryRouter;
