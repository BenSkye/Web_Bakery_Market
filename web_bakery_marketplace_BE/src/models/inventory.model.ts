import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Inventory';
const COLLECTION_NAME = 'Inventorys';
// Declare the Schema of the Mongo model

const dailyRecordSchema = new Schema(
    {
        day: {
            type: Date,
            required: true,
        },
        produced: {
            type: Number,
            default: 0,
        },
        discarded: {
            type: Number,
            default: 0,
        },
    },
    { _id: false }
);

const inventorySchema = new Schema(
    {
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        shop_id: {
            type: Schema.Types.ObjectId,
            ref: 'Shop',
        },
        stock: {
            type: Number,
            default: 0
        },
        daily_records: {
            type: [dailyRecordSchema],
            default: [],
        },
        reservations: {
            type: Array,
            default: []
        },

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const inventoryModel = model(DOCUMENT_NAME, inventorySchema);
export { inventoryModel };
