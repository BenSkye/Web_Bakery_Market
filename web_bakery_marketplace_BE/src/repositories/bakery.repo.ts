import { bakeryModel } from "../models/bakery.model";
import { getSelectData } from "../utils";

class BakeryRepository {
    async createBakery(bakery: any) {
        console.log('bakery', bakery);
        return await bakeryModel.create(bakery);
    }

    async getBakeryById(id: string, fields: string[]) {
        return await bakeryModel.findById(id).select(getSelectData(fields)).lean();
    }

    async getBakeries(fields: string[],) {
        return await bakeryModel.find().select(getSelectData(fields)).lean();
    }

    async updateBakery(id: string, bakery: any) {
        return await bakeryModel.findByIdAndUpdate(id, bakery, { new: true });
    }

    async deleteBakery(id: string) {
        return await bakeryModel.findByIdAndDelete(id);
    }

    async getBakeryByUserId(user_id: string) {
        return await bakeryModel.find({ user_id });
    }

    async searchBakeries(query: string) {
        const searchRegex = new RegExp(query, 'i');
        return await bakeryModel.find({
            $or: [{ name: { $regex: searchRegex } }, { address: { $regex: searchRegex } }]
        })
            .limit(10)
            .lean();
    }

    async getAllBakeriesByStatus(status: string) {
        return await bakeryModel.find({ status }).lean();
    }
}

export default new BakeryRepository();