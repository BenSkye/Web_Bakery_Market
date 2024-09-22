import { NextFunction } from "express";
import { CREATED, SuccessResponse } from "../core/success.response";
import { asyncHandler } from "../helpers/asyncHandler";
import ProductService from "../services/product.service";

class ProductController {
    createProduct = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new CREATED({
            message: 'Create new product successfully',
            metadata: await ProductService.createProduct(req.body, req.keyStore.user),
        }).send(res);
    });

    getProducts = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get products successfully',
            metadata: await ProductService.getProducts(),
        }).send(res);
    });

    getProductById = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get product successfully',
            metadata: await ProductService.getProductById(req.params.id),
        }).send(res);
    });

    getProductsByBakery = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get products by bakery successfully',
            metadata: await ProductService.getProductsByBakery(req.params.bakeryId),
        }).send(res);
    });

}

export default new ProductController();