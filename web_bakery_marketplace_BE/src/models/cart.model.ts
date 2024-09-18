import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'Carts';
// Declare the Schema of the Mongo model
const cartSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        cart_products: {
            type: [
                {
                    product_id: {
                        type: Schema.Types.ObjectId,
                        required: true,
                        ref: 'Product'
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        default: 1
                    }
                }
            ],
            required: true,
            default: []
        },
        cart_count_products: {
            type: Number,
            required: true,
            default: 0
        },

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const cartModel = model(DOCUMENT_NAME, cartSchema);
export { cartModel };
