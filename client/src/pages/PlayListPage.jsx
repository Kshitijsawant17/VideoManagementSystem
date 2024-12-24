import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoPlayList } from '../service/videoPlaylist.service';
import { getLogo, uploadCustomLogo, getAgreeStatus } from '../service/user.service';
import { 
  Box,
  List, 
  ListItem, 
  ListItemButton,
  IconButton
} from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

const PlayListPage = () => {
  const { id } = useParams();
  const [userId, setUserID] = useState('');
  const [playListID, setPlayListID] = useState('');
  const [playList, setPlayList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState('');
  const [logo, setLogo] = useState("");
  const [agreeStatus, setAgreeStatus] = useState(false);

  const handleFileChange = async (event) => {
      if(!agreeStatus) console.log("false");
      else {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('custom-logo', file);
        formData.append('id', userId);
        try {
            const response = await uploadCustomLogo(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLogo(`${process.env.REACT_APP_API_HOST_DEV}` + response.data.logoUrl);
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
      }
  };
  const getLogoFunc = async () => {
    const response =  await getLogo({id: userId});
    if(response.data.logoUrl) setLogo(`${process.env.REACT_APP_API_HOST_DEV}` + response.data.logoUrl);
    else console.log('Not Found Logo');
  }
  const getAgreeStatusFunc = async () => {
    const response =  await getAgreeStatus({id: userId});
    console.log(response.data.agreeStatus);
    setAgreeStatus(response.data.agreeStatus);
  }
  const fetchPlayListFunc = async () => {
    setLoading(true);
    try {
      const response = await fetchVideoPlayList({ playlistId: playListID });
      setPlayList(response.data.data);
      setPath(response.data.data[0].filePath);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load video.');
    } finally {
      setLoading(false);
    }
  };
  const changeVideo = (path) => {
    setPath(path);
  }

  useEffect(() => {
    if (id) {
      const [userId, playListId] = id.split('-');
      setUserID(userId);
      setPlayListID(playListId);
    }
    if (userId && playListID) {
      fetchPlayListFunc();
      getLogoFunc();
      getAgreeStatusFunc()
    }
  }, [id, userId, playListID]);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div
        style={{
          padding: '10px 20px',
          backgroundColor: '#196240',
          color: '#000',
        }}
      >      
        <Box position="relative" display="inline-block">
            <img
                src={logo}
                alt="Logo"
                className='header-logo'
                onClick={() => document.getElementById('logoInput').click()}
            />
            <input
                type="file"
                id="logoInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />
            <IconButton
                style={{ position: 'absolute', bottom: '-5px', right: '-5px', color:'white' }}
                onClick={() => document.getElementById('logoInput').click()}
            >
                <PhotoCameraOutlinedIcon />
            </IconButton>
        </Box>
      </div>
      <div style={{width:'100%', background:'black'}}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', position: 'relative', width:'80%' }}>
          {playList.length > 0 && playList[0].filePath ? (
            <video
              src={`${process.env.REACT_APP_API_HOST_DEV}`+ path}
              controls
              preload="auto"
              style={{ width: '100%', height: '600px', marginLeft:'auto', marginRight:'auto' }}
            />
          ) : (
            <p>No video available</p>
          )}
          <img
            src={logo}
            alt=""
            style={{ position: 'absolute', bottom: '90px', right: '50px', width:'50px', height:'50px', borderRadius:'5px' }}
          />
        </div>
      </div>
      <div style={{width:'100%', background:'black'}}>
        <div className="playList-section">
          <List sx={{ width: '100%' }}>
            {playList.map((item, index) => (
              <ListItem key={index} component="div" disablePadding>
                <ListItemButton onClick={(e) => changeVideo(item.filePath)}>
                  <div className="playList-item">
                  <video
                    src={`${process.env.REACT_APP_API_HOST_DEV}${playList[0].filePath}`}
                    controls
                    preload="auto"
                    style={{ width: '100%', height: '100px' }}
                  />
                    <h3 style={{whiteSpace:'nowrap', marginLeft:'20px'}}>{item.title}</h3>
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default PlayListPage;
