import express from 'express';
import { uploadImage } from './upload_controller.js';
import { upload } from '../../middleware/upload.js';
const router = express.Router();

router.post("/upload", upload.single('profilePhoto'), uploadImage);

export default router;


