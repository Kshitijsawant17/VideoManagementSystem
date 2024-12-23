import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, removeUserData, getId } from '../utils/auth';
import { getLogo, uploadLogo } from '../service/user.service';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { 
  Box, 
  IconButton,
} from '@mui/material';

const HeaderBar = () => {
  const authenticated = isAuthenticated();
  const [logo, setLogo] = useState("/assets/logo2.png");

  const handleLogOut = () => {
    removeUserData();
  } 
  const handleFileChange = async (event) => {
      const userId = getId()
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
  };
  const getLogoFunc = async (id) => {
    const response =  await getLogo({id: id});
    if(response.data.logoUrl) setLogo(`${process.env.REACT_APP_API_HOST_DEV}` + response.data.logoUrl);
    else console.log('Not Found Logo');
  }

  useEffect(() => {
    const userId = getId();
    getLogoFunc(userId)
  }, [])

  return (
    <div>
        <Box className="home-header">
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
            <div>
                {
                    authenticated?
                    <Link to="/login" className='login-link-btn' onClick={() =>handleLogOut()}>Log Out</Link>
                    :<Link to="/login" className='login-link-btn'>Log In</Link>
                }
            </div>
        </Box>
      <div style={{width:'100%', height:'2px', backgroundColor:'gray'}}></div>
    </div>
  );
};

export default HeaderBar;
