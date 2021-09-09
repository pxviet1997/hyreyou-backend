import express from 'express';

import { getTalent, createTalent, updateTalent } from './talent.controller.js';

const router = express.Router();

router.get('/', getTalent);
router.post('/', createTalent);
router.post('/update', updateTalent);


export default router;