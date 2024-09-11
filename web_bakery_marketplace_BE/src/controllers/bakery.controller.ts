import { NextFunction, Request, Response } from 'express';
import AccessService from '../services/access.service';
import { CREATED, SuccessResponse } from '../core/success.response';
import { asyncHandler } from '../helpers/asyncHandler';
import BakeryService from '../services/bakery.service';

class BakeryController {
    createBakery = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Create new bakery successfully',
            metadata: await BakeryService.createBakery(req.body, req.keyStore.user),
        }).send(res);
    });

}
export default new BakeryController();
