import admin from 'firebase-admin';
import { format } from 'util';


export const uploadFile = async (file) => {
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