import UserPlaylist from '../models/UserPlaylist.js';
import PlayList from '../models/PlayList.js';
import { MESSAGE_CONSTANTS } from '../utils/constants.js';

const addUserPlaylist = async (req, res) => {
  const { playlistId, userId, link } = req.body;
    try{
        const userPlaylistExists = await UserPlaylist.findOne({ userId: userId, playlistId: playlistId });
        if (userPlaylistExists) return res.status(400).json({ message: MESSAGE_CONSTANTS.USER_PLAYLIST_EXISTS });
        await UserPlaylist.create({ userId: userId, playlistId: playlistId, link: link });
        return res.status(200).json({ message: MESSAGE_CONSTANTS.USER_PLAYLIST_ADD_SUCCESS });
    }
    catch(err){
        return res.status(500).json({ message: MESSAGE_CONSTANTS.USER_PLAYLIST_ADD_FAILED, error:err });
    }
};

const deleteUserPlaylist = async (req, res) => {
    const { playlistId, userId } = req.body;
    try{
        await UserPlaylist.deleteOne({ userId: userId, playlistId: playlistId });
        return res.status(200).json({ message: MESSAGE_CONSTANTS.USER_PLAYLIST_DELETE_SUCCESS });
    }
    catch(err){
        return res.status(500).json({ message: MESSAGE_CONSTANTS.USER_PLAYLIST_DELETE_FAILED, error:err });
    }
};

const getAllUserPlaylists = async (req, res) => {
    const { userId } = req.body;
    try {
        const PlayLists = await PlayList.find();
        const userPlaylists = await UserPlaylist.find({ userId: userId });
        const userPlaylistMap = new Map();
        userPlaylists.forEach((userPlaylist) => {
            userPlaylistMap.set(userPlaylist.playlistId.toString(), userPlaylist.link);
        });
        const processedPlaylists = PlayLists.map((playlist) => {
            const playlistId = playlist._id.toString();
            if (userPlaylistMap.has(playlistId)) {
                return {
                    ...playlist.toObject(),
                    status: true,
                    link: userPlaylistMap.get(playlistId),
                };
            } else {
                return {
                    ...playlist.toObject(),
                    status: false,
                    link: "",
                };
            }
        });

        return res.status(200).json({ message: 'success', data: processedPlaylists });
    } catch (err) {
        return res.status(500).json({ message: 'failed', error: err });
    }
};

export { addUserPlaylist, deleteUserPlaylist, getAllUserPlaylists };
