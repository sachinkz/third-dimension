const admin = require('firebase-admin');
const path = require('path');
import { v4 as uuid } from 'uuid'


// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve(__dirname, 'fir-88126-firebase-adminsdk-regvs-0ac8aff740.json'))),
    storageBucket: 'fir-88126', // Replace with your project ID
});

export const bucket = admin.storage().bucket();

export const saveFile = async (file) => {
    const blob = bucket.file(uuid() + '-' + file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    blobStream.on('error', (err) => {
        res.status(500).send(err);
    });

    blobStream.on('finish', () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        res.status(200).send(`File uploaded successfully. ${publicUrl}`);
    });

    blobStream.end(req.file.buffer);
}