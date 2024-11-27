import express from "express";
import verifyAdminToken from "../../Middleware/verifyAdminToken.js";
import { createJob, editJob, getJobList, getMyJob,getJobID } from "./job.controller.js";
const router = express.Router();


router.route('/get-my-job').get(verifyAdminToken, getMyJob)
router.route('/create-job').post(verifyAdminToken,createJob)
router.route('/').get(getJobList)
router.route('/:id').get(verifyAdminToken,getJobID)
router.route('/edit-job/:id').put(verifyAdminToken, editJob)

export default router;