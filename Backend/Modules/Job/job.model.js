import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide the title of the job'],
    },
    description:{
        type:String,
        required:[true,'Please provide a description of the job'],
    },
    requirements:{
        type:[String],
        required:[true,'Please provide the required skills and experience'],
    },
    createdBy:{
        type:ObjectId,
        ref:'users'
    }
})

const Job = mongoose.model('Job',jobSchema)

export default Job;