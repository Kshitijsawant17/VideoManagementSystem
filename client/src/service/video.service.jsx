import API from './axiosInstance';

export const fetchVideos = () => API.get('/videos/getAll');
export const getClientVideos = (data) => API.post('/videos/getClientAll', data);
export const videoUpload = (data) => API.post('/videos/upload', data);
export const editVideo = (data) => API.post('/videos/update', data);
export const deleteVideo = (data) => API.post('/videos/delete', data);
export const watchVideo = (data) => API.post('/videos/watch', data);
