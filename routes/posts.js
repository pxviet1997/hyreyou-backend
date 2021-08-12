import express from 'express';

import {getPosts,createTalents} from '../controllers/posts_controller.js';

const router =express.Router();

router.get('/',getPosts);
//router.post('/',createTalents);

export default router;