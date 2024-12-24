import VideoPlayList from '../models/VideoPlayList.js';
import PlayList from '../models/PlayList.js';
import VideoUser from '../models/VideoUser.js';
import Video from '../models/Video.js';
import { MESSAGE_CONSTANTS } from '../utils/constants.js';

const addUserVideo = async (req, res) => {
  const { videoID, userId, link } = req.body;
    try{
        const videoPlayListExists = await VideoUser.findOne({ videoId: videoID, userId: userId });
        if (videoPlayListExists) return res.status(400).json({ message: MESSAGE_CONSTANTS.USER_VIDEO_EXISTS });
        await VideoUser.create({ videoId: videoID, userId: userId, link: link });
        return res.status(200).json({ message: MESSAGE_CONSTANTS.USER_VIDEO_ADD_SUCCESS });
    }
    catch(err){
        return res.status(500).json({ message: MESSAGE_CONSTANTS.USER_VIDEO_ADD_FAILED, error:err });
    }
};

const deleteUserVideo = async (req, res) => {
    const { videoID, userId } = req.body;
      try{
          await VideoUser.deleteOne({ videoId: videoID, userId: userId });
          return res.status(200).json({ message: MESSAGE_CONSTANTS.USER_VIDEO_DELETE_SUCCESS });
      }
      catch(err){
          return res.status(500).json({ message: MESSAGE_CONSTANTS.USER_VIDEO_DELETE_FAILED, error:err });
      }
};

const editUserVideo = async (req, res) => {
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
        return res.status(500).json({ message: MESSAGE_CONSTANTS.USER_VIDEO_EDIT_FAILED });
    }
};


const getAllUserVideos = async (req, res) => {
    const { userId } = req.body;
    try {
        const Videos = await Video.find();
        const userVideos = await VideoUser.find({ userId: userId });
        const userVideoMap = new Map();
        userVideos.forEach((userVideo) => {
            userVideoMap.set(userVideo.videoId.toString(), userVideo.link);
        });
        const processedVideos = Videos.map((video) => {
            const videoId = video._id.toString();
            if (userVideoMap.has(videoId)) {
                return {
                    ...video.toObject(),
                    status: true,
                    link: userVideoMap.get(videoId),
                };
            } else {
                return {
                    ...video.toObject(),
                    status: false,
                    link: "",
                };
            }
        });
        return res.status(200).json({ message: 'success', data: processedVideos });
    } catch (err) {
        return res.status(500).json({ message: 'failed', error: err });
    }
};

export { addUserVideo, deleteUserVideo, editUserVideo, getAllUserVideos };
