import mongoose, { Schema } from 'mongoose';

const videoSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    required: true 
  },
  filePath: { 
    type: String,
    required: true 
  }
}, 
{ timestamps: true });

const Video = mongoose.model('Video', videoSchema);
export default Video;
