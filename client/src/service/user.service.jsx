// import axios from 'axios';
import API from './axiosInstance';
// const API = axios.create({ baseURL: `${process.env.REACT_APP_API_HOST_DEV}/api` });

// Attach JWT token to requests
// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem('userData').token;
//     if (token) req.headers.Authorization = `Bearer ${token}`;
//     return req;
// });

// export const fetchVideo = () => API.get('/video/get/:id');
export const fetchUsers = () => API.get('/users/getAll');
export const editUser = (data) => API.post('/users/add', data);
export const getLogo = (data) => API.post('/users/getLogo', data);
export const uploadLogo = (data) => API.post('/users/uploadLogo', data);
export const getAgreeStatus = (data) => API.post('/users/getAgreeStatus', data);
export const changeAgreeStatus = (data) => API.post('/users/changeAgreeStatus', data);
export const getCloneStatus = (data) => API.post('/users/getCloneStatus', data);
export const changeCloneStatus = (data) => API.post('/users/changeCloneStatus', data);
