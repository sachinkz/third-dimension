import Post from '../models/postModel.js'


export const getModels = async (req, res) => {
    try {
        const models = await Post.find()
        return res.status(200).json(models)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}



export const postModel = async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        modelUrl: req.files["model"][0].path,
        thumbnailUrl: req.files["thumbnail"][0].path
    })
    try {
        await newPost.save()
        return res.json({ message: "posted successfully", newPost })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}