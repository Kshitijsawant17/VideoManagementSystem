import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from '../../service/user.service';

const initialState = {
  users: []
};

export const fetchAllUsers = createAsyncThunk('users/getAll', async () => {
  const response = await fetchUsers();
  return response.data.data;
});

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
  },
});

export default userSlice.reducer;