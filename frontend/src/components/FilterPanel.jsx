import React from 'react';

const FilterPanel = () => {
  return (
    <div style={{ padding: '1rem', width: '250px', backgroundColor: '#f4f4f4' }}>
      <h3>Filters</h3>
      <div>
        <label>Genre:</label>
        <select>
          <option>Comedy</option>
          <option>Action</option>
          <option>Drama</option>
        </select>
      </div>
      <div>
        <label>Type:</label>
        <select>
          <option>Movie</option>
          <option>Series</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
