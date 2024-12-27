import React, { useState, useEffect} from 'react';
import HeaderBar from '../../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeAgreeStatus, changeCloneStatus } from '../../service/user.service';
import { fetchUserVideo, addUserVideo, deleteUserVideo } from '../../service/userVideo.service';
import { fetchUserPlaylist, addUserPlaylist, deleteUserPlaylist } from '../../service/userPlaylist.service';
import { fetchAllUsers } from '../../redux/slices/userSlice';
import { 
    Box,
    Modal,
    TableContainer, 
    TableHead, 
    TableRow, 
    Table, 
    TableCell, 
    TableBody,
    Typography,
    IconButton,
    Checkbox,
    Paper,
    Snackbar,
    Fab
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';

const columns = [
    { id: 'index', label: 'Index', minWidth:'100' },
    { id: 'name', label: 'Name', minWidth:'150' },
    { id: 'email', label: 'Email', minWidth:'150' },
    { id: 'role', label: 'Role', minWidth:'150' },
    { id: 'clone', label: 'Clone', minWidth:'150' },
    { id: 'logoAgree', label: 'Logo Change Agreement', minWidth:'150' },
    { id: 'videos', label: 'Videos', minWidth:'150' },
    { id: 'playlist', label: 'PlayLists', minWidth:'150' }
];

const videoColumns = [
    { id: 'video', label: 'Video', minWidth:'200', maxWidth:'400' },
    { id: 'name', label: 'Name', minWidth:'100' },
    { id: 'status', label: 'Status', minWidth:'100' },
    { id: 'link', label: 'Link', minWidth:'250' },
    { id: 'share', label: 'Share', minWidth:'100' }
];

const playlistColumns = [
  { id: 'name', label: 'Name', minWidth:'100' },
  { id: 'status', label: 'Status', minWidth:'100' },
  { id: 'link', label: 'Link', minWidth:'250' },
  { id: 'share', label: 'Share', minWidth:'100' },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    maxHeight:800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
};

const User = () => {
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [playLists, setPlayLists] = useState([]);
  const [videos, setVideos] = useState([])
  const [userId, setUserID] = useState("");
  const [videoCopied, setVideoCopied] = useState(false);
  const [playlistCopied, setPlaylistCopied] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const handleVideoModalClose = () => setOpenVideoModal(false);
  const handleVideoModalOpen = async (e, userId) => {
    setUserID(userId);
    await fetchUserVideoFunc(userId);
    setOpenVideoModal(true);
  }
  const handlePlaylistModalClose = () => setOpenPlaylistModal(false);
  const handlePlaylistModalOpen = async (e, userId) => {
    setUserID(userId);
    await fetchUserPlayListFunc(userId)
    setOpenPlaylistModal(true);
  }
  const handleVideoLinkClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setVideoCopied(false)
  };
  const handleVideoShare = (data) => {
    navigator.clipboard.writeText(data)
    .then(() => {
      setVideoCopied(true)
    })   
  }
  const handleVideoCheck = async (e, videoId) => {
    if(e.target.checked){
      await addUserVideo({
        userId: userId, 
        videoID: videoId, 
        link: `${process.env.REACT_APP_CLIENT_HOST_DEV}/watch/` + userId + '-' + videoId})
      fetchUserVideoFunc(userId)
    }
    else {
      await deleteUserVideo({userId: userId, videoID: videoId })
      fetchUserVideoFunc(userId)
    }
  }
  const fetchUserVideoFunc = async (userId) => {
    const response = await fetchUserVideo({userId: userId});
    setVideos(response.data.data);
  };
  const handlePlaylistShare = (data) => {
    navigator.clipboard.writeText(data)
    .then(() => {
      setPlaylistCopied(true)
    })   
  }
  const handlePlaylistCheck = async (e, palylistId) => {
    if(e.target.checked){
      await addUserPlaylist({
        userId: userId, 
        playlistId: palylistId, 
        link: `${process.env.REACT_APP_CLIENT_HOST_DEV}/watch/playlist/`+ userId + '-' + palylistId
      })
      fetchUserPlayListFunc(userId)
    }
    else {
      await deleteUserPlaylist({userId: userId, playlistId: palylistId })
      fetchUserPlayListFunc(userId)
    }
  }
  const handleAgreeChange = async (e, userId) => {
    if(e.target.checked){
      await changeAgreeStatus({
        userId: userId, 
        status: true
      })
    }
    else {
      await changeAgreeStatus({
        userId: userId, 
        status: false
      })
    }
    dispatch(fetchAllUsers());
  }
  const handleCloneChange = async (e, userId) => {
    if(e.target.checked){
      await changeCloneStatus({
        userId: userId, 
        status: true
      })
    }
    else {
      await changeCloneStatus({
        userId: userId, 
        status: false
      })
    }
    dispatch(fetchAllUsers());
  }
  const fetchUserPlayListFunc = async (userId) => {
    try{
        const response = await fetchUserPlaylist({userId: userId});
        setPlayLists(response.data.data);
    }
    catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div>
      <HeaderBar />

      <Box className='floating-btn-box'>
        <Fab className='video-btn' variant="extended" size="small" color="white" onClick={() => navigate('/admin/video')} >
          Videos
        </Fab>
        <Fab className='playlist-btn' variant="extended" size="small" color="white"  onClick={() => navigate('/admin/playlist')} >
          Playlists
        </Fab>
      </Box>

      <Box className="table-container">
        <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
            users.map((row, index) => {
                return (
                    <TableRow hover key={row._id} >
                        <TableCell align='center' style={{color:'white'}}>{index + 1}</TableCell>
                        <TableCell align='center' style={{color:'white'}}>{row.name}</TableCell>
                        <TableCell align='center' style={{color:'white'}}>
                            {row.email}
                        </TableCell>
                        <TableCell align='center' style={{color:'white'}}>
                            {row.role}
                        </TableCell>
                        <TableCell align='center' style={{color:'white'}}>
                            <Checkbox 
                              checked={row.clone} 
                              size='small' 
                              sx={{color:'white'}} 
                              onChange={(e) => handleCloneChange(e, row._id)} 
                            />
                        </TableCell>
                        <TableCell align='center' style={{color:'white'}}>
                            <Checkbox 
                              checked={row.logo_agree} 
                              size='small' 
                              sx={{color:'white'}} 
                              onChange={(e) => handleAgreeChange(e, row._id)} 
                            />
                        </TableCell>
                        <TableCell align='center' style={{color:'white'}}>
                        <IconButton onClick={(e) => handleVideoModalOpen(e, row._id)}>
                            <MoreHorizIcon style={{color:'white'}}  />
                        </IconButton>
                        </TableCell>
                        <TableCell align='center' style={{color:'white'}}>
                        <IconButton onClick={(e) => handlePlaylistModalOpen(e, row._id)}>
                            <MoreHorizIcon style={{color:'white'}}  />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                )
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      
      {/* Video Sharing Modal */}

      <Modal
        open={openVideoModal}
        onClose={handleVideoModalClose}
        aria-labelledby="Video Manage Modal"
        aria-describedby="Manage Video"
      >
        <Box sx={style}>
            <Typography style={{marginBottom:'20px', textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>Videos</Typography>
                <TableContainer 
                component={Paper}
                sx={{
                  maxHeight: '500px',
                  overflowY: 'auto',
                }}
                >
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {videoColumns.map((column) => {
                            return(
                                <TableCell
                                    key={column.id}
                                    align='center'
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                </TableCell>
                            )
                        })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        videos.map((row, index) => {
                            return (
                                <TableRow hover key={index} >
                                    <TableCell align='center'>
                                        <video
                                            src={`${process.env.REACT_APP_API_HOST_DEV}`+ row.filePath}
                                            controls
                                            preload="auto"
                                            style={{ width: '100%', height: '80px', minWidth:'100px' }}
                                        />
                                    </TableCell>
                                    <TableCell align='center'>{row.title}</TableCell>
                                    <TableCell align='center'>
                                      <Checkbox checked = {row.status} size='small' onChange={(e) => handleVideoCheck(e, row._id)} />
                                    </TableCell>
                                    <TableCell align='center' style={{textWrap:'nowrap', verticalAlign:'center'}}>
                                      <a target='_blank' href={row.link}>{row.link}</a>
                                        
                                        
                                    </TableCell>
                                    <TableCell align='center' style={{textWrap:'nowrap', verticalAlign:'center'}}>
                                        {
                                          row.status?
                                          <ShareIcon className='share-icon' size="small" onClick={(e) => handleVideoShare(row.link)} />
                                          :<></>
                                        }
                                        
                                    </TableCell>
                                </TableRow>
                            )
                            })
                        }
                    </TableBody>
                    </Table>
                </TableContainer>
        </Box>
      </Modal>

      {/* Playlist Sharing Modal */}

      <Modal
        open={openPlaylistModal}
        onClose={handlePlaylistModalClose}
        aria-labelledby="PlayList Manage Modal"
        aria-describedby="Manage PlayList"
      >
        <Box sx={style}>
            <Typography style={{marginBottom:'20px', textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>PlayLists</Typography>
                <TableContainer 
                component={Paper}
                sx={{
                  maxHeight: '500px',
                  overflowY: 'auto',
                }}
                >
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {playlistColumns.map((column) => {
                            return(
                                <TableCell
                                    key={column.id}
                                    align='center'
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                </TableCell>
                            )
                        })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        playLists.map((row, index) => {
                            return (
                                <TableRow hover key={index} >
                                    <TableCell align='center'>{row.name}</TableCell>
                                    <TableCell align='center'>
                                      <Checkbox checked = {row.status} size='small' onChange={(e) => handlePlaylistCheck(e, row._id)} />
                                    </TableCell>
                                    <TableCell align='center' style={{textWrap:'nowrap', verticalAlign:'center'}}>
                                      <a target='_blank' href={row.link}>{row.link}</a>
                                        
                                    </TableCell>
                                    <TableCell align='center' style={{textWrap:'nowrap', verticalAlign:'center'}}>
                                        {
                                          row.status?
                                          <ShareIcon className='share-icon' size="small" onClick={(e) => handlePlaylistShare(row.link)} />
                                          :<></>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                            })
                        }
                    </TableBody>
                    </Table>
                </TableContainer>
        </Box>
      </Modal>

      {/* Sharing Link Copied Notification */}

      <Snackbar
        open={videoCopied}
        autoHideDuration={3000}
        onClose={handleVideoLinkClose}
        message="Copied!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
      </Snackbar>      
    </div>
  );
};

export default User;
