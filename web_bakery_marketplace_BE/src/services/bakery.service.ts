import { BadRequestError, NotFoundError } from "../core/error.response";
import { userModel } from "../models/user.model";
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
        const user = await userModel.findById(user_id);
        if (!user) {
            throw new NotFoundError('No user found');
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
        const select = ['name', 'user_id', 'address', 'status', 'image', 'rating'];
        const bakeries = await bakeryRepo.getBakeries(select);

        return bakeries;
    }

    static getBakeryByUserId = async (user_id: string) => {
        const bakery = await bakeryRepo.getBakeryByUserId(user_id);
        return bakery;
    }
}

export default BakeryService;