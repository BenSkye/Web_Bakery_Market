import { NextFunction, Request, Response } from 'express';
import { CREATED, SuccessResponse } from '../core/success.response';
import { asyncHandler } from '../helpers/asyncHandler';
import CakeOptionService from '../services/cakeoption.service';

class CakeOptionController {
    createCakeOption = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Create new cake option successfully',
            metadata: await CakeOptionService.createCakeOption(req.body),
        }).send(res);
    });

    getCakeOptionByBakeryId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get cake option by bakery id successfully',
            metadata: await CakeOptionService.getCakeOptionByBakeryId(req.params.bakeryId),
        }).send(res);
    });
}

export default new CakeOptionController();
