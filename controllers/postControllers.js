// 



import Post from '../models/postModel.js';
import admin from 'firebase-admin';
import { format } from 'util';

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

  const uploadFile = async (file) => {
    const blob = admin.storage().bucket().file(Date.now().toString() + '-' + file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', async () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  };

  try {
    const modelUrl = await uploadFile(modelFile);
    const thumbnailUrl = await uploadFile(thumbnailFile);

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
