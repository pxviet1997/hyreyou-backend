import express from 'express';

import {
  verifyEmail, signupAuthVerification, loginAuthVerification, resetPasword, changePassword, getUser
} from './start.controller.js';
import { checkUser, getPayload } from './start.middleware.js';

const router = express.Router();

router.post("/signup", signupAuthVerification);
router.post("/login", checkUser, loginAuthVerification);
router.get('/verify', verifyEmail);
router.post('/resetpassword', checkUser, resetPasword);
router.post('/changepassword', changePassword);
router.get('/get-user', getPayload, getUser);

export default router;