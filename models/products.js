import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        strim: true,
        required: true,
        maxLength: 32,
    },
    price: {
        type: Number,
        required: true,
        maxLength: 30,
    },
    cateId: {
        type: ObjectId,
        ref: "Category",
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        required: true,
        type: String
    },
    author: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
    },
    trending: {
        type: Number,
        default: 0
    },
    comment: [
        {
            type: ObjectId,
            ref: 'Comment'
        }
    ]
},{timestamps: true});
export default mongoose.model('Product',productSchema)
