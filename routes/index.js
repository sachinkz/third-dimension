import { Router } from 'express';
import { getModels, postModel } from '../controllers/postControllers.js';
import multer from 'multer';

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/get-models", getModels);
router.post("/upload-model", upload.fields([{ name: 'model' }, { name: "thumbnail" }]), postModel);

export default router;
