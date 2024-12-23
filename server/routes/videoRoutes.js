import express from 'express';
import multer from 'multer';
import protect from '../middleware/authMiddleware.js';
import { 
  uploadVideo,
  getVideos,
  getClientVideos,
  getVideoById,
  updateVideo,
  deleteVideo
 } from '../controllers/videoController.js';
 import {
  fileUploadMiddleware,
  attachFilePath 
 } from '../middleware/uploadMiddleware.js';

 const router = express.Router();

router.post('/', protect, getVideos);
router.post('/upload', fileUploadMiddleware, attachFilePath, uploadVideo);
router.post('/watch', protect, getVideoById);
router.get('/getAll', getVideos);
router.post('/getClientAll', getClientVideos);
router.post('/delete', deleteVideo);
router.post('/update', updateVideo);

export default router;
