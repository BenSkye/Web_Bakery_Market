import { model, Schema } from "mongoose";

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        privateKey: {
            type: String, required: true
        },
        publicKey: {
            type: String, required: true
        },
        refreshToken: {
            type: Array, default: []
        }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true
    }
);
//Export the model
const keyModel = model(DOCUMENT_NAME, keyTokenSchema);
export { keyModel };
