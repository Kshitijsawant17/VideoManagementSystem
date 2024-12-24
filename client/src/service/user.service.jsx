import API from './axiosInstance';

export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
export const fetchUsers = () => API.get('/users/getAll');
export const editUser = (data) => API.post('/users/add', data);
export const getLogo = (data) => API.post('/users/getLogo', data);
export const uploadLogo = (data) => API.post('/users/uploadLogo', data);
export const uploadCustomLogo = (data) => API.post('/users/uploadCustomLogo', data);
export const getAgreeStatus = (data) => API.post('/users/getAgreeStatus', data);
export const changeAgreeStatus = (data) => API.post('/users/changeAgreeStatus', data);
export const getCloneStatus = (data) => API.post('/users/getCloneStatus', data);
export const changeCloneStatus = (data) => API.post('/users/changeCloneStatus', data);
