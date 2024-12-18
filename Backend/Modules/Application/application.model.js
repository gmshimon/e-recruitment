import mongoose from "mongoose";
import { ObjectId } from "mongodb";
// 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
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
    resume:{
        type:String,
        required: true
    },
    cover:{
        type:String,
    },
    application_status:{
        type:String,
        enum: ['pending', 'interviewing', 'offered', 'rejected'],
        default: 'pending'
    },
    status:{
        type:String,
        enum: ['applied', 'interviewing', 'offered', 'rejected'],
        default: 'applied'
    },
    ats_score:{
        type:Number,
        default: 0
    },
    interview:{
        date:{
            type:String,
            required: true
        },
        time:{
            type:String,
            required: true
        },
        type:{
            type:String,
            enum:['Online','Offline'],
            default:'Online'
        },
        location:{
            type:String,
        },
        phone:{
            type:String,
        },
        score:{
            type:Number,
        }
    },
    review:{
        type:String,
    },
    messages:[
        {
            text:{
                type:String,
            },
            message_date:{
                type:String
            },
            createdBy:{
                type:ObjectId,
                ref:'users'
            }
        }
    ],
    phone:{
        type:String,
        required: true
    }
},{
    timestamps:true
})

const Application = mongoose.model('application',applicationSchema)

export default Application