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
        return await bakeryModel.findOne({ user_id });
    }
}

export default new BakeryRepository();