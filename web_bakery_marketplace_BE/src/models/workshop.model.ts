import e from 'express';
import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Workshop';
const COLLECTION_NAME = 'Workshops';
// Declare the Schema of the Mongo model
const workshopSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        bakeryId: {
            type: Schema.Types.ObjectId,
            ref: 'Bakery',
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: [String],
            required: true,
        },
        days: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        contact: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const workshopModel = model(DOCUMENT_NAME, workshopSchema);
export { workshopModel };
