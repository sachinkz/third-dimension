import Post from '../models/postModel.js'


export const getModels=async(req,res)=>{
    
    const models=await Post.find()
    res.json(models)
}
export const postModel=async(req,res)=>{
    console.log(req.file.path)
    const newPost=new Post({
        modelUrl:req.file.path
    })
    await newPost.save()
    res.json({message:"posted successfully",newPost})
}