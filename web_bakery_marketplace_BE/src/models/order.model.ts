import e from 'express';
import mongoose, { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';
// Declare the Schema of the Mongo model
const orderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        order_code: {
            type: Number,
        },
        order_products: [{
            type: Schema.Types.ObjectId,
            ref: 'OrderProduct',
        }],
        checkout: {
            type: Object,
            default: {},
        },
        bakery_id: {
            type: Schema.Types.ObjectId,
            ref: 'Bakery',
            // default: null,
             default: new mongoose.Types.ObjectId('66e5b9b9881b3fab9433beaf'), // Đặt ObjectId mặc định
            // required: true,
        },
        status: {
            type: String,
            default: 'pending',
        },
        /*
        checkout={
            total_price: number;
            shipping_fee: number;
            total_discount: number;
            total_amount: number;
        }
        */
        payment_method: {
            type: String,
        },
        shipping_address: {
            type: Object,
            default: {},
            required: true,
        }
        /*
        shipping_address={
           street: string;
           city: string;
           state: string;
           country: string;
        }
        */
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const ordersModel = model(DOCUMENT_NAME, orderSchema);
export { ordersModel };
