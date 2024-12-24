import VideoPlayList from '../models/VideoPlayList.js';
import PlayList from '../models/PlayList.js';
import Video from '../models/Video.js';
import { MESSAGE_CONSTANTS } from '../utils/constants.js';

const addVideoPlayList = async (req, res) => {
  const { videoId, playlistId } = req.body;
    try{
        const videoPlayListExists = await VideoPlayList.findOne({ videoId: videoId, playlistId: playlistId });
        if (videoPlayListExists) return res.status(400).json({ message: MESSAGE_CONSTANTS.VIDEO_PLAYLIST_EXISTS });
        await VideoPlayList.create({ _id: id });
        return res.status(200).json({ message: MESSAGE_CONSTANTS.VIDEO_PLAYLIST_ADD_SUCCESS });
    }
    catch(err){
        return res.status(500).json({ message: MESSAGE_CONSTANTS.VIDEO_PLAYLIST_ADD_FAILED, error:err });
    }
};

const editVideoPlayList = async (req, res) => {
    const { videoId, new_value } = req.body;
    const playlistId = await PlayList.findOne({name: new_value});
    try {
        const videoPlayList = await VideoPlayList.findOne({ videoId: videoId });
        if (videoPlayList && !playlistId) {
            await VideoPlayList.deleteOne(
                { videoId: videoId }
            );
        }
        else if (videoPlayList && playlistId) {
            await VideoPlayList.updateOne(
                { videoId: videoId },
                { $set: { playlistId: playlistId._id } }
            );
        } else {
            await VideoPlayList.create({ videoId: videoId, playlistId: playlistId._id });
        }
        return res.status(200).json({ message: 'success' });
    } catch (err) {
        return res.status(500).json({ message: MESSAGE_CONSTANTS.VIDEO_PLAYLIST_EDIT_FAILED });
    }
};


const getAllVideoPlayLists = async (req, res) => {
    const { playlistId } = req.body;
    try {
        const videoPlaylists = await VideoPlayList.find({ playlistId: playlistId });
        if (!videoPlaylists || videoPlaylists.length === 0) {
            return res.status(404).json({ message: MESSAGE_CONSTANTS.VIDEO_NOT_EXISTS });
        }
        const videoIds = videoPlaylists.map((item) => item.videoId);
        const videos = await Video.find({ _id: { $in: videoIds } });
        return res.status(200).json({ message: 'success', data: videos });
    } catch (err) {
        return res.status(500).json({ message: 'failed', error: err });
    }
};

export { addVideoPlayList, editVideoPlayList, getAllVideoPlayLists };
