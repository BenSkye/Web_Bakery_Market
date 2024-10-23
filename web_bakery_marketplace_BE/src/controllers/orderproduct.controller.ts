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

    getPersonalOderCakeDesign = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Personal Oder Cake Design successfully',
            metadata: await OrderProductService.getPersonalOderCakeDesign(req.keyStore.user),
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

    changeStatusOrderProduct = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Change Status Order Product successfully',
            metadata: await OrderProductService.changeStatusOrderProduct(req.params.orderProductId, req.body.status),
        }).send(res);
    });

    getOrderProduct = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Order Product successfully',
            metadata: await OrderProductService.getOrderProduct(req.query),
        }).send(res);
    });

    getOrderProductStatistics = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Order Product Statistics successfully',
            metadata: await OrderProductService.getOrderProductStatistics(req.query.startDate, req.query.endDate),
        }).send(res);
    });

    getOrderProductStatisticsByBakeryId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Order Product Statistics By Bakery Id successfully',
         metadata: await OrderProductService.getOrderProductStatisticsByBakeryId(
            req.params.bakeryId,
            req.body.startDate,
            req.body.endDate
        ),
        }).send(res);
    });

    getCashFlowByBakeryId = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get Cash Flow By Bakery Id successfully',     
            metadata: await OrderProductService.getCashFlowByBakeryId(
                req.params.bakeryId,
                req.body.startDate,
                req.body.endDate
            ),
        }).send(res);
    });
}

export default new OrderProductController();