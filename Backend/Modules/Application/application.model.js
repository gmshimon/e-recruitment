import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    candidate:{
        type:String,
        ref:'users',
        required: true
    },
    job:{
        type:String,
        ref:'jobs',
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