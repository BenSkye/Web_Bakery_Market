import { NextFunction, Request, Response } from 'express';
import AccessService from '../services/access.service';
import { CREATED, SuccessResponse } from '../core/success.response';
import { asyncHandler } from '../helpers/asyncHandler';
import BakeryService from '../services/bakery.service';
import CategoryService from '../services/category.service';

class CategoryController {
    createCategory = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Create new category successfully',
            metadata: await CategoryService.createCategory(req.body),
        }).send(res);
    });

}
export default new CategoryController();
