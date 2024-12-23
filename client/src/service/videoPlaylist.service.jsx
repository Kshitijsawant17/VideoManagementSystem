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
export const fetchVideoPlayList = (data) => API.post('/videoPlaylist/getAll', data);
export const addVideoPlayList = (data) => API.post('/videoPlaylist/add', data);
export const editVideoPlayList = (data) => API.post('/videoPlaylist/edit', data);
// export const deleteVideo = () => API.get('/video/delete/:id');
