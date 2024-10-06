import { BadRequestError, NotFoundError } from "../core/error.response";
import bakeryRepo from "../repositories/bakery.repo";
import cakeoptionRepo from "../repositories/cakeoption.repo";

class CakeOptionService {
    static createCakeOption = async (cakeOption: any) => {
        const bakery = await bakeryRepo.getBakeryById(cakeOption.bakery_id, ['customCake']);
        if (!bakery) {
            throw new NotFoundError('Bakery not found');
        }
        if (!bakery.customCake) {
            //update bakery
            console.log('customCake', bakery.customCake)
            await bakeryRepo.updateBakery(cakeOption.bakery_id, { customCake: true });
        }
        const newCakeOption = await cakeoptionRepo.createCakeOption(cakeOption);
        if (!newCakeOption) {
            throw new BadRequestError('Failed to create cake option');
        }
        return newCakeOption;
    }

    static getCakeOptionByBakeryId = async (bakeryId: string) => {
        const cakeOption = await cakeoptionRepo.getCakeOptionByBakeryId(bakeryId);
        if (!cakeOption) {
            throw new NotFoundError('No cake option found');
        }
        return cakeOption;
    }
}

export default CakeOptionService;