import express from 'express';
import { signup, login, verifyEmail } from '../controllers/auth.controller.js';

export const router = express.Router();

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/verify-email").post(verifyEmail)

export default router;