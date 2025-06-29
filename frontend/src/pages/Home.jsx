import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import FilterPanel from '../components/FilterPanel';
import axios from 'axios';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('28'); // Default: Action
  const [type, setType] = useState('movie'); // Default: Movie

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 10) + 1;
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genre}&page=${randomPage}`;
        const res = await axios.get(url);
        const shuffled = res.data.results.sort(() => 0.5 - Math.random());
        setMovies(shuffled.slice(0, 9));
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchMovies();
  }, [genre, type, API_KEY]);

  return (
    <div className="container">

      <div className="main">
        <FilterPanel setGenre={setGenre} setType={setType} />

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title || movie.name}
              year={(movie.release_date || movie.first_air_date || 'N/A').split('-')[0]}
              rating={movie.vote_average}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
