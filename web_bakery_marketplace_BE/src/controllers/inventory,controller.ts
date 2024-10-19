import { NextFunction } from "express";
import { SuccessResponse } from "../core/success.response";
import { asyncHandler } from "../helpers/asyncHandler";
import InventoryService from "../services/inventory.service";


class InventoryController {

    getAInventory = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get A Inventory successfully',
            metadata: await InventoryService.getAInventory(req.keyStore.user),
        }).send(res);
    });

    addStockToInventory = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Add Stock to Inventory successfully',
            metadata: await InventoryService.addStockToInventory(req.keyStore.user, req.body.product_id, req.body.quantity),
        }).send(res);
    });

    removeStockFromInventory = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Remove Stock from Inventory successfully',
            metadata: await InventoryService.removeStockFromInventory(req.keyStore.user, req.body.product_id, req.body.quantity),
        }).send(res);
    });
}

export default new InventoryController();    