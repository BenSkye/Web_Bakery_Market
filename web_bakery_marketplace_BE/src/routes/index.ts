import { Router, Request, Response } from 'express';
import accessRouter from './access';
import { apiKey, permission } from '../auth/checkAuth';
import bakeryRouter from './bakery';
import categoryRouter from './category';
import productRouter from './product';
import cartRouter from './cart';

const router = Router();

//check apiKey
// router.use(apiKey)
//check permission
// router.use(permission('customer'))

router.use('/v1/api/category', categoryRouter);
router.use('/v1/api/bakery', bakeryRouter);
router.use('/v1/api/product', productRouter);
router.use('/v1/api/cart', cartRouter);
router.use('/v1/api/user', accessRouter);

export default router;
