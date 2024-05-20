import {Router} from 'express'
import { getModels, postModel } from '../controllers/postControllers.js';
import { upload } from '../middleware/fileUpload.js';

const router=Router()

router.get("/getModels",getModels)
router.post("/postModel",upload.single('model'),postModel)

export default router;