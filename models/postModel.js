import mongoose,{Schema} from "mongoose";

const postSchema= new Schema({
    modelUrl:{type:String, required:true},
})

const Post=mongoose.model('Post',postSchema)

export default Post;