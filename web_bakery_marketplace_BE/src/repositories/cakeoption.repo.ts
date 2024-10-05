import { cakeOptionModel } from "../models/cakeoption.model";

class CakeOptionRepository {
    async createCakeOption(cakeOption: any) {
        return await cakeOptionModel.create(cakeOption);
    }

    async getCakeOptionByBakeryId(bakeryId: string) {
        return await cakeOptionModel.findOne({ bakery_id: bakeryId });
    }
}

export default new CakeOptionRepository();