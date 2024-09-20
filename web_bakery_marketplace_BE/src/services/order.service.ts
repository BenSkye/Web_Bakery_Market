import orderRepo from "../repositories/order.repo";


class OrderService {

    getPersonalOder = async (userId: string) => {
        return await orderRepo.getPersonalOder(userId);
    }

}
export default OrderService;