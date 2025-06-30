import React, { useEffect, useState, useCallback } from 'react';
import MovieCard from '../components/MovieCard';
import FilterPanel from '../components/FilterPanel';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [rating, setRating] = useState(5);
  const [yearRange, setYearRange] = useState([2000, 2024]);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchMovies = useCallback(async () => {
  try {
    const randomPage = Math.floor(Math.random() * 5) + 1;
    let url = `https://api.themoviedb.org/3/discover/${type || 'movie'}?api_key=${API_KEY}&vote_average.gte=${rating}&primary_release_date.gte=${yearRange[0]}-01-01&primary_release_date.lte=${yearRange[1]}-12-31&page=${randomPage}`;

    if (genre) url += `&with_genres=${genre}`;
    if (region && region !== 'all') url += `&with_origin_country=${region}`;

    const res = await axios.get(url);
    const shuffled = res.data.results.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 1);

    const moviesWithProviders = await Promise.all(
      selected.map(async (movie) => {
        const providerRes = await axios.get(
          `https://api.themoviedb.org/3/${type || 'movie'}/${movie.id}/watch/providers?api_key=${API_KEY}`
        );

        const regionData = providerRes.data.results?.[region] || providerRes.data.results?.['US'];
        const providers = regionData?.flatrate || regionData?.buy || regionData?.rent || [];

        return { ...movie, providers };
      })
    );

    setMovies(moviesWithProviders);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}, [API_KEY, genre, type, region, rating, yearRange]);


  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="home-container">
      <FilterPanel
        setGenre={setGenre}
        setType={setType}
        setRegion={setRegion}
        setRating={setRating}
        setYearRange={setYearRange}
        rating={rating}
        yearRange={yearRange}
      />

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
              key={movie.id}
              title={movie.title || movie.name}
              year={(movie.release_date || movie.first_air_date || 'N/A').split('-')[0]}
              rating={movie.vote_average}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              overview={movie.overview}
              providers={movie.providers}
              onShuffle={fetchMovies}
            />
        ))}
      </div>
    </div>
  );
};

export default Home;
