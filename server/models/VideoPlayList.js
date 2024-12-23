import mongoose from 'mongoose';

const videoPlayListSchema = mongoose.Schema({
  videoId: { 
    type: mongoose.Schema.ObjectId,
    required: true 
  },
  playlistId: { 
    type: mongoose.Schema.ObjectId,
    required: true
  }
}, 
{ timestamps: true });

const VideoPlayList = mongoose.model('VideoPlayList', videoPlayListSchema);
export default VideoPlayList;