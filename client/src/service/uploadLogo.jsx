import API from './axiosInstance';

export const uploadLogo = (FormData) => API.post('/users/uploadLogo', FormData);
export const editUser = (data) => API.post('/users/add', data);