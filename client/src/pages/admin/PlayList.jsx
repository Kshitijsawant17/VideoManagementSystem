import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import { 
  fetchPlayLists, 
  addPlayList, 
  deletePlaylist, 
  editPlayList 
} from '../../service/playList.service';
import { getId } from '../../utils/auth';
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
    Input
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
  const [playList, setPlayList] = useState([]);
  const [startEdit, setStartEdit] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editedData, setEditedData] = useState("");

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    const response = await deletePlaylist({id: id});
    fetchPlayListFunc();
  }
  const handleEdit = (id) => {
    if(startEdit){
      editPlayList({id:id, name:editedData});
    }
    startEdit?setStartEdit(false):setStartEdit(true);
    editingId?setEditingId(""):setEditingId(id);
    fetchPlayListFunc();
  }
  const handleInputChange = (e, id) => {
    setEditedData(e.target.value);
  }
  const handleInputFocus = (e) => {
    setEditedData(e.target.defaultValue);
    console.log(e.target.defaultValue);
  }
  const fetchPlayListFunc = async () => {
    try{
        const response = await fetchPlayLists();
    
        setPlayList(response.data.data);
    }
    catch(err){
        console.log(err);
    }
  }
  const addPlayListFunc = async () => {
    handleClose();
    const userId = getId();
    try {
        await addPlayList({ userId: userId, name: name });
        fetchPlayListFunc();
    } catch (err) {
        console.log(err);
    }
  }

  useEffect(() => {
    fetchPlayListFunc();
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
                              onChange={(e) => handleInputChange(e, row._id)}
                              onFocus={(e) =>handleInputFocus(e)}
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
                            <IconButton onClick={(e) => handleDelete(row._id)} >
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
