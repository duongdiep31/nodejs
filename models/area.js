import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const areaSchema = new mongoose.Schema({
    idProject: {
        type: ObjectId,
         ref: 'Product'
    },
    name: {
        type: String,
        required: true,
    }
},{timestamps: true});
export default mongoose.model('Area',areaSchema)
