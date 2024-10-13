import express from 'express';
import { createUser, updateImage, updateUser } from './user.controller.js';
import userImageUploader from '../../Utilis/fileUpload/userImage.js';
const router = express.Router();

router.route('/update-user/:id').put(updateUser)
router.post('/',createUser)
router.route('/update-image').post(userImageUploader.single('image') ,updateImage)

export default router