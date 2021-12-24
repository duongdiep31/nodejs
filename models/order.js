import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    arrOrder: {
        type: Array,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        trim: true
    },
    nameKh: {
        type : String,
        trim: true,
        required : true
    },
    phone :{
        type: Number,
        trim: true,
        required: true
    },
    email : {
        type: String,
        trim: true,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    payment: {
        type: Number
    }
},{timestamps: true})
export default mongoose.model('Order', orderSchema)