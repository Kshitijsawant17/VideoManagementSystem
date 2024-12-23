import UserPlaylist from '../models/UserPlaylist.js';
import PlayList from '../models/PlayList.js';

const addUserPlaylist = async (req, res) => {
  const { playlistId, userId, link } = req.body;

    try{
        const userPlaylistExists = await UserPlaylist.findOne({ userId: userId, playlistId: playlistId });
        if (userPlaylistExists) return res.status(400).json({ message: 'UserPlaylist already exists' });
        await UserPlaylist.create({ userId: userId, playlistId: playlistId, link: link });
        return res.status(200).json({ message: 'UserPlaylist added successfully!' });
    }
    catch(err){
        return res.status(500).json({ message: 'Failed UserPlaylist adding', error:err });
    }
};

const deleteUserPlaylist = async (req, res) => {
    const { playlistId, userId } = req.body;

      try{
          await UserPlaylist.deleteOne({ userId: userId, playlistId: playlistId });
          return res.status(200).json({ message: 'UserPlaylist deleted successfully!' });
      }
      catch(err){
          return res.status(500).json({ message: 'Failed UserPlaylist deleting', error:err });
      }
  };


const editUserPlaylist = async (req, res) => {
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


const getAllUserPlaylists = async (req, res) => {
    const { userId } = req.body;

    try {
        // Fetch all playlists
        const PlayLists = await PlayList.find();

        // Fetch user's playlists
        const userPlaylists = await UserPlaylist.find({ userId: userId });

        // Create a map for user playlists for quick lookup
        const userPlaylistMap = new Map();
        userPlaylists.forEach((userPlaylist) => {
            userPlaylistMap.set(userPlaylist.playlistId.toString(), userPlaylist.link);
        });

        // Process each playlist
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

        // Return processed videos
        return res.status(200).json({ message: 'success', data: processedPlaylists });
    } catch (err) {
        console.error('Error fetching user playlists:', err);
        return res.status(500).json({ message: 'failed', error: err });
    }
};

export { addUserPlaylist, deleteUserPlaylist, editUserPlaylist, getAllUserPlaylists };
