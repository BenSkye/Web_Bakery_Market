import { NextFunction, Response } from "express";
import { SuccessResponse } from "../core/success.response";
import { asyncHandler } from "../helpers/asyncHandler";
import OrderService from "../services/order.service";

class OrderController {
    getOrderByBakeryId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Order By Bakery Id successfully',
            metadata: await OrderService.getOrdersByBakeryId(req.params.bakeryId),
        }).send(res);
    });
}

export default new OrderController();
