import multer from 'multer';
import path from 'path';

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Extract file extension
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName); // Save file with unique name + original extension
    },
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /mp4|avi|jpeg|gif|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only image and video files are allowed'), false);
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter
});

const fileUploadMiddleware = upload.single('video');

const attachFilePath = (req, res, next) => {
    if (req.file) {
        req.filePath = `/uploads/${req.file.filename}`;
    }else {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    next(); // Proceed to the next middleware or controller
};

export { fileUploadMiddleware, attachFilePath };