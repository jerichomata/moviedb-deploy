const express = require("express");
const router = express.Router();

router.get("/movies", async (req, res) => {
  const { page } = req.query;
  try {
    const movies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTFiNmFhN2ZkODVmYjgzYmU0YTQ3ZmMzMmYxMGE2NiIsInN1YiI6IjY0ZjA1NTg3Y2FhNTA4MDBlOTUxOTExNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rDdTnil--w8IRFmnSR8WtWgzYIe3gGkuoULwOBaj97c",
        },
      }
    );
    const data = await movies.json();
    res.status(200).json(data);
  } catch (error) {}
});

router.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=211b6aa7fd85fb83be4a47fc32f10a66&language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    const data = await movie.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/search/:movie/:page?", async (req, res) => {
  const { movie, page } = req.params;
  console.log(movie);
  try {
    console.log(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=211b6aa7fd85fb83be4a47fc32f10a66&page=${page}`)
    const movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=211b6aa7fd85fb83be4a47fc32f10a66&page=${page}`
    );
    const data = await movies.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;