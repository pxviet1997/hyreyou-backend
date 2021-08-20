import express from 'express';

import { createBusiness,getBusiness,updateBusiness } from "./business_controller.js";

const router =express.Router();

router.post('/',createBusiness);
router.get('/',getBusiness);
router.get('/',updateBusiness);
export default router;