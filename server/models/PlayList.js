import mongoose from 'mongoose';

const playListSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }
}, 
{ timestamps: true });

const PlayList = mongoose.model('PlayList', playListSchema);
export default PlayList;
