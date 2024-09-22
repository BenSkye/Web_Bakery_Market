import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'OrderProduct';
const COLLECTION_NAME = 'OrderProducts';

const orderProductSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        bakery_id: {
            type: Schema.Types.ObjectId,
            ref: 'Bakery',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'shipping', 'delivered', 'canceled'],
            default: 'pending',
        },

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

const orderProductModel = model(DOCUMENT_NAME, orderProductSchema);
export { orderProductModel };
