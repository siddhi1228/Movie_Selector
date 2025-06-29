import React from 'react';

const FilterPanel = ({ setGenre, setType }) => {
  const genreOptions = [
    { label: 'Action', value: '28' },
    { label: 'Comedy', value: '35' },
    { label: 'Drama', value: '18' },
    { label: 'Animation', value: '16' },
    { label: 'Horror', value: '27' },
    { label: 'Romance', value: '10749' },
    { label: 'Thriller', value: '53' },
    { label: 'Documentary', value: '99' },
  ];

  return (
    <div className="FilterPanel">
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Filters</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Genre:</label>
        <select
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
          onChange={(e) => setGenre(e.target.value)}
        >
          {genreOptions.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Type:</label>
        <select
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
          onChange={(e) => setType(e.target.value === 'movie' ? 'movie' : 'tv')}
        >
          <option value="movie">Movie</option>
          <option value="tv">Series</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
