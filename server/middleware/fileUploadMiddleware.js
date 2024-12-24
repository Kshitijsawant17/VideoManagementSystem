import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UPLOAD_CONSTANTS } from '../utils/constants.js';

const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === UPLOAD_CONSTANTS.VIDEO ) {
            const videoDir = 'uploads/video';
            ensureDirExists(videoDir);
            cb(null, videoDir);
        }
        if(file.fieldname === UPLOAD_CONSTANTS.LOGO || file.fieldname === UPLOAD_CONSTANTS.CUSTOM_LOGO) {
            const logoDir = 'uploads/logo';
            ensureDirExists(logoDir);
            cb(null, logoDir);
        }
    },
    filename: (req, file, cb) => {
        let uniqueName;
        if(file.fieldname === UPLOAD_CONSTANTS.VIDEO){
            const ext = path.extname(file.originalname);
            uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            cb(null, uniqueName);
        }
        if(file.fieldname === UPLOAD_CONSTANTS.LOGO){
            const ext = path.extname(file.originalname);
            uniqueName = `company_logo${ext}`;
            cb(null, uniqueName);
        }
        if(file.fieldname === UPLOAD_CONSTANTS.CUSTOM_LOGO){
            const ext = path.extname(file.originalname);
            uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            cb(null, uniqueName);
        }
    },
});

const fileFilter = (req, file, cb) => {
    const fieldName = file.fieldname;
    if (fieldName === UPLOAD_CONSTANTS.VIDEO) {
        const allowedVideoExtensions = /mp4|avi|gif/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedVideoExtensions.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only video files (mp4, avi, gif) are allowed'), false);
        }
    } else if (fieldName === UPLOAD_CONSTANTS.LOGO || fieldName === UPLOAD_CONSTANTS.CUSTOM_LOGO) {
        const allowedLogoExtensions = /jpg|jpeg|png|gif/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedLogoExtensions.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only logo files (jpg, jpeg, png, gif) are allowed'), false);
        }
    } else {
        cb(new Error('Invalid file field'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

const uploadFileMiddleware = (fieldName) => {
    return upload.single(fieldName);
};

const attachFilePath = (req, res, next) => {
    if (req.file) {
        const fieldName = req.file.fieldname;
        if (fieldName === UPLOAD_CONSTANTS.VIDEO) {
            req.filePath = `/uploads/video/${req.file.filename}`;
        } else if (fieldName === UPLOAD_CONSTANTS.LOGO || fieldName === UPLOAD_CONSTANTS.CUSTOM_LOGO) {
            req.logoPath = `/uploads/logo/${req.file.filename}`;
        }
    } else {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    next();
};

export { uploadFileMiddleware, attachFilePath };
