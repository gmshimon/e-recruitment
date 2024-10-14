import express from "express";
import verifyAdminToken from "../../Middleware/verifyAdminToken.js";
import { createJob, editJob, getJobList } from "./job.controller.js";
const router = express.Router();

router.route('/edit-job/:id').put(verifyAdminToken, editJob)
router.route('/create-job').post(verifyAdminToken,createJob)
router.route('/').get(getJobList)

export default router;