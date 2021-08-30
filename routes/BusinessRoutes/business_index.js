import express from 'express';

import { createBusiness, getBusiness, updateBusiness } from "./business_controller.js";

const router = express.Router();

router.get('/', getBusiness);
router.post('/createBusiness', createBusiness);
router.post('/updateBusiness', updateBusiness);
export default router;
