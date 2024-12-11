import express from 'express';
import verifyToken from '../../Middleware/verifyToken.js';
import { addNewMessage, changeApplicationStatus, createApp, evaluateApplication, getApplicantsOfJob, getMyApplications } from './application.controller.js';
import verifyAdminToken from '../../Middleware/verifyAdminToken.js';
const router = express.Router();

router.route('/get-applicants/:job_id').get(verifyAdminToken,getApplicantsOfJob)
router.route('/update-status/:id').put(verifyAdminToken,changeApplicationStatus)
router.route('/add-message/:id').put(verifyAdminToken,addNewMessage)
router.route('/my-applications').get(verifyToken,getMyApplications)
router.route('/create-app').post(verifyToken,createApp);
router.route('/evaluate-resume').post(evaluateApplication)

export default router;