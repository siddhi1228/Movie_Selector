import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/image.png" alt="Stream Shuffler" className="logo" />
      <div className="title-block">
        <h1 className="app-title">Stream Shuffler</h1>
        <p className="tagline">Shuffle the stream. Find your scene.</p>
      </div>
    </nav>
  );
};

export default Navbar;
