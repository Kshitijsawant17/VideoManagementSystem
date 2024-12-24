import express from 'express';
import {
    registerUser,
    loginAdmin, 
    getAdminProfile, 
    fetchUsers, 
    uploadLogo, 
    getLogo, 
    getAgreeStatus,
    changeAgreeStatus,
    getCloneStatus,
    changeCloneStatus
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import { uploadFileMiddleware, attachFilePath } from '../middleware/fileUploadMiddleware.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.get('/getAll', fetchUsers);
router.post('/getLogo', getLogo);
router.post('/uploadCustomLogo', uploadFileMiddleware('custom-logo'), attachFilePath, uploadLogo);
router.post('/uploadLogo', uploadFileMiddleware('logo'), attachFilePath, uploadLogo);
router.post('/getAgreeStatus', getAgreeStatus);
router.post('/changeAgreeStatus', changeAgreeStatus);
router.post('/getCloneStatus', getCloneStatus);
router.post('/changeCloneStatus', changeCloneStatus);

export default router;
