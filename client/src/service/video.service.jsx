// import axios from 'axios';

// const API = axios.create({ baseURL: `${process.env.REACT_APP_API_HOST_DEV}/api` });

// // Attach JWT token to requests
// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem('userData').token;
//     if (token) req.headers.Authorization = `Bearer ${token}`;
//     return req;
// });

import API from './axiosInstance';

// export const fetchVideo = () => API.get('/video/get/:id');getClientVideos
export const fetchVideos = () => API.get('/videos/getAll');
export const getClientVideos = (data) => API.post('/videos/getClientAll', data);
export const videoUpload = (data) => API.post('/videos/upload', data);
export const editVideo = (data) => API.post('/videos/update', data);
export const deleteVideo = (data) => API.post('/videos/delete', data);
