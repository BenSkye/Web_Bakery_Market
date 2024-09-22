import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import { apiKey, permission } from '../../auth/checkAuth';
import inventoryController from '../../controllers/inventory,controller';

const inventoryRouter = Router();

//authentication//
inventoryRouter.use(authentication);
////////////////////////////
inventoryRouter.use(apiKey)
inventoryRouter.use(permission('shop'));
inventoryRouter.put('/add-stock', inventoryController.addStockToInventory);
inventoryRouter.put('/remove-stock', inventoryController.removeStockFromInventory);


export default inventoryRouter;
