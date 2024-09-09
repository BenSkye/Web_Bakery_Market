import { bakeryModel } from "../models/bakery";

class BakeryRepository {
    async createBakery(bakery: any) {
        console.log('bakery', bakery);
        return await bakeryModel.create(bakery);
    }

    async getBakeryById(id: string) {
        return await bakeryModel.findById(id);
    }

    async getBakeries() {
        return await bakeryModel.find();
    }

    async updateBakery(id: string, bakery: any) {
        return await bakeryModel.findByIdAndUpdate(id, bakery, { new: true });
    }

    async deleteBakery(id: string) {
        return await bakeryModel.findByIdAndDelete(id);
    }
}

export default new BakeryRepository();