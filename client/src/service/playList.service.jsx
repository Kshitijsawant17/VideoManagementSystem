// import axios from 'axios';
import API from './axiosInstance';

// const API = axios.create({ baseURL: `${process.env.REACT_APP_API_HOST_DEV}/api` });

// // Attach JWT token to requests
// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem('userData').token;
//     console.log(token);
//     if (token) req.headers.Authorization = `Bearer ${token}`;
//     return req;
// });

export const fetchPlayList = () => API.get('/playlist/get/:id');
export const fetchPlayLists = () => API.get('/playlist/getAll');
export const addPlayList = (data) => API.post('/playlist/add', data);
export const editPlayList = (data) => API.post('/playlist/edit', data);
export const deletePlaylist = (data) => API.post('/playlist/delete', data);
export const getClientPlaylists = (data) => API.post('/playlist/getClientPlaylists', data);
