import API from './axiosInstance';

export const fetchPlayList = () => API.get('/playlist/get/:id');
export const fetchPlayLists = () => API.get('/playlist/getAll');
export const addPlayList = (data) => API.post('/playlist/add', data);
export const editPlayList = (data) => API.post('/playlist/edit', data);
export const deletePlaylist = (data) => API.post('/playlist/delete', data);
export const getClientPlaylists = (data) => API.post('/playlist/getClientPlaylists', data);
