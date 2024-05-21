import {Router} from 'express'
import { getModels, postModel } from '../controllers/postControllers.js';
import { upload } from '../middleware/fileUpload.js';

const router=Router()

router.get("/get-models",getModels)
router.post("/upload-model",upload.fields([{name:'model'},{name:"thumbnail"}]),postModel)

export default router;
