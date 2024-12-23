import mongoose from 'mongoose';

const videoUserSchema = mongoose.Schema({
  videoId: { 
    type: mongoose.Schema.ObjectId, 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.ObjectId, 
    required: true
  },
  link: { 
    type: String
  }
}, 
{ timestamps: true });

const VideoUser = mongoose.model('VideoUser', videoUserSchema);
export default VideoUser;