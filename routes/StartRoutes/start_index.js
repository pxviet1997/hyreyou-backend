import express from 'express';

import { verifyEmail, signupAuthVerification, loginAuthVerification, sendVerificationEmail } from './start_controller.js';

const router = express.Router();

//router.get('/',LoginAuth);
router.post('/signup', signupAuthVerification);
router.post('/login', loginAuthVerification);
// router.get('/send', sendVerificationEmail);
router.get('/verify', verifyEmail);


export default router;