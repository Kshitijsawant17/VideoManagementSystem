import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { getLogo, uploadLogo, getAgreeStatus } from '../service/user.service';
import { watchVideo } from '../service/video.service';
import { 
  Box,
  IconButton
} from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

const WatchPage = () => {
  const [video, setVideo] = useState({});
  const [error, setError] = useState('');
  const [userId, setUserID] = useState('');
  const [videoID, setVideoID] = useState('');
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("/assets/logo2.png");
  const [agreeStatus, setAgreeStatus] = useState(false);

  const { id } = useParams();

  const handleFileChange = async (event) => {
      if(!agreeStatus) console.log("false");
      else {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('logo', file);
        formData.append('id', userId);
        try {
            const response = await uploadLogo(formData, {
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
  const fetchVideoFunc = async () => {
    setLoading(true);
    try {
      const { data } = await watchVideo({id:videoID});
      setVideo(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load video.');
    } finally {
      setLoading(false);
    }
  };
  const getAgreeStatusFunc = async () => {
    const response =  await getAgreeStatus({id: userId});
    console.log(response.data.agreeStatus);
    setAgreeStatus(response.data.agreeStatus);
  }

  useEffect(() => {
    if (id) {
      const [userId, playListId] = id.split('-');
      setUserID(userId);
      setVideoID(playListId);
    }
    if(userId && videoID){
      fetchVideoFunc();
      getLogoFunc();
      getAgreeStatusFunc()
    }
  }, [id, userId, videoID]);

  if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
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
      <div style={{width:'100%', height:'2px', backgroundColor:'gray'}}></div>
        <div style={{ position: 'relative', background:'black' }}>
          <video
            src={`${process.env.REACT_APP_API_HOST_DEV}`+ video.filePath}
            controls
            preload="auto"
            style={{ width: '100%', height: '700px' }}
          />
          <img src={logo} alt='' style={{ position: 'absolute', bottom: '90px', right: '50px', width:'50px', height:'50px', borderRadius:'5px' }} />
        </div>
        <div className='watch-desc-section'>
            <p style={{color: '#000'}}>{video.description}</p>
        </div>
    </div>
  );
};

export default WatchPage;
