import { NextFunction } from "express";
import { SuccessResponse } from "../core/success.response";
import { asyncHandler } from "../helpers/asyncHandler";
import WorkshopService from "../services/workshop.service";

class WorkshopController {
    createWorkshop = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const { userId } = req.user;
        const data = req.body;
        const workshop = await WorkshopService.createWorkshop(req.keyStore.user, data);
        new SuccessResponse({
            message: 'Create workshop successfully',
            metadata: workshop
        }).send(res);
    });

    getWorkshops = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const workshops = await WorkshopService.getWorkshops();
        new SuccessResponse({
            message: 'Get workshops successfully',
            metadata: workshops
        }).send(res);
    });

    getWorkshopById = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const workshop = await WorkshopService.getWorkshopById(id);
        new SuccessResponse({
            message: 'Get workshop by id successfully',
            metadata: workshop
        }).send(res);
    });
}

export default new WorkshopController();