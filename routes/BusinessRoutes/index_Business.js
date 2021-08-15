import express from 'express';
import { createBusiness } from "./business_controller.js";

router.post('/',createBusiness);
router.get('/',getBusiness);

export default router;