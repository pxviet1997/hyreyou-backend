import express from 'express';

import {getTalent, createTalent} from './talent_controller';

const router =express.Router();

router.get('/',getTalent);
router.post('/',createTalent);


export default router;