import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { getCloneStatus } from '../service/user.service';
import { isAuthenticated, removeUserData, getId } from '../utils/auth';
import { fetchAllVideos, fetchClientVideos } from '../redux/slices/videoSlice';
import { fetchPlaylists, fetchClientPlaylists } from '../redux/slices/playlistSlice';
import { 
    Box, 
    Tab,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const columns = [
    { id: 'index', label: 'Index', minWidth:'100' },
    { id: 'title', label: 'Title', minWidth:'150' },
    { id: 'desc', label: 'Description', minWidth:'150' },
    { id: 'playlist', label: 'In Playlist', minWidth:'150' },
    { id: 'status', label: 'Status', minWidth:'150' }
];

const playlistColumns = [
    { id: 'index', label: 'Index', minWidth:'100' },
    { id: 'name', label: 'Name', minWidth:'150' },
    { id: 'status', label: 'Status', minWidth:'150' }
];

const Home = () => {
  const [value, setValue] = React.useState('1');
  const [logo, setLogo] = useState(`${process.env.REACT_APP_API_HOST_DEV}` + '/uploads/logo/company_logo.png');

  const authenticated = isAuthenticated();
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.video.videos);
  const playlists = useSelector((state) => state.playlist.playlists);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogOut = () => {
    removeUserData();
  }
  const getCloneStatusFunc = async (id) => {
    try{
        const cloneRes = await getCloneStatus({userId: id});
        if(cloneRes.data.cloneStatus){
            dispatch(fetchAllVideos());
            dispatch(fetchPlaylists());
        }
        else {
            dispatch(fetchClientVideos({userId: id}));
            dispatch(fetchClientPlaylists({userId: id}));
        }
    }
    catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    const userId = getId();
    getCloneStatusFunc(userId);
  }, [])

  return (
      <Box sx={{ width: '100%'}}>
        <TabContext value={value}>
        <Box className="home-header">
            <Box position="relative" display="inline-block">
                <img
                    src={logo}
                    alt="Logo"
                    className='header-logo'
                />
            </Box>
            <TabList onChange={handleChange} aria-label="Home Tab">
                <Tab label="Video Lists" value="1" className='tab-btn' />
                <Tab label="PlayLists" value="2" className='tab-btn'/>
            </TabList>
            <div>
                {
                    authenticated?
                    <Link to="/login" className='login-link-btn' onClick={() =>handleLogOut()}>Log Out</Link>
                    :<Link to="/login" className='login-link-btn'>Log In</Link>
                }
            </div>
        </Box>
        
        <TabPanel value="1">
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" className='video-table' >
                <TableHead>
                    <TableRow>
                    {columns.map((column, index) => {
                        return(
                        <TableCell
                        key={index}
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
                    videos? 
                    videos.map((row, index) => {
                        return (
                            <TableRow hover key={index} >
                                <TableCell align='center' style={{color:'white'}}>{index + 1}</TableCell>
                                <TableCell align='center' style={{color:'white'}}>{row.title}</TableCell>
                                <TableCell align='center' width={500} style={{color:'white', overflow:'hidden', textOverflow:'ellipsis'}}>
                                    <p style={{height:'40px', overflow:'hidden', textOverflow:'ellipsis'}}>{row.description}</p>
                                </TableCell>
                                <TableCell align='center' style={{color:'white'}}>
                                    {row.playlist}
                                </TableCell>
                                <TableCell align='center' style={{color:'white'}}>
                                    <IconButton>
                                        <ShoppingCartIcon style={{color:'white'}} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    }):<></>
                }
                </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
        <TabPanel value="2">
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" className='video-table' >
                <TableHead>
                    <TableRow>
                    {playlistColumns.map((column) => (
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
                    playlists.map((row, index) => {
                        return (
                            <TableRow hover key={index} >
                                <TableCell align='center' style={{color:'white'}}>{index + 1}</TableCell>
                                <TableCell align='center' style={{color:'white'}}>{row.name}</TableCell>
                                <TableCell align='center' style={{color:'white'}}>
                                    <IconButton>
                                        <ShoppingCartIcon style={{color:'white'}} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                        })
                    }
                </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Home;