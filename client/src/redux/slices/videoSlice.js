import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVideos, getClientVideos } from '../../service/video.service';

const initialState = {
  videos: [],
};

export const fetchAllVideos = createAsyncThunk('videos/getAll', async () => {
  const response = await fetchVideos();
  return response.data.data;
});

export const fetchClientVideos = createAsyncThunk('videos/getClientAll', async (data) => {
    const response = await getClientVideos(data);
    return response.data.data;
});

export const videoSlice = createSlice({
  name: "Video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
      .addCase(fetchClientVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
  },
});

export default videoSlice.reducer;