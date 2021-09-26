import express from 'express';
import { verifyToken } from '../StartRoutes/start.middleware.js';

import { getTalent, createTalent, updateTalent, addJobHistory } from './talent.controller.js';

const router = express.Router();

router.get('/', getTalent);
router.post('/', createTalent);
router.post('/update', verifyToken, updateTalent);
router.post('/add-job-history', addJobHistory);


export default router;