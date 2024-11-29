import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const applicationSchema = mongoose.Schema({
    candidate:{
        type:ObjectId,
        ref:'users',
        required: true
    },
    job:{
        type:ObjectId,
        ref:'Job',
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    cover:{
        type:String,
    },
    phone:{
        type:String,
        required: true
    },
    status:{
        type:String,
        enum: ['applied', 'interviewing', 'offered', 'rejected'],
        default: 'applied'
    }
},{
    timestamps:true
})

const Application = mongoose.model('application',applicationSchema)

export default Application