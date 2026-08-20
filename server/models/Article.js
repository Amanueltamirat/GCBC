import mongoose, { mongo } from "mongoose";

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        default:''
    },
    excerpt:{
        type:String,
        default:''
    },
    content: {
        type:String,
        required:true
    },
},
{ timestamps:true }
);

export default mongoose.model('Article', articleSchema)