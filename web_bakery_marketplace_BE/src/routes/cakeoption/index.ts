import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import { apiKey, permission } from '../../auth/checkAuth';
import cakeoptionController from '../../controllers/cakeoption.controller';

const cakeoptionRouter = Router();

cakeoptionRouter.get('/get-by-bakery-id/:bakeryId', cakeoptionController.getCakeOptionByBakeryId);

//authentication//
cakeoptionRouter.use(authentication);
////////////////////////////
cakeoptionRouter.use(apiKey)
cakeoptionRouter.use(permission('shop'));
cakeoptionRouter.post('/create', cakeoptionController.createCakeOption);


export default cakeoptionRouter;
