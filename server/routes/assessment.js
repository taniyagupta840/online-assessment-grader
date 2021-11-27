import express from 'express';
import { getAssessment, getAssessments, 
    createAssessment, attemptAssessment } from '../controllers/assessments.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * GET router defined on this route and middleware and the final controller is also
 * defined in this router here. 'subject' URL parameter is also received to know
 * which subject's assessments have to be sent back to the client.
 */
router.get('/:subject', auth, getAssessments);

/**
 * GET router defined on the route. 'assessmentID' URL parameter is also received 
 * to know which assessment has to be sent back to the client.
 */
router.get('/ID/:assessmentID', auth, getAssessment);

/**
 * POST router defined on the route. Controller stores the assessment data (from
 * the request body) to the database.
 */
router.post('/', auth, createAssessment);

/**
 * POST router defined on the route. 'assessmentID' URL parameter is also
 * received to know which assessment is being attempted. Controller will get the
 * answers from the request body and store them in the database.
 */
router.post('/:assessmentID', auth, attemptAssessment);


export default router;