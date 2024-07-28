import { Router } from 'express';
import { fetchTokens } from '../controllers/AuthController';

const router = Router();
// @desc   Returns id_token, refresh_token, access_tokens
// @route  POST /api/auth/google
// @access public
router.post('/', fetchTokens);

export default router;
