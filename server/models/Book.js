import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true,
    },
    author: {
        type:String,
        required:true,
        trim:true
    },
    cover: {
        type:String,
        default:''
    },
    overview: {
        type:String,
        default:''
    },
    readUrl: {
        type:String,
        default:'', 
    },
     downloadUrl:{
            type:String,
            default:'',
        },
},
{ timestamps:true }
)

export default mongoose.model('Book', bookSchema)