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
    getVnpayReturn = asyncHandler(async (req: any, res: any, next: NextFunction) => {
        await CheckoutService.getVnpayReturn(req.query)
        res.render('success', { code: req.query.vnp_ResponseCode });
    });

}

export default new CheckoutController();    