import express from 'express';
import { signIn } from '../controllers/student.js';

const router = express.Router();

/**
 * POST router defined here to sign in as student.
 */
router.post('/signin', signIn);

export default router;