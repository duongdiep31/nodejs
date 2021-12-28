import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const commentSchema = new mongoose.Schema({
   user: {
       type: ObjectId,
       ref: 'User'
   },
   productId:{
       type: ObjectId,
       ref: 'Product'
   }
   ,
   content: {
       type: String,
       required: true
   },
   status: {
       type: Number,
       default: 0
   }
},{timestamps: true});
export default mongoose.model('Comment',commentSchema)
