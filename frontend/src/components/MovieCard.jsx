import React from 'react';
import './MovieCard.css';

const MovieCard = ({ title, year, rating, poster, overview, providers, onShuffle }) => {
  return (
    <div className="movie-card">
      <img src={poster} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h2>{title}</h2>
        <p>Year: {year}</p>
        <p>Rating:{rating}</p>
        <p>{overview}</p>

        {providers.length > 0 ? (
          <>
            <p>Available on:</p>
            <div className="provider-logos">
              {providers.map((provider) => (
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  alt={provider.provider_name}
                  title={provider.provider_name}
                />
              ))}
            </div>
          </>
        ) : (
          <p>Not available on streaming platforms.</p>
        )}
        <div className="shuffle-button-wrapper">
          <button onClick={onShuffle}>Shuffle</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
