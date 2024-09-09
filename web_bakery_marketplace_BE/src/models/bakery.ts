import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Bakery';
const COLLECTION_NAME = 'Bakeries';
// Declare the Schema of the Mongo model
const bakerySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        address: {
            type: String,
            required: true,
        },
        contact: {
            type: {
                phone: {
                    type: String,
                    required: true,
                },
                facebook: {
                    type: String,
                },
                instagram: {
                    type: String,
                },
            }
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
        },
        image: {
            type: [String]
        },
        rating: {
            type: Number,
            default: -1,
        },
        openingHours: {
            type: {
                monday: { open: { type: String }, close: { type: String }, },
                tuesday: { open: { type: String }, close: { type: String } },
                wednesday: { open: { type: String }, close: { type: String } },
                thursday: { open: { type: String }, close: { type: String } },
                friday: { open: { type: String }, close: { type: String } },
                saturday: { open: { type: String }, close: { type: String } },
                sunday: { open: { type: String }, close: { type: String } },
            },
            required: true,
        },
        completedOrders: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const bakeryModel = model(DOCUMENT_NAME, bakerySchema);
export { bakeryModel };
