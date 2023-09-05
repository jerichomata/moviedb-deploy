import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: [],
  },
  reducers: {
    setMovie: (state, action) => {
      state.movie.push({ ...action.payload, watchlist: true });
    },
    removeMovie: (state, action) => {
      state.movie = state.movie.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { setMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;
