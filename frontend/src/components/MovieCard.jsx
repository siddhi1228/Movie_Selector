import React from 'react';
import './MovieCard.css';

const MovieCard = ({ title, year, rating, poster, overview, providers, trailerKey, onShuffle }) => {
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
         {trailerKey ? (
  <div className="trailer-section">
    <h3>🎬 Trailer</h3>
    <iframe
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${trailerKey}`}
      title="Trailer"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
) : (
  <p>No trailer available</p>
)}


        <div className="shuffle-button-wrapper">
          <button onClick={onShuffle}>Shuffle</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
