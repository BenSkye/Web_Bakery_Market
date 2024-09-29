import { BadRequestError } from "../core/error.response";
import { inventoryModel } from "../models/inventory.model";
import { getSelectData } from "../utils";


class InventoryRepo {

    async createInventory(data: any) {
        return await inventoryModel.create(data);
    }

    async findInventory(query: any, fields: string[]) {
        return await inventoryModel.findOne(query).select(getSelectData(fields));
    }

    async addStockToInventory(productId: string, quantity: number, shop_id: string) {
        const today = new Date().setHours(0, 0, 0, 0);
        const inventory = await inventoryModel.findOne({ product_id: productId });
        if (!inventory) {
            return await this.createInventory({ shop_id: shop_id, product_id: productId, stock: quantity });
        }
        const dailyRecord = inventory.daily_records.find(record => record.day.getTime() === today);
        if (dailyRecord) {
            dailyRecord.produced += quantity;
        } else {
            inventory.daily_records.push({ day: today, produced: quantity });
        }
        inventory.stock += quantity;
        return await inventory.save();
    }

    async removeStockFromInventory(productId: string, quantity: number, shop_id: string) {
        const today = new Date().setHours(0, 0, 0, 0);
        const inventory = await inventoryModel.findOne({ product_id: productId });
        if (!inventory) {
            throw new BadRequestError('Inventory not found');
        }
        const dailyRecord = inventory.daily_records.find(record => record.day.getTime() === today);
        if (inventory.stock < quantity) {
            throw new BadRequestError('Not enough stock');
        }

        if (dailyRecord) {
            dailyRecord.discarded -= quantity;
        } else {
            inventory.daily_records.push({ day: today, discarded: -quantity });
        }
        inventory.stock -= quantity;
        return await inventory.save();
    }

    async reserveProductInventory(productId: string, quantity: number) {
        const query = {
            product_id: productId,
            stock: { $gte: quantity }
        }, updateSet = {
            $inc: {
                stock: -quantity
            }
        }, options = {
            new: true,
            upsert: true
        }
        return await inventoryModel.updateOne(query, updateSet, options);
    }

}

export default new InventoryRepo();