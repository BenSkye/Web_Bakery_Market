import { SuccessResponse } from '../core/success.response';
import { asyncHandler } from '../helpers/asyncHandler';
import { NextFunction, Response } from 'express';
import UserNewService from '../services/userNew.service';

class UserController {
    getAllUserByRole = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get users successfully',
            metadata: await UserNewService.getAllUserByRole(req.query.role),
        }).send(res);
    });
}

export default new UserController();


