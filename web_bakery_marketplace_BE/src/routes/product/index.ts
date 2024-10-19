import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import bakeryController from '../../controllers/bakery.controller';
import { apiKey, permission } from '../../auth/checkAuth';
import productController from '../../controllers/product.controller';

const productRouter = Router();

productRouter.get('/get-list', productController.getProducts);
productRouter.get('/get-by-id/:id', productController.getProductById);
productRouter.get('/get-by-bakery/:bakeryId', productController.getProductsByBakery);
productRouter.put('/update/:id', productController.updateProduct);

//authentication//
productRouter.use(authentication);
////////////////////////////
productRouter.use(apiKey)
productRouter.use(permission('shop'));
productRouter.post('/create', productController.createProduct);

export default productRouter;
