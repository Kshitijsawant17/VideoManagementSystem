import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";
import playlistReducer from "./slices/playlistSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    playlist: playlistReducer
  }
});

export default store;