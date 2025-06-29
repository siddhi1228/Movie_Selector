import React from 'react';
import './MovieCard.css';

const MovieCard = ({ title, year, rating, poster }) => {
  return (
    <div className="movie-card">
      <img src={poster} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h2>{title}</h2>
        <p>Year: {year}</p>
        <p>Rating: ⭐ {rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
