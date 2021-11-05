import express from 'express';
import { uploadImage } from './upload.controller.js';
import { upload } from './upload.middleware.js';
const router = express.Router();

router.post("/upload", upload.single('image'), uploadImage);
// router.post("/upload", upload.single('file'), uploadImage);

export default router;


