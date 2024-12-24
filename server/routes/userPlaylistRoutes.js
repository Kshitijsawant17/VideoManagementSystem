import express from 'express';
import {
    addUserPlaylist,
    deleteUserPlaylist,
    getAllUserPlaylists
} from '../controllers/userPlaylistController.js';

const router = express.Router();

router.post('/get', getAllUserPlaylists);
router.post('/add', addUserPlaylist);
router.post('/delete', deleteUserPlaylist);

export default router;
