import API from './axiosInstance';

export const fetchVideoPlayList = (data) => API.post('/videoPlaylist/getAll', data);
export const addVideoPlayList = (data) => API.post('/videoPlaylist/add', data);
export const editVideoPlayList = (data) => API.post('/videoPlaylist/edit', data);

