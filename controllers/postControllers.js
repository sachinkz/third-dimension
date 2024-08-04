import { uploadFile } from '../middleware/firebase.js';
import Post from '../models/postModel.js';

export const getModels = async (req, res) => {
  try {
    const models = await Post.find();
    return res.status(200).json(models);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const postModel = async (req, res) => {
  const modelFile = req.files['model'][0];
  const thumbnailFile = req.files['thumbnail'][0];

  try {
    const modelUrl = await uploadFile(modelFile);
    const thumbnailUrl = await uploadFile(thumbnailFile);

    console.log(thumbnailUrl,modelUrl);

    const newPost = new Post({
      title: req.body.title,
      modelUrl: modelUrl,
      thumbnailUrl: thumbnailUrl,
    });

    await newPost.save();
    return res.json({ message: "Posted successfully", newPost });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
