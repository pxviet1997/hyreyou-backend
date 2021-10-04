import express from 'express';
import { verifyToken } from '../StartRoutes/start.middleware.js';
import { upload } from '../upload/upload.middleware.js';

import {
  getTalent, createTalent, updateTalent, addJobHistory, addEducationHistory, updateCertification
} from './talent.controller.js';

const router = express.Router();

router.get('/get-talent', getTalent);
router.post('/', createTalent);
router.post('/update', verifyToken, updateTalent);
router.post('/add-job-history', addJobHistory);
router.post('/add-education-history', addEducationHistory);
router.post('/update-certification', upload.single('certification'), updateCertification);

export default router;