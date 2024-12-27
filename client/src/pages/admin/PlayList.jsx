import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import { fetchPlaylists } from '../../redux/slices/playlistSlice';
import { getId } from '../../utils/auth';
import AlertDialog from '../../components/CustomDialog';
import {
  addPlayList, 
  deletePlaylist, 
  editPlayList 
} from '../../service/playList.service';
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
  Input,
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
    { id: 'name', label: 'Name', minWidth:'150' },
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

const PlayList = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editedData, setEditedData] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [playlistId, setPlaylistId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playList = useSelector((state) => state.playlist.playlists);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDialog = (e, id) => {
    setPlaylistId(id);
    setOpenDialog(true);
  }

  const handleDelete = async (data) => {
    setOpenDialog(false);
    if(data){
      const response = await deletePlaylist({id: playlistId});
      setAlertMessage(response.data.message);
      if(response.status == 200) setOpenSuccessAlert(true);
      else setOpenErrorAlert(true);
      dispatch(fetchPlaylists());
    }
    
  }
  const handleEdit = async (id) => {
    if(startEdit){
      const response =  await editPlayList({id:id, name:editedData});
      setAlertMessage(response.data.message);
      if(response.status == 200) setOpenSuccessAlert(true);
      else setOpenErrorAlert(true);
    }
    startEdit?setStartEdit(false):setStartEdit(true);
    editingId?setEditingId(""):setEditingId(id);
    dispatch(fetchPlaylists());
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

  const addPlayListFunc = async () => {
    handleClose();
    const userId = getId();
    try {
        await addPlayList({ userId: userId, name: name });
        dispatch(fetchPlaylists());
    } catch (err) {
        console.log(err);
    }
  }

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

  return (
    <div>
      <HeaderBar />

      <Box className="fab-group">
        <Fab color="primary" size="medium" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <Fab color="primary" size="medium" aria-label="add" onClick={() => navigate('/admin/user')}>
          <ReplyIcon />
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
              playList.map((row, index) => {
                  return (
                      <TableRow hover key={row._id}>
                          <TableCell align='center' style={{color:'white'}}>{index + 1}</TableCell>
                          <TableCell align='center' style={{color:'white'}}>
                          {startEdit && row._id === editingId ? (
                            <Input
                              size="small"
                              sx={{ width: "150px", color: "white" }}
                              defaultValue={row.name}
                              onChange={(e) => setEditedData(e.target.value)}
                              onFocus={(e) =>setEditedData(e.target.defaultValue)}
                            />
                          ) : (
                            row.name
                          )}
                          </TableCell>
                          <TableCell align='center' style={{color:'white'}}>
                            <IconButton onClick={(e) => handleEdit(row._id)}>
                              {startEdit&&(row._id == editingId)?
                                <CheckIcon style={{color:'white'}} />
                                :<EditIcon style={{color:'white'}} />
                              }
                            </IconButton>
                          </TableCell>
                          <TableCell align='center' style={{color:'white'}}>
                            <IconButton onClick={(e) => handleDialog(e, row._id)} >
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
          message={"Do you really want to delete this playlist?"} 
          callback={handleDelete} 
        />
        :<></>
      }
      
      {/* New Playlist Adding Modal */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="PlayList Input Modal"
        aria-describedby="Input PlayList"
      >
        <Box sx={style}>
            <Typography style={{marginBottom:'20px', textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>Add PlayList</Typography>
            <TextField
              fullWidth
              id="name"
              label="Name"
              size='small'
              color='success'
              required
              style={{ marginBottom:'20px'}}
              onChange={(e)=>setName(e.target.value)}
            />
            <Button 
                variant="contained"
                style={{ marginLeft:'140px'}}
                onClick={()=> addPlayListFunc()}
            >
                ADD
            </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PlayList;
