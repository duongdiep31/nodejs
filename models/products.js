import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        strim: true,
        required: true,
        maxLength: 32,
    },
    cost: {
        type: Number,
        required: true,
        maxLength: 30,
    },
    spent: {
            type: Number,
            required : true
    }

},{timestamps: true});
export default mongoose.model('Product',productSchema)
