import React from 'react';
import FilterPanel from '../components/FilterPanel';
import MovieCard from '../components/MovieCard';

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <FilterPanel />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '1rem' }}>
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};

export default Home;
