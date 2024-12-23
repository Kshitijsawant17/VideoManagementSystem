import express from 'express';
import {
    editVideoPlayList,
    getAllVideoPlayLists,
} from '../controllers/videoPlayListController.js';

const router = express.Router();

router.post('/edit', editVideoPlayList);
router.post('/getAll', getAllVideoPlayLists);

export default router;
