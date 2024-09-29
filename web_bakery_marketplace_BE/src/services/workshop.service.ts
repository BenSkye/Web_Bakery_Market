import { NotFoundError } from "../core/error.response";
import bakeryRepo from "../repositories/bakery.repo";
import workshopRepo from "../repositories/workshop.repo";

class WorkshopService {
    static createWorkshop = async (userId: string, data: any) => {
        const bakery = await bakeryRepo.getBakeryById(data.bakery_id, ['user_id']);
        if (!bakery || bakery.user_id.toString() !== userId) {
            throw new NotFoundError('Bakery not found');
        }
        return await workshopRepo.createWorkshop(data);
    }

    static getWorkshops = async () => {
        return await workshopRepo.getListWorkshop();
    }

    static getWorkshopById = async (id: string) => {
        const workshop = await workshopRepo.getWorkshopById(id);
        if (!workshop) {
            throw new NotFoundError('Workshop not found');
        }
        return workshop;
    }

}

export default WorkshopService;