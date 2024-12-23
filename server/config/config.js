// src/config/config.js

// require('dotenv').config(); // Load environment variables

import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,                 // Server port
  db: {
    host: process.env.DB_HOST || 'localhost',     // Database host
    port: process.env.DB_PORT || 27017,            // Database port
    name: process.env.DB_NAME || 'video-dataset',     // Database name
    user: process.env.DB_USER || '',                // Database username
    password: process.env.DB_PASS || '',            // Database password
  },
  jwt: {
    secret: process.env.JWT_SECRET || '1234567890', // JWT secret key
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',      // JWT expiration time
  },
  environment: process.env.NODE_ENV || 'development', // Application environment
};

// module.exports = config;
export default config;
