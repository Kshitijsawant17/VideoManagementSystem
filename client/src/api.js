import axios from 'axios';

const API = axios.create({ baseURL: `${process.env.REACT_APP_API_HOST_DEV}/api` });

// Attach JWT token to requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
// export const videoUpload = (formData) => API.post('/videos', formData);
export const watchVideo = (data) => API.post('/videos/watch', data);
export const videoFetch = () => API.get('/videos');
export const fetchPlayList = () => API.get('/videos');
