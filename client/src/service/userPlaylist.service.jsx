import API from './axiosInstance';

export const fetchUserPlaylist = (data) => API.post('/userPlaylist/get', data);
export const addUserPlaylist = (data) => API.post('/userPlaylist/add', data);
export const deleteUserPlaylist = (data) => API.post('/userPlaylist/delete', data);
