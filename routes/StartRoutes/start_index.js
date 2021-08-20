import express from 'express';

import {signupAuthVerification,loginAuthVerification} from './start_controller.js';

const router =express.Router();

//router.get('/',LoginAuth);
router.post("/signup",signupAuthVerification);
router.post("/login",loginAuthVerification);


export default router;