import express from 'express';

import {signupAuthVerification,loginAuthVerification,loginBusinessAuthVerification} from './start_controller.js';

const router =express.Router();

//router.get('/',LoginAuth);
router.post("/signup",signupAuthVerification);
router.post("/Talentlogin",loginAuthVerification);
router.post("/Businesslogin",loginBusinessAuthVerification);


export default router;