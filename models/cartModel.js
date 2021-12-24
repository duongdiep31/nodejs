import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema
const cartSchema = new mongoose.Schema({
    idUser: {
        type: ObjectId,
        ref: 'User'
    
    },
    idBook: {
        type: ObjectId,
        ref: 'Product'
    }
    ,
    quantity: {
        type: Number,
    }
},{timestamps: true});
export default mongoose.model('Cart',cartSchema)