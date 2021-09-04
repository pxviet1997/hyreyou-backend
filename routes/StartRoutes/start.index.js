import express from 'express';

import {
  verifyEmail, signupAuthVerification, loginAuthVerification, resetPasword, changePassword
} from './start.controller.js';

const router = express.Router();

router.post("/signup", signupAuthVerification);
router.post("/login", loginAuthVerification);
router.get('/verify', verifyEmail);
router.post('/resetpassword', resetPasword);
router.post('/changepassword', changePassword);

export default router;