import express, { Router } from 'express';

import { createBusiness, getBusiness, updateBusiness } from "./business.controller.js";
import { createRoles, AddRoleCandidate, listRoleCandidate, shortlistTalent, rejectCandidate, matchToTalent } from "./role.controller.js";

const router = express.Router();

router.get('/', getBusiness);
router.post('/createBusiness', createBusiness);
router.post('/update', updateBusiness);
router.post('/createRole', createRoles);
router.post('/listRoleCandidate', listRoleCandidate);
router.post('/addRoleCandidate', AddRoleCandidate);
router.post('/shortlist-talent', shortlistTalent);
router.post('/rejectCandidate', rejectCandidate);
router.post('/match-talent', matchToTalent);

export default router;
