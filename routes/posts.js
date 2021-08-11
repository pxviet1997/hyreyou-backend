import express from 'express';

import {getPosts} from '../controllers/posts_controller.js';

const router =express.Router();

router.get('/',getPosts);

export default router;