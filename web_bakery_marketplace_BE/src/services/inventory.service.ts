import { BadRequestError } from "../core/error.response";
import { inventoryModel } from "../models/inventory.model";
import bakeryRepo from "../repositories/bakery.repo";
import inventoryRepo from "../repositories/inventory.repo";
import productRepo from "../repositories/product.repo";


class InventoryService {

    static getAInventory = async (userId: string) => {
        const bakery_detail = await bakeryRepo.getBakeryById(userId, ['_id', 'user_id']);
        return await inventoryRepo.findInventory({ shop_id: bakery_detail?._id?.toString() ?? '' }, ['product_id', 'stock', 'daily_records']);
    }

    static addStockToInventory = async (userId: string, productId: string, quantity: number) => {
        const product_detail = await productRepo.getProductById(productId, ['bakery']);
        console.log('product_detail', product_detail);
        const bakery_detail = await bakeryRepo.getBakeryById(product_detail?.bakery?._id?.toString() ?? '', ['_id', 'user_id']);
        console.log('bakery_detail', bakery_detail);
        if (bakery_detail?.user_id?.toString() !== userId.toString()) {
            throw new BadRequestError('User is not authorized to add stock to this product');
        }
        return await inventoryRepo.addStockToInventory(productId, quantity, bakery_detail?._id?.toString() ?? '');

    }

    static removeStockFromInventory = async (userId: string, productId: string, quantity: number) => {
        const product_detail = await productRepo.getProductById(productId, ['bakery']);
        const bakery_detail = await bakeryRepo.getBakeryById(product_detail?.bakery?._id?.toString() ?? '', ['_id', 'user_id']);
        if (bakery_detail?.user_id?.toString() !== userId.toString()) {
            throw new BadRequestError('User is not authorized to remove stock from this product');
        }
        return await inventoryRepo.removeStockFromInventory(productId, quantity, bakery_detail?._id?.toString() ?? '');
    }
}
export default InventoryService;