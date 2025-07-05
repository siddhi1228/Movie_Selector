import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Stream Shuffler</h1>
      <p className="tagline">Shuffle the stream. Find your scene.</p>

      <div className="landing-buttons">
        <button onClick={() => navigate('/random')}>Random Picker</button>
        <button onClick={() => navigate('/quiz')}>Quiz Picker</button>
        <button disabled>Describe Your Watch (Coming Soon)</button>
        <button disabled>Blog (Coming Soon)</button>
      </div>
    </div>
  );
};

export default Landing;
