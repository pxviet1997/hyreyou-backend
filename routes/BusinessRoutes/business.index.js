import express from 'express';

import { createBusiness, getBusiness, updateBusiness } from "./business.controller.js";
import { createRoles, AddRoleCandidate, listRoleCandidate, listAllRoleAndNoCandidate, shortlistingCandidate } from "./role.controller.js";

const router = express.Router();

router.get('/', getBusiness);
router.post('/createBusiness', createBusiness);
router.post('/updateBusiness', updateBusiness);
router.post('/createRole', createRoles);
router.post('/listRoleCandidate', listRoleCandidate);
router.post('/addRoleCandidate', AddRoleCandidate);
router.post('/listAllRoleAndNoCandidate', listAllRoleAndNoCandidate);
router.post('/shortlistingCandidate', shortlistingCandidate);
export default router;
