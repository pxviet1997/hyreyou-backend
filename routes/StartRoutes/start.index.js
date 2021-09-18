import express from 'express';

import {
  verifyEmail, signupAuthVerification, loginAuthVerification, resetPasword, changePassword
} from './start.controller.js';
import { checkUser } from './start.middleware.js';

const router = express.Router();

router.post("/signup", signupAuthVerification);
router.post("/login", checkUser, loginAuthVerification);
router.get('/verify', verifyEmail);
router.post('/resetpassword', checkUser, resetPasword);
router.post('/changepassword', changePassword);

export default router;