import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const wishList = new mongoose.Schema({
    idUser :{
        type: ObjectId,
        ref: "User",
        required: true
    },
    idBook: {
        type: ObjectId,
        ref: "Product",
        required: true
    }
},{timestamps:true})
export default mongoose.model('Wishlist', wishList)