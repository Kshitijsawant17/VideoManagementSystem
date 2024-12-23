import express from 'express';
import {
    addUserVideo,
    deleteUserVideo,
    editUserVideo,
    getAllUserVideos
} from '../controllers/videoUserController.js';

const router = express.Router();

router.post('/get', getAllUserVideos);
router.post('/add', addUserVideo);
router.post('/edit', editUserVideo);
router.post('/delete', deleteUserVideo);

export default router;
