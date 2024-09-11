import { Router, Request, Response } from 'express';
import accessRouter from './access';
import { apiKey, permission } from '../auth/checkAuth';
import bakeryRouter from './bakery';

const router = Router();

//check apiKey
// router.use(apiKey)
//check permission
// router.use(permission('customer'))


router.use('/v1/api', accessRouter);
router.use('/v1/api/bakery', bakeryRouter);


export default router;
