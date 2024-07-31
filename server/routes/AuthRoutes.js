import express from 'express';
import { refresh, userLogin, userLogout } from '#controllers/AuthController';
import { validateMiddleware } from '#authorization/Auth';

const router = express.Router();

// @desc   Returns id_token, refresh_token, access_tokens
// @route  POST /api/auth/google/authenticate
// @access public
router.post('/google/authenticate', userLogin);

// @desc   Returns id_token, refresh_token, access_tokens
// @route  POST /api/auth/google/logout
// @access public
router.post('/google/logout', validateMiddleware, userLogout);

// @desc   Returns id_token, refresh_token, access_tokens
// @route  POST /api/auth/google/logout
// @access public
router.post('/google/refresh', refresh);

export default router;
