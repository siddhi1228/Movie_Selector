import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ setGenre, setType, setRegion, setRating, setYearRange, rating, yearRange }) => {
  const genreOptions = [
    { label: 'Action', value: '28' },
    { label: 'Comedy', value: '35' },
    { label: 'Drama', value: '18' },
    { label: 'Animation', value: '16' },
    { label: 'Horror', value: '27' },
    { label: 'Romance', value: '10749' },
    { label: 'Thriller', value: '53' },
    { label: 'Documentary', value: '99' },
    { label: 'Mystery', value: '9648' },
    { label: 'Fantasy', value: '14' },
    { label: 'Science Fiction', value: '878' },
    { label: 'Adventure', value: '12' },
    { label: 'Family', value: '10751' },
    { label: 'History', value: '36' },
    { label: 'Western', value: '37' },
    { label: 'Music', value: '10402' },
    { label: 'War', value: '10752' },
    { label: 'Crime', value: '80' },
  ];

  const regionOptions = [
    { label: 'United States', value: 'US' },
    { label: 'India', value: 'IN' },
    { label: 'Korean', value: 'KR' },
    { label: 'Japanese', value: 'JP' },
    { label: 'Thai', value: 'TH' },
    { label: 'French', value: 'FR' },
    { label: 'Spanish', value: 'ES' },
    { label: 'British', value: 'GB' },
    { label: 'Chinese', value: 'CN' },
    { label: 'German', value: 'DE' },
    { label: 'Italian', value: 'IT' },
    { label: 'Russian', value: 'RU' },
    { label: 'Brazilian', value: 'BR' },
    { label: 'Turkish', value: 'TR' },
    { label: 'Mexican', value: 'MX' },
    { label: 'Canadian', value: 'CA' },
    { label: 'Australian', value: 'AU' },
    { label: 'South African', value: 'ZA' },
    { label: 'Philippine', value: 'PH' },
    { label: 'Other', value: 'other' },
    { label: 'All Regions', value: 'all' },
  ];

  return (
    <div className="filter-panel">
      <h2>Filters</h2>

      <div className="filter-controls">
        <label>
          Genre:
          <select onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            {genreOptions.map((genre) => (
              <option key={genre.value} value={genre.value}>{genre.label}</option>
            ))}
          </select>
        </label>

        <label>
          Type:
          <select onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="movie">Movie</option>
            <option value="tv">Series</option>
          </select>
        </label>

        <label>
          Region:
          <select onChange={(e) => setRegion(e.target.value)}>
            <option value="">Select Region</option>
            {regionOptions.map((region) => (
              <option key={region.value} value={region.value}>{region.label}</option>
            ))}
          </select>
        </label>

        <label>
          Minimum Rating: {rating}
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            defaultValue="5"
            onChange={(e) => setRating(e.target.value)}
          />
        </label>

        <label>
  Year Range: {yearRange[0]} - {yearRange[1]}
  <div className="year-sliders">
    <input
      type="range"
      min="1980"
      max={new Date().getFullYear()}
      value={yearRange[0]}
      onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
    />
    <input
      type="range"
      min="1980"
      max={new Date().getFullYear()}
      value={yearRange[1]}
      onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
    />
  </div>
</label>

      </div>
    </div>
  );
};

export default FilterPanel;
