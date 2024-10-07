import { NextFunction } from "express";
import { SuccessResponse } from "../core/success.response";
import { asyncHandler } from "../helpers/asyncHandler";
import CheckoutService from "../services/checkout.service";


class CheckoutController {
    checkoutReview = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Checkout successfully',
            metadata: await CheckoutService.checkoutReview(req.keyStore.user, req.body.product_list),
        }).send(res);
    });

    oderByUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Order successfully',
            metadata: await CheckoutService.oderByUser(req.keyStore.user, req.body.product_list, req.body.user_address, req.body.payment_method, req),
        }).send(res);
    });
    oderByUserCakeDesign = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Order successfully',
            metadata: await CheckoutService.oderByUserCakeDesign(req.keyStore.user, req.body.bakery_id, req.body.quantity, req.body.price, req.body.user_address, req.body.customCake),
        }).send(res);
    });
    chekoutCakeDesign = asyncHandler(async (req: any, res: any, next: NextFunction) => {
        new SuccessResponse({
            message: 'Order cake design successfully',
            metadata: await CheckoutService.checkOutCakeDesign(req.keyStore.user, req.params.orderCakeDesignId, req),
        }).send(res);
    });
    getVnpayReturn = asyncHandler(async (req: any, res: any, next: NextFunction) => {
        const result = await CheckoutService.getVnpayReturn(req.query)
        res.render('success', { code: req.query.vnp_ResponseCode, result: result });
    });
    getVnpayCakeDesignReturn = asyncHandler(async (req: any, res: any, next: NextFunction) => {
        const result = await CheckoutService.getVnpayCakeDesignReturn(req.query)
        res.render('success', { code: req.query.vnp_ResponseCode, result: result });
    });

}

export default new CheckoutController();    