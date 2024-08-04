import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

dotenv.config()

import routes from './routes/index.js'

const app = express();

app.use(cors({ origin: true }))
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve(__dirname, 'fir-88126-firebase-adminsdk-regvs-0ac8aff740.json'))),
    storageBucket: 'fir-88126',
});

export const bucket = admin.storage().bucket();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/api", routes)

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.port || 5000, () => {
        console.log(`DB connected and server started on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("failed to connect DB")
})
