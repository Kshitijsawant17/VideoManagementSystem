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
export const fetchUserVideo = (data) => API.post('/userVideo/get', data);
export const addUserVideo = (data) => API.post('/userVideo/add', data);
export const editUserVideo = (data) => API.post('/userVideo/edit', data);
export const deleteUserVideo = (data) => API.post('/userVideo/delete', data);
