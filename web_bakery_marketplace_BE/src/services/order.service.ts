import orderRepo from "../repositories/order.repo";


class OrderService {

     getPersonalOder = async (userId: string) => {
        return await orderRepo.getPersonalOder(userId);
    }
    // static getOrdersByBakeryId = async (bakeryId: string) => {
    //     const orders = await orderRepo.getOrderByBakeryId(bakeryId);
    //     return orders.map(order => order.populate('order_products'));
    // }

}
export default OrderService;