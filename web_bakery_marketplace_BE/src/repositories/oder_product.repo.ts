import { Types } from "mongoose";
import { orderProductModel } from "../models/oderProduct.model";
import { convertObjectId } from "../utils";


class OrderProductRepo {
    async createOderProduct(userId: string, productId: string, bakeryId: Types.ObjectId, quantity: number, price: number, address: Object, payment_method: string) {
        const newOder = {
            user_id: userId,
            product_id: productId,
            bakery_id: bakeryId,
            quantity: quantity,
            price: price,
            address: address,
            payment_method: payment_method,
        }

        return await orderProductModel.create(newOder);
    }
    async createOrderCakeDesign(userId: string, bakeryId: string, quantity: number, price: number, address: Object, customCake: any, order_code: number) {
        const newOder = {
            user_id: userId,
            bakery_id: bakeryId,
            quantity: quantity,
            price: price,
            address: address,
            customCake: customCake,
            isCustomCake: true,
            status: 'pending',
            order_code: order_code,
        }
        return await orderProductModel.create(newOder);
    }

    async getPersonalOderProduct(userId: string) {
        return await orderProductModel.find({ user_id: userId, isCustomCake: false }).populate('product_id', 'name thumbnail').sort({ updatedAt: -1 });
    }
    async getPersonalOderCakeDesign(userId: string) {
        return await orderProductModel.find({ user_id: userId, isCustomCake: true }).populate('bakery_id', 'name').sort({ updatedAt: -1 });
    }

