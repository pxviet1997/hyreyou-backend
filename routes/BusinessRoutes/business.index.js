import express, { Router } from 'express';

import { createBusiness, getBusiness, updateBusiness } from "./business.controller.js";
import { createRole, AddRoleCandidate, getTalentList, shortlistTalent, rejectTalent, matchToTalent } from "./role.controller.js";

const router = express.Router();

router.get('/', getBusiness);
// router.post('/create-business', createBusiness);
router.post('/update', updateBusiness);
router.post('/create-role', createRole);
router.post('/get-talent-list', getTalentList);
// router.post('/addRoleCandidate', AddRoleCandidate);
router.post('/shortlist-talent', shortlistTalent);
router.post('/reject-talent', rejectTalent);
router.post('/match-talent', matchToTalent);

export default router;
