import express from 'express';
import verifyToken from '../../Middleware/verifyToken.js';
import { changeApplicationStatus, createApp } from './application.controller.js';
import verifyAdminToken from '../../Middleware/verifyAdminToken.js';
const router = express.Router();

router.route('/update-status/:id').put(verifyAdminToken,changeApplicationStatus)
router.route('/create-app').post(verifyToken,createApp);

export default router;