import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';
// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        key: {
            type: String,
            require: true,
            unique: true
        },
        status: {
            type: Boolean,
            default: true
        },
        permissions: {
            type: [String],
            require: true,
            enum: ['all', 'customer', 'admin', 'shop']
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const apiKeyModel = model(DOCUMENT_NAME, userSchema);
export { apiKeyModel };
