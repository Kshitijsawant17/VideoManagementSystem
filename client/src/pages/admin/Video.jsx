import React, { useState, useEffect} from 'react';
import HeaderBar from '../../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { videoUpload, deleteVideo, editVideo } from '../../service/video.service';
import { editVideoPlayList } from '../../service/videoPlaylist.service';
import AlertDialog from '../../components/CustomDialog';
import { fetchAllVideos } from '../../redux/slices/videoSlice';
import { fetchPlaylists } from '../../redux/slices/playlistSlice';
import { 
    Box, 
    Button, 
    Modal, 
    TextField, 
    Fab, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Table, 
    TableCell, 
    TableBody,
    Typography,
    IconButton,
    styled,
    Input,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Snackbar,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckIcon from '@mui/icons-material/Check';

const columns = [
    { id: 'index', label: 'Index', minWidth:'100' },
    { id: 'title', label: 'Title', minWidth:'150' },
    { id: 'desc', label: 'Description', minWidth:'150' },
    { id: 'playlist', label: 'In Playlist', minWidth:'150' },
    { id: 'edit', label: 'Edit', minWidth:'150' },
    { id: 'delete', label: 'Delete', minWidth:'150' }
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
  
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Video = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [selectVideoModalOpen, setSelectVideoModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [listValue, setListValue] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [startEdit, setStartEdit] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [descEditedData, setDescEditedData] = useState("");
  const [titleEditedData, setTitleEditedData] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [videoId, setVideoId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const videos = useSelector((state) => state.video.videos);
  const playlists = useSelector((state) => state.playlist.playlists);

  const handleselectVideoModalClose = () => setSelectVideoModalOpen(false);

  const handleDialog = (e, id) => {
    setVideoId(id);
    setOpenDialog(true);
  }
  const handleChange = async (e, id) => {
    await editVideoPlayList({videoId: id, new_value: e.target.value});
    setListValue(e.target.value);
  };
  const handleDelete = async (data) => {
    setOpenDialog(false);
    if(data){
      const response = await deleteVideo({id: videoId});
      setAlertMessage(response.data.message);
      if(response.status == 200) setOpenSuccessAlert(true);
      else setOpenErrorAlert(true);
      dispatch(fetchAllVideos());
    }
    
  }
  const handleEdit = async (id) => {
    if(startEdit){
      const response = await editVideo({id:id, title:titleEditedData, description: descEditedData });
      setAlertMessage(response.data.message);
      if(response.status == 200) setOpenSuccessAlert(true);
      else setOpenErrorAlert(true);
    }
    startEdit?setStartEdit(false):setStartEdit(true);
    editingId?setEditingId(""):setEditingId(id);
    dispatch(fetchAllVideos());
  }
  const handleCloseSuccessAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAlert(false);
  }
  const handleCloseErrorAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorAlert(false);
  }
  const addVideoFunc = async () => {
    handleselectVideoModalClose();
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('playlist', selectedPlaylist);
      const data  = await videoUpload(formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      })
      dispatch(fetchAllVideos());
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    dispatch(fetchPlaylists());
    dispatch(fetchAllVideos());
  }, [listValue ]);

  return (
    <div>
      <HeaderBar />

      <Box className="fab-group">
        <Fab color="primary" size="medium" aria-label="add" onClick={()=>setSelectVideoModalOpen(true)}>
          <AddIcon />
        </Fab>
        <Fab color="primary" size="medium" aria-label="add" onClick={() => navigate('/admin/user')}>
          <ReplyIcon />
        </Fab>
      </Box>
      
      <Box className = "table-container">
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  return (
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
              videos.map((row, index) => {
                  return (
                      <TableRow hover key={index} >
                          <TableCell align='center' style={{color:'white'}}>{index + 1}</TableCell>
                          <TableCell align='center' style={{color:'white'}}>
                            {startEdit && row.id === editingId ? (
                              <Input
                                size="small"
                                sx={{ width: "150px", color: "white" }}
                                defaultValue={row.title}
                                onChange={(e) => setTitleEditedData(e.target.value)}
                                onFocus={(e) =>setTitleEditedData(e.target.defaultValue)}
                              />
                            ) : (
                              row.title
                            )}
                          </TableCell>
                          <TableCell align='center' width={500} style={{color:'white', overflow:'hidden', textOverflow:'ellipsis'}}>
                              <div style={{height:'40px', overflow:'hidden', textOverflow:'ellipsis'}}>
                                {startEdit && row.id === editingId ? (
                                  <TextField
                                    id="desc-textField"
                                    size="small"
                                    style={{width: "350px", height: '100px', color: "white"}}
                                    multiline
                                    rows={4}
                                    defaultValue={row.description}
                                    onChange={(e) => setDescEditedData(e.target.value)}
                                    onFocus={(e) =>setDescEditedData(e.target.defaultValue)}
                                  />
                                ) : (
                                  row.description
                                )}
                                </div>
                          </TableCell>
                          <TableCell align='center' style={{color:'white'}}>
                              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                  <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="simple-select-standard"
                                      value={row.playlist}
                                      align='center' 
                                      style={{color:'white'}}
                                      onChange={(e) => handleChange(e, row.id)} 
                                      >
                                      <MenuItem value="">
                                          <em>None</em>
                                      </MenuItem>
                                      {
                                          playlists? playlists.map((item, index) => {
                                              return (
                                                  <MenuItem value={item.name} key={index}>{item.name}</MenuItem>
                                              )
                                          })
                                          :<></>
                                      }
                                  </Select>
                              </FormControl>
                          </TableCell>
                          <TableCell align='center' style={{color:'white'}}>
                          <IconButton onClick={(e) => handleEdit(row.id)}>
                            {startEdit&&(row.id == editingId)?
                              <CheckIcon style={{color:'white'}} />
                              : <EditIcon style={{color:'white'}} />
                            }
                          </IconButton>
                          </TableCell>
                          <TableCell align='center' style={{color:'white'}}>
                          <IconButton onClick={(e) => handleDialog(e, row.id)}>
                              <DeleteIcon style={{color:'white'}}  />
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

      <Snackbar 
        open={openSuccessAlert} 
        autoHideDuration={3000} 
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert onClose={handleCloseSuccessAlert} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={openErrorAlert} 
        autoHideDuration={3000} 
        onClose={handleCloseErrorAlert}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert onClose={handleCloseErrorAlert} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>

      {
        openDialog?
        < AlertDialog 
          trigger={openDialog}
          message={"Do you really want to delete this video file?"} 
          callback={handleDelete} 
        />
        :<></>
      }

      {/* New Video Adding Modal */}
      
      <Modal
        open={selectVideoModalOpen}
        onClose={handleselectVideoModalClose}
        aria-labelledby="PlayList Input Modal"
        aria-describedby="Input PlayList"
      >
        <Box sx={style}>
          <Typography style={{marginBottom:'20px', textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>Add Video</Typography>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="contained"
            size="small"
            style={{marginBottom:'20px'}}
          >
            Click here to upload video file
          <VisuallyHiddenInput
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
              multiple
            />
          </Button>
          <Input
            fullWidth
            id="File Name"
            name="File Name"
            size='small'
            value={videoFile? videoFile.name:""}
            color='success'
            required
            style={{marginBottom:'20px'}}
            readOnly={true}
          />
          <TextField
              fullWidth
              id="title"
              label="Title"
              size='small'
              color='success'
              required
              style={{ marginBottom:'20px'}}
              onChange={(e)=>setTitle(e.target.value)}
            />
          <TextField
            fullWidth
            id="description"
            label="Description"
            size='small'
            multiline
            color='success'
            style={{ marginBottom:'20px'}}
            required
            onChange={(e)=>setDesc(e.target.value)}
            inputProps={{
              style: {
                maxHeight: '100px',
                overflow: 'auto',
              },
            }}
            minRows={3}
            maxRows={5}
          />
          <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="playlist-select-label">PlayList</InputLabel>
            <Select
              labelId="playlist-select-label"
              id="playlist-select"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              label="PlayList"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                playlists.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
            <Button 
                variant="contained"
                style={{ marginLeft:'140px'}}
                onClick={()=> addVideoFunc()}
            >
                ADD
            </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Video;
