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
    <div className="p-6 w-[250px] bg-gray-100 flex-shrink-0">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Genre:</label>
        <select
          className="w-full border rounded px-2 py-1"
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
        <label className="block font-medium mb-1">Type:</label>
        <select
          className="w-full border rounded px-2 py-1"
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
