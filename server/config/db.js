// const mongoose = require('mongoose');
// require('dotenv').config(); // Load environment variables

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const dbURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    
    // Connect to MongoDB
    await mongoose.connect(dbURI, {
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit process with failure
  }
};

// module.exports = connectDB;
export default connectDB;
