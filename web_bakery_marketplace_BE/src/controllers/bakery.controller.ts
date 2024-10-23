import { NextFunction, Request, Response } from 'express';
import AccessService from '../services/access.service';
import { CREATED, SuccessResponse } from '../core/success.response';
import { asyncHandler } from '../helpers/asyncHandler';
import BakeryService from '../services/bakery.service';

class BakeryController {
    createBakery = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Create new bakery successfully',
            metadata: await BakeryService.createBakery(req.body, req.keyStore.user),
        }).send(res);
    });

    getBakeryById = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get bakery by id successfully',
            metadata: await BakeryService.getBakeryById(req.params.id),
        }).send(res);
    });

    getBakeries = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        console.log('getBakeries');
        new SuccessResponse({
            message: 'Get bakeries successfully',
            metadata: await BakeryService.getBakeries(),
        }).send(res);
    });

    getBakeryByUserId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get bakery by user id successfully',
            metadata: await BakeryService.getBakeryByUserId(req.keyStore.user),
        }).send(res);
    });
    updateStatusBakery = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Update status bakery successfully',
            metadata: await BakeryService.updateStatusBakery(req.params.id, req.body.status),
        }).send(res);
    });

    searchBakeries = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Search bakeries successfully',
            metadata: await BakeryService.searchBakeries(req.query.query),
        }).send(res);
    });
}
export default new BakeryController();
