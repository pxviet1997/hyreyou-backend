import express from 'express';

import {
  verifyEmail, signupAuthVerification, loginTalentAuthVerification,
  loginBusinessAuthVerification, resetPasword
} from './start.controller.js';

const router = express.Router();

//router.get('/',LoginAuth);
router.post("/signup", signupAuthVerification);
router.post("/talentlogin", loginTalentAuthVerification);
router.post("/businesslogin", loginBusinessAuthVerification);
router.get('/verify', verifyEmail);
router.post('/resetpassword', resetPasword);

export default router;