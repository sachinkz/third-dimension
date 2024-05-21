import multer from "multer";
import path from 'path'
import { v4 as uuid } from 'uuid'

const MIME_TYPE_MAP = ["image/png", "image/jpg", "image/jpeg", "application/octet-stream"]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP.includes(file.mimetype)
        console.log(isValid)
        let error = isValid ? null : new Error("invalid file type");
        cb(error, isValid);
    }
});
