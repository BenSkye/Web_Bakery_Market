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
    async createOrderCakeDesign(userId: string, bakeryId: string, quantity: number, price: number, address: Object, customCake: any) {
        const newOder = {
            user_id: userId,
            bakery_id: bakeryId,
            quantity: quantity,
            price: price,
            address: address,
            customCake: customCake,
            isCustomCake: true,
            status: 'pending',
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
        ]);
    }
    }
    


export default new OrderProductRepo();