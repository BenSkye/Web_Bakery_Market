import { Router, Request, Response } from 'express';
import accessRouter from './access';

const router = Router();

router.use('/v1/api', accessRouter);

// router.get('/', (req: Request, res: Response) => {
//   return res.status(200).json({
//     message: 'Welcome to web_bakery_marketplace_BE',
//   });
// });

export default router;
