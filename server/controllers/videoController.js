import fs from 'fs';
import path from 'path';
import Video from '../models/Video.js';
import PlayList from '../models/PlayList.js';
import UserVideo from '../models/VideoUser.js';
import VideoPlaylist from '../models/VideoPlayList.js';
import { MESSAGE_CONSTANTS } from '../utils/constants.js';

const uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: MESSAGE_CONSTANTS.FILE_NOT_FOUND });
  }
  try{
    const file = new Video({
        title: req.body.title,
        description: req.body.description,
        filePath: req.filePath,
        playlist: req.body.playlist
    })
    const new_video = await file.save();
    if(!new_video) res.status(500).json({ message: MESSAGE_CONSTANTS.FILE_UPLOAD_FAILED });
    const playlistData = await PlayList.findOne({name: req.body.playlist});
    if(playlistData){
      const new_data = new VideoPlaylist({
        videoId: new_video._id, 
        playlistId:playlistData._id
    })
      const new_videoPlaylist = await new_data.save();
      if(!new_videoPlaylist) return res.status(500).json({
        message: 'Failed'
      });
    }
    res.status(200).json({
        message: 'success'
    });
    }catch(error){
        return error
    }
};

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    if (!videos || videos.length === 0) {
      return res.status(200).json({ message: MESSAGE_CONSTANTS.VIDEO_NOT_EXISTS, data: videos });
    }
    const videoDetails = await Promise.all(
      videos.map(async (item) => {
        try {
          const videoPlaylist = await VideoPlaylist.findOne({ videoId: item._id });
          if (videoPlaylist) {
            const existPlaylist = await PlayList.findOne({ _id: videoPlaylist.playlistId });
            return {
              id: item._id,
              title: item.title,
              description: item.description,
              playlist: existPlaylist ? existPlaylist.name : 'None',
            };
          } else {
            return {
              id: item._id,
              title: item.title,
              description: item.description,
              playlist: 'None',
            };
          }
        } catch (err) {
          return {
            id: item._id,
            title: item.title,
            description: item.description,
            playlist: 'Error',
          };
        }
      })
    );
    return res.status(200).json({message: 'success', data: videoDetails});
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const getClientVideos = async (req, res) => {
  const {userId} = req.body;
  try {
    const clientVideos = await UserVideo.find({userId: userId});
    if (!clientVideos || clientVideos.length === 0) {
      return res.status(200).json({ status: 'error', message: MESSAGE_CONSTANTS.VIDEO_NOT_EXISTS });
    }
    const videoDetails = await Promise.all(
      clientVideos.map(async (item) => {
        try {
          const videoPlaylist = await VideoPlaylist.findOne({ videoId: item.videoId });
          const videoData = await Video.findOne({ _id: item.videoId });
          if (videoPlaylist) {
            const existPlaylist = await PlayList.findOne({ _id: videoPlaylist.playlistId });
            return {
              id: item._id,
              title: videoData.title,
              description: videoData.description,
              playlist: existPlaylist ? existPlaylist.name : 'None',
            };
          } else {
            return {
              id: item._id,
              title: videoData.title,
              description: videoData.description,
              playlist: 'None',
            };
          }
        } catch (err) {
          return {
            id: item._id,
            title: videoData.title,
            description: videoData.description,
            playlist: 'Error',
          };
        }
      })
    );
    return res.status(200).json({message: 'success', data: videoDetails});
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const deleteVideo = async (req, res) => {
  const {id} = req.body;
  if(!id) return res.status(400).json({ message: 'Invalid Id' });
  try{
    const videoData = await Video.findById(id);
    if (!videoData) {
      return res.status(404).json({ message: MESSAGE_CONSTANTS.VIDEO_NOT_EXISTS });
    }
    const filePath = path.join('uploads/video', path.basename(videoData.filePath));
    fs.unlink(filePath, async (err) => {
      if (err) {
        return res.status(500).json({ message: MESSAGE_CONSTANTS.FILE_DELETE_FAILED });
      }
      await Video.deleteOne({ _id: id });
    });
      const result = await removeDataByVideo(id);
      if(result.status == 'success') return res.status(200).json({ message: MESSAGE_CONSTANTS.VIDEO_DELETE_SUCCESS });
      else return res.status(500).json({ message: result.message });
  }
  catch(err){
      return res.status(500).json({ message: MESSAGE_CONSTANTS.VIDEO_DELETE_FAILED });
  }
};

const updateVideo = async (req, res) => {
  const { id, title, description } = req.body;
  try {
    await Video.updateOne({ _id: id}, {$set: {title: title, description: description}});
    return res.status(200).json({message: MESSAGE_CONSTANTS.VIDEO_EDIT_SUCCESS});
  } catch (error) {
    return res.status(500).json({message: MESSAGE_CONSTANTS.VIDEO_EDIT_FAILED});
  }
};

const getVideoById = async (req, res) => {
  const {id} = req.body;
  const video = await Video.findById(id);
  if (!video) return res.status(404).json({ message: MESSAGE_CONSTANTS.VIDEO_NOT_EXISTS });
  res.json(video);
};

const removeDataByVideo = async (id) => {
  try {
      await UserVideo.deleteMany( { videoId: id } );
      await VideoPlaylist.deleteMany({videoId: id});
      return { status: 'success'}
    } catch (error) {
      return { status: 'failed', message: MESSAGE_CONSTANTS.VIDEO_DATA_REMOVE_FAILED}
    }
}

export { uploadVideo, getVideos, getClientVideos, getVideoById, updateVideo, deleteVideo };
