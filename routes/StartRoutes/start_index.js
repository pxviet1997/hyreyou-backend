import express from 'express';

import { signupAuthVerification, loginAuthVerification, sendVerificationEmail } from './start_controller.js';

const router = express.Router();

//router.get('/',LoginAuth);
router.post('/signup', signupAuthVerification);
router.post('/login', loginAuthVerification);
router.get('/send', sendVerificationEmail);


export default router;