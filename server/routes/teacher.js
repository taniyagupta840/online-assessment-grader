import express from 'express';
import { signIn } from '../controllers/teacher.js';

const router = express.Router();

/**
 * POST router defined here to sign in as teacher.
 */
router.post('/signin', signIn);

export default router;