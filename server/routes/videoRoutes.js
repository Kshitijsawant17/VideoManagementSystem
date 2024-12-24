import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { 
  uploadVideo,
  getVideos,
  getClientVideos,
  getVideoById,
  updateVideo,
  deleteVideo
 } from '../controllers/videoController.js';
 import { uploadFileMiddleware, attachFilePath } from '../middleware/fileUploadMiddleware.js';

 const router = express.Router();

router.post('/', protect, getVideos);
router.post('/upload', uploadFileMiddleware('video'), attachFilePath, uploadVideo);
router.post('/watch', protect, getVideoById);
router.get('/getAll', getVideos);
router.post('/getClientAll', getClientVideos);
router.post('/delete', deleteVideo);
router.post('/update', updateVideo);

export default router;
