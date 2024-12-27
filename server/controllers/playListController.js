import PlayList from '../models/PlayList.js';
import UserPlaylist from '../models/UserPlaylist.js';
import VideoPlayList from '../models/VideoPlayList.js';
import { MESSAGE_CONSTANTS } from '../utils/constants.js';

const addPlayList = async (req, res) => {
  const { userId, name } = req.body;
    try{
        const playListExists = await PlayList.findOne({ userId: userId, name: name });
        if (playListExists) return res.status(400).json({ message: MESSAGE_CONSTANTS.PLAYLIST_EXISTS });
        await PlayList.create({ userId: userId, name: name });
        return res.status(200).json({ message: MESSAGE_CONSTANTS.PLAYLIST_ADD_SUCCESS });
    }
    catch(err){
        return res.status(500).json({ message: MESSAGE_CONSTANTS.PLAYLIST_ADD_FAILED, error:err });
    }
};

const updatePlayList = async (req, res) => {
    const { id, name } = req.body;
    try{
        const playListExist = await PlayList.findOne({ _id: id });
        if(!playListExist) return res.status(200).json({ message: MESSAGE_CONSTANTS.PLAYLIST_NOT_EXISTS });
        await PlayList.updateOne({ _id: id }, { $set: { name: name } });
        return res.status(200).json({ message: MESSAGE_CONSTANTS.PLAYLIST_EDIT_SUCCESS });
    }
    catch(err){
        return res.status(500).json({ message: MESSAGE_CONSTANTS.PLAYLIST_EDIT_FAILED });
    }
};

const deletePlayList = async (req, res) => {
    const { id } = req.body;
    if(!id) return res.status(400).json({ message: 'Invalid Id' });
    try{
        await PlayList.deleteOne({_id: id});
        const result = await removeDataByPlaylist(id);
        if(result.status === 'success') return res.status(200).json({ message: MESSAGE_CONSTANTS.PLAYLIST_DELETE_SUCCESS });
        else return res.status(500).json({ message: result.message });
    }
    catch(err){
        return res.status(500).json({ message: MESSAGE_CONSTANTS.PLAYLIST_DELETE_FAILED });
    }
};

const getAllPlayLists = async (req, res) => {
    try{
        const playLists = await PlayList.find();
        if(!playLists || playLists.length == 0) return res.status(200).json({ message: MESSAGE_CONSTANTS.PLAYLIST_NOT_EXISTS, data: playLists });
        return res.status(200).json({ message: 'success', data: playLists });
    }
    catch(err){
        return res.status(500).json({ message: 'failed', error:err });
    }
};

const getClientPlaylists = async (req, res) => {
    const {userId} = req.body;
    try {
      const clientPlaylists = await UserPlaylist.find({userId: userId});
      if (!clientPlaylists || clientPlaylists.length === 0) {
        return res.status(200).json({ message: MESSAGE_CONSTANTS.PLAYLIST_NOT_EXISTS, data: clientPlaylists });
      }
      const playlistDetails = await Promise.all(
        clientPlaylists.map(async (item) => {
          try {
            const playlistData = await PlayList.findOne({ _id: item.playlistId });
            return {
                id: item._id,
                name: playlistData.name
            };
          } catch (err) {
            return { message: err};
          }
        })
      );
      return res.status(200).json({message: 'success', data: playlistDetails});
    } catch (error) {
      console.error(MESSAGE_CONSTANTS.PLAYLIST_FETCH_FAILED, error);
      return res.status(500).json({ message: 'Server error', error });
    }
};

const removeDataByPlaylist = async (id) => {
    try {
        await UserPlaylist.deleteMany( { playlistId: id } );
        await VideoPlayList.deleteMany({playlistId: id});
        return { status: 'success'}
      } catch (error) {
        return { status: 'failed', message: MESSAGE_CONSTANTS.PLAYLIST_DATA_REMOVE_FAILED}
      }
}

export { addPlayList, getAllPlayLists, updatePlayList, deletePlayList, getClientPlaylists };