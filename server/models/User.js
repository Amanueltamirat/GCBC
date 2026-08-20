import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum:['member', 'admin'],
        default:'member',

    },
    status:{
        type:String,
        enum:['pending', 'approved', 'rejected', 'removed'],
        default:'pending'
    },

},
{ timestamps:true }
)

export default mongoose.model('User', userSchema)