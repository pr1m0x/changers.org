import { Router } from 'express';
// import multerProcessing from '../utils/multerProcessing';
import eventController from '../controllers/eventController';
import cloudinary from '../utils/cloudinary';

// cloudinary.uploader.storage.params.folder;
// cloudinary.uploader.storage.params.folder = 'event-images';

const router = Router();

router.post('/', cloudinary.uploader.single('banner'), eventController.events);
router.patch('/:id', cloudinary.uploader.single('banner'), eventController.eventUpdate);
router.delete('/:id', eventController.eventDelete);

module.exports = router;
