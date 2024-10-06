import { NextFunction } from "express";
import { SuccessResponse } from "../core/success.response";
import { asyncHandler } from "../helpers/asyncHandler";
import OrderProductService from "../services/orderProduct.service";

class OrderProductController {
    getPersonalOderProduct = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Personal Oder Product successfully',
            metadata: await OrderProductService.getPersonalOderProduct(req.keyStore.user),
        }).send(res);
    });

    getOderProductByBakeryId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Oder Product By Bakery Id successfully',
            metadata: await OrderProductService.getOderProductByBakeryId(req.params.bakeryId),
        }).send(res);
    });

    getOrderProductById = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Order Product By Id successfully',
            metadata: await OrderProductService.getOrderProductById(req.params.orderProductId),
        }).send(res);
    });

    acceptOrderProduct = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Accept Order Product successfully',
            metadata: await OrderProductService.acceptOrderProduct(req.params.orderProductId),
        }).send(res);
    });

    rejectOrderProduct = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Reject Order Product successfully',
            metadata: await OrderProductService.rejectOrderProduct(req.params.orderProductId),
        }).send(res);
    });
}

export default new OrderProductController();