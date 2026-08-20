import mongoose, { mongo } from "mongoose";

const commentSchema = new mongoose.Schema({
    author:{
        type:String,
        required: true
    },
    authorEmail: {
        type:String,
        required:true,
    },
    authorRole: {
        type:String,
        enum:['member', 'admin'],
        default: 'member'
    },
    body: {
        type:String,
        required:true
    },
    parentId: {
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },

},
 { timestamps: true }
);

const memberPostSchema = new mongoose.Schema({
    type: {
        type:String,
        enum: ['newsletter', 'announcement', 'update'],
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:true
    },
    linkes:[
        {type:String}
    ],
    comments:[commentSchema],
},
{ timestamps:true }
);

export default mongoose.model('MemberPost', memberPostSchema)