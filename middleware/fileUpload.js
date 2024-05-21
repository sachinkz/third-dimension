import multer from "multer";
import path from 'path'
import { v4 as uuid } from 'uuid'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

export const upload = multer({storage: storage});
