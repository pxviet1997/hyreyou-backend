import express from 'express';

import { createBusiness, getBusiness, updateBusiness } from "./business.controller.js";
import { createRoles, AddRoleCandidate, listRoleCandidate } from "./role.controller.js";

const router = express.Router();

router.get('/', getBusiness);
router.post('/createBusiness', createBusiness);
router.post('/updateBusiness', updateBusiness);
router.post('/createRole', createRoles);
router.get('/allRoleCandidate', listRoleCandidate);
router.post('/addRoleCandidate', AddRoleCandidate);
export default router;