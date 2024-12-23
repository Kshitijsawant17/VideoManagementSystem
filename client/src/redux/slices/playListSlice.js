import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../service/axiosInstance';

const initialState = {
  playlists: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch playlist data
export const fetchPlaylists = createAsyncThunk('playlist/get_all', async () => {
  const response = await API.get('/playlist/get_all');
  return response.data;
});

export const addPlaylist = createAsyncThunk('playlist/add', async (newPlaylist, thunkAPI) => {
    try {
      const response = await API.post('/playlist/add', newPlaylist);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add playlist');
    }
});

const playListSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.playlists = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectPlaylists = (state) => state.playlist.playlists;
export const selectPlaylistStatus = (state) => state.playlist.status;

export default playListSlice.reducer;
