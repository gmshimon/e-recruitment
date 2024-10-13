import express from 'express';
import { createUser, updateImage, updateUser, userResumeUpdate } from './user.controller.js';
import userImageUploader from '../../Utilis/fileUpload/userImage.js';
import userResumeUploader from '../../Utilis/fileUpload/userResume.js';
const router = express.Router();

router.route('/update-user/:id').put(updateUser)
router.post('/',createUser)
router.route('/update-image').post(userImageUploader.single('image') ,updateImage)
router.route('/update-resume').post(userResumeUploader.single('resume'), userResumeUpdate)

export default router