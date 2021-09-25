import express from 'express';

import { createBusiness, getBusiness, updateBusiness } from "./business_controller.js";
import { createRoles, AddRoleCandidate, listRoleCandidate, listAllRoleAndNoCandidate } from "./role_controller.js";

const router = express.Router();

router.get('/', getBusiness);
router.post('/createBusiness', createBusiness);
router.post('/updateBusiness', updateBusiness);
router.post('/createRole', createRoles);
router.get('/listRoleCandidate', listRoleCandidate);
router.post('/addRoleCandidate', AddRoleCandidate);
router.post('/listAllRoleAndNoCandidate', listAllRoleAndNoCandidate);
export default router;