import express from 'express';
import { createUser, fetchUser, updateImage, updateUser, userResumeUpdate } from './user.controller.js';
import userImageUploader from '../../Utilis/fileUpload/userImage.js';
import userResumeUploader from '../../Utilis/fileUpload/userResume.js';
import verifyToken from '../../Middleware/verifyToken.js';
const router = express.Router();

router.route('/update-user').put(verifyToken,updateUser)
router.post('/get-user',fetchUser)
router.post('/',createUser)
router.route('/update-image').post(userImageUploader.single('image') ,updateImage)
router.route('/update-resume').post(verifyToken,userResumeUploader.single('resume'), userResumeUpdate)

export default router