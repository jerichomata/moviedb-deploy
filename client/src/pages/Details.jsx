import '../css/details.css';

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const { id } = params;
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const getDetails = async () => {
    const response = await fetch(`/api/movie/${id}`);
    const data = await response.json();
    console.log(data);
    setMovie(data);
    setBackgroundUrl(`https://image.tmdb.org/t/p/w500${data?.poster_path}`);
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="over-details-container">
      <div className="details-background"
        style={{
          backgroundImage: `url(${backgroundUrl})`
        }}
      ></div>
      <div className="movie_detail">
        <div className="movie_detail__poster">
          <img
            src={backgroundUrl}
            height={200}
            width={200}
            className="detail_Poster"
          />
        </div>
        <div className="movie_Desc">
          <h1 className="main_heading">{movie?.title}</h1>
          <hr className="divider" />
          <p className="movie_Desc__overview">{movie?.overview}</p>
          <div className="detail_container">
            <p className="detail_item">Status: {movie?.status}</p>
            <p className="detail_item">
              Duration <span className="material-symbols-outlined">schedule</span>:&nbsp;
              {movie?.runtime}min
            </p>
            <p className="detail_item">
              Vote Count<span class="material-symbols-outlined">thumb_up</span>{" "}
              : {movie?.vote_count}
            </p>
          </div>
          <div className="generes">
            Generes: 
            {movie?.genres.map((genre, index) => (
              <span key={genre.id} className="movie_Desc__genre">
                {genre.name}
                {index !== movie.genres.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
          <a className="details-button" href={movie?.homepage} target="_blank">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
