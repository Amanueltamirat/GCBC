import mongoose from 'mongoose';

const sermonSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true,
    },
    preacher: {
        type:String,
        required:true,
        trim:true,
    },
    series :{
        type:String,
        default:'',
    },
    scripture: {
        type:String,
        default:'',
    },
    youtubeId: {
        type:String,
        default:'',
    },
    description:{
        type:String,
        default:''
    },
},
{ timestamps: true }
)

export default mongoose.model('Sermon', sermonSchema)
