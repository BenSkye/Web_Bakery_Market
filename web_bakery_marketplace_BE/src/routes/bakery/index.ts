import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import bakeryController from '../../controllers/bakery.controller';
import { apiKey, permission } from '../../auth/checkAuth';

const bakeryRouter = Router();


bakeryRouter.get('/get-list', bakeryController.getBakeries);
bakeryRouter.get('/get-by-id/:id', bakeryController.getBakeryById);



//authentication//
bakeryRouter.use(authentication);
////////////////////////////
bakeryRouter.use(apiKey)
bakeryRouter.post('/create', permission('shop'), bakeryController.createBakery);
bakeryRouter.get('/get-by-user-id/:user_id', permission('shop'), bakeryController.getBakeryByUserId);


export default bakeryRouter;
