import '../css/home.css';
import altImg from '../assets/empty-film-purple.jpg'

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMovie } from "../store/movieSlice/movieSlice";
import { Link } from "react-router-dom";
// import { current } from '@reduxjs/toolkit';

export default function Home() {
  const dispatch = useDispatch();
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const getMovies = useCallback(async (test) => {
    console.log(currentPage)
    const response = await fetch(`/api/movies?page=${test}`);
    const data = await response.json();
    setTotalMovies(data.total_results);
    setTotalPages(data.total_pages);
    setMovies(data.results);
    console.log(data);
  });
  useEffect(() => {
    getMovies();
  }, []);

  const addToWatchlist = (id, movie) => {
    dispatch(setMovie(movie));
    setMovies((prevData) => {
      const newData = prevData.map((obj) => {
        if (obj.id === id) {
          return { ...obj, watchlist: true };
        }
        return obj;
      });

      return newData;
    });
  };
  if (loading) {
    // return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="home-page">
        <h1 className="main_heading">MOVIES</h1>
        <div className="movie-list">
          {movies.map((movie, index) => (
            <div
              to={`/movie/${movie.id}`}
              style={{ position: "relative" }}
              key={index}
              className="movie-card"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : altImg}
                  alt={altImg}
                />
                <h2 style={
                  {
                    position:"absolute",
                    bottom:10,
                    textTransform: "uppercase"
                  }
                }>{movie.title.length > 20
                  ? movie.title.slice(0, 18) + "..."
                  : movie.title}</h2>
              </Link>
              {movie.watchlist ? (
                <span
                  onClick={() => getMovies()}
                  className="material-symbols-outlined favourite_icon favourited"
                >
                  playlist_add_check
                </span>
              ) : (
                <span
                  onClick={() => addToWatchlist(movie.id, movie)}
                  className="material-symbols-outlined favourite_icon"
                >
                  favorite
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "14px", marginRight: "10px" }}>
            Total Results: {totalMovies}
          </p>
          <p style={{ fontSize: "14px" }}>
            Total Pages: {totalPages}
          </p>
        </div>
        <div className="pagination_container">
          <button
            className="pagination_btns"
            disabled={currentPage === 1}
            onClick={async () => {
              setLoading(true);
              setCurrentPage(currentPage => currentPage - 1);
              await getMovies(currentPage - 1);
              setLoading(false);
            }}
          >
            <span className="material-symbols-outlined">navigate_before</span>
          </button>

          <span>{currentPage}</span>
          <button
            className="pagination_btns"
            onClick={async () => {
              setLoading(true);
              setCurrentPage(currentPage => currentPage + 1);
              await getMovies(currentPage + 1);
              setLoading(false);
            }}
          >
            <span className="material-symbols-outlined">navigate_next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
