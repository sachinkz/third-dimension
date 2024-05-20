import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path,{dirname} from 'path'
import { fileURLToPath } from 'url';

import routes from './routes/index.js'

const app = express();

app.use(cors({origin:true}))
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use("/api",routes)

mongoose.connect(`mongodb+srv://sachin:santacruz@cluster0.74thgvu.mongodb.net/3dimension?retryWrites=true&w=majority`).then(()=>{
    app.listen(5000,()=>{
        console.log('server listening on port 5000')
    })
})
