import Video from '../models/Video.js';
import UserVideo from '../models/VideoUser.js';
import VideoPlaylist from '../models/VideoPlayList.js';
import PlayList from '../models/PlayList.js';
import fs from 'fs';
import path from 'path';

const uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid file type' });
  }
  try{
    const file = new Video({
        title: req.body.title,
        description: req.body.description,
        filePath: req.filePath,
        playlist: req.body.playlist
    })
    const new_video = await file.save();
    if(!new_video) res.status(500).json({
      message: 'File uploaded failed!'
    });
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
    // Fetch all videos
    const videos = await Video.find();

    if (!videos || videos.length === 0) {
      return res.status(200).json({ message: 'No videos found', data: videos });
    }

    // Process videos
    const videoDetails = await Promise.all(
      videos.map(async (item) => {
        try {
          // Fetch associated playlist
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
          console.error(`Error processing video with ID ${item._id}:`, err);
          return {
            id: item._id,
            title: item.title,
            description: item.description,
            playlist: 'Error fetching playlist',
          };
        }
      })
    );

    // Send consolidated responsegetClientVideos
    return res.json(videoDetails);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

const getClientVideos = async (req, res) => {
  const {userId} = req.body;

  try {
    const clientVideos = await UserVideo.find({userId: userId});

    if (!clientVideos || clientVideos.length === 0) {
      return res.status(200).json({ status: 'error', message: 'No videos found' });
    }

    // Process videos
    const videoDetails = await Promise.all(
      clientVideos.map(async (item) => {
        try {
          // Fetch associated playlist
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
          console.error(`Error processing video with ID ${item._id}:`, err);
          return {
            id: item._id,
            title: videoData.title,
            description: videoData.description,
            playlist: 'Error fetching playlist',
          };
        }
      })
    );

    // Send consolidated responsegetClientVideos
    return res.status(200).json(videoDetails);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

const deleteVideo = async (req, res) => {
  const {id} = req.body;

  if(!id) return res.status(400).json({ message: 'Invalid Id' });
  try{

    const videoData = await Video.findById(id);
    
    if (!videoData) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Get the file path
    const filePath = path.join('uploads', path.basename(videoData.filePath));
    

    // Delete the file
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error('File deletion error:', err);
        return res.status(500).json({ message: 'Failed to delete file' });
      }

      // Delete the playlist document
      await Video.deleteOne({ _id: id });
    });

      const result = await removeDataByVideo(id);
      if(result.status == 'success') return res.status(200).json({ message: 'success' });
      else return res.status(500).json({ message: result.message });
  }
  catch(err){
      return res.status(500).json({ message: 'error' });
  }
};

const updateVideo = async (req, res) => {
  const { id, title, description } = req.body;
  try {
    await Video.updateOne({ _id: id}, {$set: {title: title, description: description}});
    return res.status(200).json({message: 'success'});
  } catch (error) {
    return res.status(500).json({message: 'error'});
  }
};

const getVideoById = async (req, res) => {
  const {id} = req.body;
  console.log(id);

  const video = await Video.findById(id);
  if (!video) return res.status(404).json({ message: "Video not found" });

  res.json(video);
};

const removeDataByVideo = async (id) => {
  try {
      // Perform a bulk update to remove playlistId from all videos in the playlist
      await UserVideo.deleteMany( { videoId: id } );
      await VideoPlaylist.deleteMany({videoId: id});

      return { status: 'success'}
    } catch (error) {
      return { status: 'failed', message: 'Error removing playlist data'}
    }
}

export { uploadVideo, getVideos, getClientVideos, getVideoById, updateVideo, deleteVideo };
