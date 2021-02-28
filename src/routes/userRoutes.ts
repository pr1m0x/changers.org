import { Router } from 'express';
import multerProcessing from '../utils/multerProcessing';
import userController from '../controllers/userController';
import cloudinary from '../utils/cloudinary';

const router = Router();

router.patch('/', cloudinary.uploader.single('avatar'), userController.userUpdate);

module.exports = router;
