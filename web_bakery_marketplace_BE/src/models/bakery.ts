import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Bakery';
const COLLECTION_NAME = 'Bakeries';
// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
        },
        verfify: {
            type: Schema.Types.Boolean,
            default: false,
        },
        roles: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);
//Export the model
const bakeryModel = model(DOCUMENT_NAME, userSchema);
export { bakeryModel };
