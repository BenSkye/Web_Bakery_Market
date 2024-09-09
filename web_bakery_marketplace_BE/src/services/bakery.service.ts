import bakeryRepo from "../repositories/bakery.repo";

class BakeryService {
    static createBakery = async (bakery: any, user_id: any) => {
        bakery = { ...bakery, user_id: user_id };
        return await bakeryRepo.createBakery(bakery);
    }
}

export default BakeryService;