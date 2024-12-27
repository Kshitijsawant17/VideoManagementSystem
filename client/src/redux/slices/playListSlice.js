import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPlayLists, getClientPlaylists } from '../../service/playList.service';

const initialState = {
  playlists: [],
};

export const fetchPlaylists = createAsyncThunk('playlist/fetchPlayLists', async () => {
  const response = await fetchPlayLists();
  return response.data.data;
});

export const fetchClientPlaylists = createAsyncThunk('playlist/fetchClientPlayLists', async (data) => {
  const response = await getClientPlaylists(data);
  return response.data.data;
});

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(fetchClientPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
  },
});

export default playlistSlice.reducer;