    async getOderProductByBakeryId(bakeryId: string) {
        return await orderProductModel.find({ bakery_id: bakeryId }).sort({ createdAt: -1 });
    }
    async updateOderProduct(oderProductId: string, update: Object) {
        return await orderProductModel.findByIdAndUpdate(oderProductId, update, { new: true, upsert: true });
    }
    async deleteOderProduct(oderProductId: string) {
        return await orderProductModel.findByIdAndDelete(oderProductId);
    }
    async getOrderProductById(orderProductId: string) {
        return await orderProductModel.findById(orderProductId).populate('product_id', 'name thumbnail');
    }
    async changeStatusOrderProduct(orderProductId: string, status: string) {
        return await orderProductModel.findByIdAndUpdate(orderProductId, { status: status }, { new: true });
    }
    async getOrderProduct(query: any) {
        return await orderProductModel.find(query).sort({ createdAt: -1 });
    }
    async getOneOrderProduct(query: any) {
        return await orderProductModel.findOne(query);
    }
    async getOrderProductStatistics(startDate: Date, endDate: Date) {
        return await orderProductModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: "$bakery_id",
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: "$price" },
                    averageOrderValue: { $avg: "$price" },
                    ordersByStatus: {
                        $push: {
                            status: "$status",
                            count: 1
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "bakeries",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bakeryInfo"
                }
            },
            {
                $unwind: "$bakeryInfo"
            },
            {
                $project: {
                    bakeryName: "$bakeryInfo.name",
                    totalOrders: 1,
                    totalRevenue: 1,
                    averageOrderValue: 1,
                    ordersByStatus: {
                        $reduce: {
                            input: "$ordersByStatus",
                            initialValue: {},
                            in: {
                                $mergeObjects: [
                                    "$$value",
                                    { $arrayToObject: [[{ k: "$$this.status", v: { $sum: "$$this.count" } }]] }
                                ]
                            }
                        }
                    }
                }
            }
        ]);
    }

    async getOrderProductStatisticsByBakeryId(bakeryId: string, startDate: Date, endDate: Date) {
        return await orderProductModel.aggregate([
            {
                $match: {
                    bakery_id: new Types.ObjectId(bakeryId),
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $facet: {
                    dailyStats: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                                totalRevenue: { $sum: "$price" },
                                totalOrders: { $sum: 1 },
                                uniqueCustomers: { $addToSet: "$user_id" }
                            }
                        },
                        {
                            $project: {
                                date: "$_id",
                                totalRevenue: 1,
                                totalOrders: 1,
                                uniqueCustomers: { $size: "$uniqueCustomers" }
                            }
                        },
                        { $sort: { date: 1 } }
                    ],
                    topProducts: [
                        {
                            $group: {
                                _id: "$product_id",
                                totalSold: { $sum: "$quantity" },
                                totalRevenue: { $sum: "$price" }
                            }
                        },
                        { $sort: { totalSold: -1 } },
                        { $limit: 5 },
                        {
                            $lookup: {
                                from: "Products",
                                localField: "_id",
                                foreignField: "_id",
                                as: "productInfo"
                            }
                        },
                        {
                            $project: {
                                productName: { $arrayElemAt: ["$productInfo.name", 0] },
                                totalSold: 1,
                                totalRevenue: 1
                            }
                        }
                    ],
                    orderStatusStats: [
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    overallStats: [
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$price" },
                                totalOrders: { $sum: 1 },
                                averageOrderValue: { $avg: "$price" },
                                uniqueCustomers: { $addToSet: "$user_id" }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalRevenue: 1,
                                totalOrders: 1,
                                averageOrderValue: 1,
                                uniqueCustomers: { $size: "$uniqueCustomers" }
                            }
                        }
                    ]
                }
            }
        ]);
    }

    async getCashFlowByBakeryId(bakeryId: string, startDate?: string, endDate?: string) {
         const matchStage: any = { bakery_id: new Types.ObjectId(bakeryId) };
    if (startDate && endDate) {
        matchStage.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    return await orderProductModel.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: "$payment_method",
                totalAmount: { $sum: "$price" },
                count: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: null,
                paymentMethods: { 
                    $push: { 
                        method: "$_id", 
                        totalAmount: "$totalAmount", 
                        count: "$count" 
                    } 
                },
                totalCashFlow: { $sum: "$totalAmount" }
            }
        },
        {
            $project: {
                _id: 0,
                paymentMethods: 1,
                totalCashFlow: 1
            }
        }
    ]);
    }

   async getOrderProductStatisticsAndCashFlowBakeries() {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);


    return await orderProductModel.aggregate([
        {
            $facet: {
                weeklyStats: [
                    { $match: { createdAt: { $gte: startOfWeek } } },
                    { $group: {
                        _id: null,
                        totalOrders: { $sum: 1 },
                        totalRevenue: { $sum: "$price" }
                    }}
                ],
                monthlyStats: [
                    { $match: { createdAt: { $gte: startOfMonth } } },
                    { $group: {
                        _id: null,
                        totalOrders: { $sum: 1 },
                        totalRevenue: { $sum: "$price" }
                    }}
                ],
                yearlyStats: [
                    { $match: { createdAt: { $gte: startOfYear } } },
                    { $group: {
                        _id: null,
                        totalOrders: { $sum: 1 },
                        totalRevenue: { $sum: "$price" }
                    }}
                ],
                topBakeries: [
                    { 
                        $group: {
                            _id: "$bakery_id",
                            totalOrders: { $sum: 1 },
                            totalRevenue: { $sum: "$price" }
                        }
                    },
                    { $sort: { totalOrders: -1 } },
                    { $limit: 5 },  // Limit to top 5
                    { 
                        $lookup: {
                            from: "bakeries",
                            localField: "_id",
                            foreignField: "_id",
                            as: "bakeryInfo"
                        }
                    },
                    { $unwind: { path: "$bakeryInfo", preserveNullAndEmptyArrays: true } },
                    { 
                        $project: {
                            _id: 1,
                            bakeryName: { $ifNull: ["$bakeryInfo.name", "Unknown Bakery"] },
                            totalOrders: 1,
                            totalRevenue: 1
                        }
                    }
                ],
                successfulOrdersRevenue: [
                    { $match: { status: "success" } },
                    { $group: {
                        _id: null,
                        totalRevenue: { $sum: "$price" }
                    }}
                ],
                orderStatusStats: [
                    { $group: {
                        _id: "$status",
                        count: { $sum: 1 },
                        revenue: { $sum: "$price" }
                    }}
                ],
                averageOrderValue: [
                    { $group: {
                        _id: null,
                        avgValue: { $avg: "$price" }
                    }}
                ],
                totalCustomers: [
                    { $group: {
                        _id: null,
                        uniqueCustomers: { $addToSet: "$user_id" }
                    }},
                    { $project: {
                        totalCustomers: { $size: "$uniqueCustomers" }
                    }}
                ]
            }
        },
        {
            $project: {
                weeklyStats: { $arrayElemAt: ["$weeklyStats", 0] },
                monthlyStats: { $arrayElemAt: ["$monthlyStats", 0] },
                yearlyStats: { $arrayElemAt: ["$yearlyStats", 0] },
                topBakeries: { 
                    $cond: {
                        if: { $eq: [{ $size: "$topBakeries" }, 0] },
                        then: [
                            {
                                _id: null,
                                bakeryName: "No bakeries found",
                                totalOrders: 0,
                                totalRevenue: 0
                            }
                        ],
                        else: "$topBakeries"
                    }
                },
                successfulOrdersRevenue: { $arrayElemAt: ["$successfulOrdersRevenue", 0] },
                orderStatusStats: 1,
                averageOrderValue: { $arrayElemAt: ["$averageOrderValue", 0] },
                totalCustomers: { $arrayElemAt: ["$totalCustomers", 0] }
            }
        }
    ]);
 }

}



export default new OrderProductRepo();