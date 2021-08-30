import express from 'express';

import { verifyEmail, signupAuthVerification, loginAuthVerification, loginBusinessAuthVerification } from './start_controller.js';

const router = express.Router();

//router.get('/',LoginAuth);
router.post("/signup", signupAuthVerification);
router.post("/Talentlogin", loginAuthVerification);
router.post("/Businesslogin", loginBusinessAuthVerification);
router.get('/verify', verifyEmail);

export default router;