import express from 'express';

import {getPosts,createTalents,createBusiness} from '../controllers/posts_controller.js';

const router =express.Router();

router.get('/',getPosts);
router.post('/',createTalents);
router.post('/',createBusiness);

export default router;