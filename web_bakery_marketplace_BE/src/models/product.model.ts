import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';
// Declare the Schema of the Mongo model
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: [String],
        },
        thumbnail: {
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        bakery: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Bakery',
        },
        status: {
            type: String,
            enum: ['available', 'draft', 'sold_out', 'discontinued'],
            default: 'draft',
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            default: -1,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const productModel = model(DOCUMENT_NAME, productSchema);
export { productModel };
