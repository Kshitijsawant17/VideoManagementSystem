// import axios from 'axios';

// const API = axios.create({ baseURL: `${process.env.REACT_APP_API_HOST_DEV}/api` });

// // Attach JWT token to requests
// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem('userData').token;
//     if (token) req.headers.Authorization = `Bearer ${token}`;
//     return req;
// });

import API from './axiosInstance';

// export const fetchVideo = () => API.get('/video/get/:id');
export const fetchUserPlaylist = (data) => API.post('/userPlaylist/get', data);
export const addUserPlaylist = (data) => API.post('/userPlaylist/add', data);
export const editUserPlaylist = (data) => API.post('/userPlaylist/edit', data);
export const deleteUserPlaylist = (data) => API.post('/userPlaylist/delete', data);
