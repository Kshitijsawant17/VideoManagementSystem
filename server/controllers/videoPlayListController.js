import VideoPlayList from '../models/VideoPlayList.js';
import PlayList from '../models/PlayList.js';
import Video from '../models/Video.js';


const addVideoPlayList = async (req, res) => {
  const { videoId, playlistId } = req.body;

    try{
        const videoPlayListExists = await VideoPlayList.findOne({ videoId: videoId, playlistId: playlistId });
        if (videoPlayListExists) return res.status(400).json({ message: 'VideoPlayList already exists' });
        await VideoPlayList.create({ _id: id });
        return res.status(200).json({ message: 'PlayList added successfully!' });
    }
    catch(err){
        return res.status(500).json({ message: 'Failed PlayList adding', error:err });
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
        console.error('Error editing video playlist:', err);

        return res.status(500).json({ message: 'failed', error: 'Internal server error' });
    }
};


const getAllVideoPlayLists = async (req, res) => {
    const { playlistId } = req.body;

    try {
        // Fetch all video-playlist entries for the given playlist ID
        const videoPlaylists = await VideoPlayList.find({ playlistId: playlistId });

        // Check if any video-playlist entries exist
        if (!videoPlaylists || videoPlaylists.length === 0) {
            return res.status(404).json({ message: 'No videos found for this playlist' });
        }

        // Extract video IDs from the playlist entries
        const videoIds = videoPlaylists.map((item) => item.videoId);

        // Fetch all videos with the extracted IDs
        const videos = await Video.find({ _id: { $in: videoIds } });

        // Respond with the video data
        return res.status(200).json({ message: 'success', data: videos });
    } catch (err) {
        console.error('Error fetching video playlists:', err);
        return res.status(500).json({ message: 'failed', error: err });
    }
};

export { addVideoPlayList, editVideoPlayList, getAllVideoPlayLists };
