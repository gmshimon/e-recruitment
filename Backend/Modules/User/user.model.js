import mongoose from "mongoose";
import validate from "validator";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        maxLength: 50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validate.isEmail,'Please enter a valid email']
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    photo:{
        type: String,
    },
    profession:{
        type: String,
    },
    company:{
        type: String,
    },
    resume:{
        type: String,
    }
},{
    timestamp:true
})

const Users = mongoose.model('users',userSchema)

export default Users