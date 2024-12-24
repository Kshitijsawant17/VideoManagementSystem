import API from './axiosInstance';

export const fetchUserVideo = (data) => API.post('/userVideo/get', data);
export const addUserVideo = (data) => API.post('/userVideo/add', data);
export const editUserVideo = (data) => API.post('/userVideo/edit', data);
export const deleteUserVideo = (data) => API.post('/userVideo/delete', data);
