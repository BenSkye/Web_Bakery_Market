import e from 'express';
import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Category';
const COLLECTION_NAME = 'Categories';
// Declare the Schema of the Mongo model
const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const categoryModel = model(DOCUMENT_NAME, categorySchema);
export { categoryModel };
