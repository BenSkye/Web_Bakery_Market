import { BadRequestError, NotFoundError } from "../core/error.response";
import bakeryRepo from "../repositories/bakery.repo";

class BakeryService {
    static validateOpeningHours = (openingHours: any) => {
        const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        for (const day of daysOfWeek) {
            const hours = openingHours[day];
            if (!hours || !hours.open || !hours.close) {
                return false; // Missing open or close time for this day
            }
        }

        return true; // All days have valid open and close times
    }
    static createBakery = async (bakery: any, user_id: any) => {
        if (!BakeryService.validateOpeningHours(bakery.openingHours)) {
            throw new BadRequestError('Invalid opening hours: Each day must have both open and close times');
        }
        bakery = { ...bakery, user_id: user_id };
        return await bakeryRepo.createBakery(bakery);
    }
    static getBakeryById = async (id: string) => {
        const select = ['name', 'user_id', 'address', 'contact', 'status', 'image', 'rating', 'openingHours', 'completedOrders'];
        const bakery = await bakeryRepo.getBakeryById(id, []);
        if (!bakery) {
            throw new NotFoundError('No bakery found');
        }
        return bakery;
    }

    static getBakeries = async () => {
        const select = ['name', 'user_id', 'address', 'contact', 'status', 'image', 'rating', 'openingHours', 'completedOrders'];
        const bakeries = await bakeryRepo.getBakeries([]);

        return bakeries;
    }
}

export default BakeryService;