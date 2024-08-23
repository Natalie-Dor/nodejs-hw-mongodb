import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  register,
  login,
  logout,
  refresh,
  sendResetEmail,
  resetPassword,
} from '../controllers/auth.js';
import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/auth/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(register),
);

router.post(
  '/auth/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(login),
);

router.post('/auth/logout', ctrlWrapper(logout));
router.post('/auth/refresh', ctrlWrapper(refresh));
// =========================================================
router.post(
  '/auth/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmail),
);

router.post(
  '/auth/reset-password',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPassword),
);

export default router;
