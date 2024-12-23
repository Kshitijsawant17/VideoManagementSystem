import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import config from './config/config.js';
import path from 'path';
import videoRoutes from './routes/videoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import playListRoutes from './routes/playListRoutes.js';
import videoPlayListRoutes from './routes/videoPlayListRoutes.js';
import userVideoRoutes from './routes/videoUserRoutes.js';
import userPlaylistRoutes from './routes/userPlaylistRoutes.js';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads')));


// Connect to MongoDB
connectDB();

app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/playlist', playListRoutes);
app.use('/api/videoPlaylist', videoPlayListRoutes);
app.use('/api/userVideo', userVideoRoutes);
app.use('/api/userPlaylist', userPlaylistRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
