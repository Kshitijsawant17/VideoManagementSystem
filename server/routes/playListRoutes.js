import express from 'express';
import {
    addPlayList,
    getAllPlayLists,
    updatePlayList,
    deletePlayList,
    getClientPlaylists
} from '../controllers/playListController.js';

const router = express.Router();

router.get('/getAll', getAllPlayLists);
router.post('/add', addPlayList);
router.post('/edit', updatePlayList);
router.post('/delete', deletePlayList);
router.post('/getClientPlaylists', getClientPlaylists);

export default router;
