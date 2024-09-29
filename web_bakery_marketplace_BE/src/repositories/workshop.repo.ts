import { workshopModel } from "../models/workshop.model";

class WorkshopRepo {
    async createWorkshop(data: any) {
        return await workshopModel.create(data);
    }
    async getListWorkshop() {
        return await workshopModel.find();
    }
    async getWorkshopById(id: string) {
        return await workshopModel.findById(id);
    }
}

export default new WorkshopRepo();