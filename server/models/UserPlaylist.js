import mongoose from 'mongoose';

const userPlaylistSchema = mongoose.Schema({
  userId: { 
    type: mongoose.Schema.ObjectId, 
    required: true 
  },
  playlistId: { 
    type: mongoose.Schema.ObjectId, 
    required: true
  },
  link: { 
    type: String
  }
}, 
{ timestamps: true });

const UserPlaylist = mongoose.model('UserPlaylist', userPlaylistSchema);
export default UserPlaylist;