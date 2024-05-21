import mongoose,{Schema} from "mongoose";

const postSchema= new Schema({
    title:{type:String, required:true,minlength:3},
    modelUrl:{type:String, required:true},
    thumbnailUrl:{type:String, required:true},
})

const Post=mongoose.model('Post',postSchema)

export default Post;