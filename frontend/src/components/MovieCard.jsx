import React from 'react';

const MovieCard = ({ title = "Sample Title", year = "1995", rating = "8.5", poster }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '10px', width: '200px' }}>
      <img src={poster || "https://via.placeholder.com/200x300"} alt="Poster" style={{ width: '100%' }} />
      <h4>{title}</h4>
      <p>Year: {year}</p>
      <p>Rating: ⭐{rating}</p>
    </div>
  );
};

export default MovieCard;
