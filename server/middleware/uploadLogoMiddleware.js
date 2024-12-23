import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Extract file extension
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName); // Save file with unique name + original extension
    },
});
const upload = multer({ storage });

const logoUploadMiddleware = upload.single('logo');

const attachLogoPath = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      req.logoPath = `/uploads/${req.file.filename}`;
      next(); // Proceed to the next middleware or controller
};

export { logoUploadMiddleware, attachLogoPath };