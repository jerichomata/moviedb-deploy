import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import movieSlice from "./movieSlice/movieSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieSlice,
  },
});

export default store;
