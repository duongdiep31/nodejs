import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const peopleSchema = new mongoose.Schema({
    idArea: {
        type: ObjectId,
         ref: 'Area'
    },
    idUser: {
        type: ObjectId,
        ref: 'User'
    }
},{timestamps: true});
export default mongoose.model('People',peopleSchema)
