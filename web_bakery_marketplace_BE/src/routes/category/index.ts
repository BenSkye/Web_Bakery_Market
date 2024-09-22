import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import bakeryController from '../../controllers/bakery.controller';
import { apiKey, permission } from '../../auth/checkAuth';
import categoryController from '../../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/list', categoryController.getListCategory);

//authentication//
categoryRouter.use(authentication);
////////////////////////////
categoryRouter.use(apiKey)
categoryRouter.use(permission('admin'));
categoryRouter.post('/create', categoryController.createCategory);
categoryRouter.put('/active/:id', categoryController.activeCategory);

export default categoryRouter;
