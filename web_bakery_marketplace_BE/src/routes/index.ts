import { Router, Request, Response } from 'express';
import accessRouter from './access';
import { apiKey, permission } from '../auth/checkAuth';
import bakeryRouter from './bakery';
import categoryRouter from './category';
import productRouter from './product';
import cartRouter from './cart';
import checkoutRouter from './checkout';
import inventoryRouter from './inventory';
import workshopRouter from './workshop';
import vnpayRouter from './vnpay';

const router = Router();

//check apiKey
// router.use(apiKey)
//check permission
// router.use(permission('customer'))
router.use('/v1/api/inventories', inventoryRouter);
router.use('/v1/api/category', categoryRouter);
router.use('/v1/api/bakery', bakeryRouter);
router.use('/v1/api/product', productRouter);
router.use('/v1/api/cart', cartRouter);
router.use('/v1/api/checkout', checkoutRouter);
router.use('/v1/api/user', accessRouter);
router.use('/v1/api/workshop', workshopRouter);
router.use('/v1/api/vnpay', vnpayRouter);

export default router;
