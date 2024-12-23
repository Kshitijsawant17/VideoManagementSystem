import VideoPlayList from '../models/VideoPlayList.js';
import PlayList from '../models/PlayList.js';
import VideoUser from '../models/VideoUser.js';
import Video from '../models/Video.js';


const addUserVideo = async (req, res) => {
  const { videoID, userId, link } = req.body;

    try{
        const videoPlayListExists = await VideoUser.findOne({ videoId: videoID, userId: userId });
        if (videoPlayListExists) return res.status(400).json({ message: 'UserVideo already exists' });
        await VideoUser.create({ videoId: videoID, userId: userId, link: link });
        return res.status(200).json({ message: 'UserVideo added successfully!' });
    }
    catch(err){
        return res.status(500).json({ message: 'Failed UserVideo adding', error:err });
    }
};

const deleteUserVideo = async (req, res) => {
    const { videoID, userId } = req.body;
  
      try{
          await VideoUser.deleteOne({ videoId: videoID, userId: userId });
          return res.status(200).json({ message: 'UserVideo deleted successfully!' });
      }
      catch(err){
          return res.status(500).json({ message: 'Failed UserVideo deleting', error:err });
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
        console.error('Error editing video playlist:', err);
        return res.status(500).json({ message: 'failed', error: 'Internal server error' });
    }
};


const getAllUserVideos = async (req, res) => {
    const { userId } = req.body;

    try {
        // Fetch all videos
        const Videos = await Video.find();

        // Fetch user's videos
        const userVideos = await VideoUser.find({ userId: userId });

        // Create a map for user videos for quick lookup
        const userVideoMap = new Map();
        userVideos.forEach((userVideo) => {
            userVideoMap.set(userVideo.videoId.toString(), userVideo.link);
        });

        // Process each video
        const processedVideos = Videos.map((video) => {
            const videoId = video._id.toString();
            if (userVideoMap.has(videoId)) {
                return {
                    ...video.toObject(), // Convert Mongoose document to plain object
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

        // Return processed videos
        return res.status(200).json({ message: 'success', data: processedVideos });
    } catch (err) {
        console.error('Error fetching user videos:', err);
        return res.status(500).json({ message: 'failed', error: err });
    }
};

export { addUserVideo, deleteUserVideo, editUserVideo, getAllUserVideos };
