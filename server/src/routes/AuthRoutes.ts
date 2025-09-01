import express from 'express';
import { userLogin } from '@/controllers/AuthController';
import { validateMiddleware } from '@/authorization/Auth';

const router = express.Router();

// @desc   Returns authenticated user
// @route  POST /api/auth/google/authenticate
// @access public
router.post('/google/authenticate', validateMiddleware, userLogin);

export default router;
