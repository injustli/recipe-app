import express from 'express';
import { fetchTokens } from '../controllers/AuthController.js';

const router = express.Router();
// @desc   Returns id_token, refresh_token, access_tokens
// @route  POST /api/auth/google
// @access public
router.post('/', fetchTokens);

export default router;
