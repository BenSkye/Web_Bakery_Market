import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import { apiKey, permission } from '../../auth/checkAuth';
import workshopController from '../../controllers/workshop.controller';

const workshopRouter = Router();

workshopRouter.get('/list', workshopController.getWorkshops);
workshopRouter.get('/get-by-id/:id', workshopController.getWorkshopById);


//authentication//
workshopRouter.use(authentication);
////////////////////////////
workshopRouter.use(apiKey)
workshopRouter.use(permission('shop'));
workshopRouter.post('/create', workshopController.createWorkshop);

export default workshopRouter;
