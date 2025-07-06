import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import quizQuestions from './questions';
import QuestionCard from './QuestionCard';
import './Quiz.css';

const genreMap = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Romance: 10749,
  Thriller: 53,
  Horror: 27,
  SciFi: 878,
  Mystery: 9648,
  Documentary: 99,
  Animation: 16,
};

const regionMap = {
  'Bollywood (India)': 'hi',
  'Hollywood (US)': 'en',
   Korean: 'ko',
   Japanese: 'ja',
   Thai: 'th',
   European: 'fr',
   Other: null,
};

const typeMap = {
  Movie: 'movie',
  'TV Show': 'tv',
  'Mini-Series': 'tv',
   Documentary: 'movie',
};

const filterHierarchy = ['runtime', 'ratings', 'era', 'languages', 'genres'];

const fetchWithFallback = async (filters, API_KEY, setRecommendedMovie, level = 0) => {
  if (level > filterHierarchy.length) {
    setRecommendedMovie(null);
    return;
  }

  const currentFilters = { ...filters };
  for (let i = 0; i < level; i++) {
    const filterToDrop = filterHierarchy[i];
    currentFilters[filterToDrop] = null;
  }

  const typeList = currentFilters.types.length > 0 ? currentFilters.types : ['movie'];
  const randomType = typeList[Math.floor(Math.random() * typeList.length)];

  let url = `https://api.themoviedb.org/3/discover/${randomType}?api_key=${API_KEY}`;

  if (currentFilters.genres)
    url += `&with_genres=${currentFilters.genres}`;

  if (currentFilters.languages)
    url += `&with_original_language=${currentFilters.languages}`;

  if (currentFilters.ratings?.length > 0) {
    const rating = parseInt(currentFilters.ratings[0]);
    if (!isNaN(rating)) url += `&vote_average.gte=${rating}`;
  }

  if (currentFilters.era?.length > 0) {
    const era = currentFilters.era[0];
    let yearStart = '2000';
    let yearEnd = '2025';
    if (era.includes('Classic')) [yearStart, yearEnd] = ['1950', '1999'];
    else if (era.includes('Early 2000s')) [yearStart, yearEnd] = ['2000', '2010'];
    else if (era.includes('Modern')) [yearStart, yearEnd] = ['2011', '2020'];
    else if (era.includes('Latest')) [yearStart, yearEnd] = ['2021', '2025'];

    url += `&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31`;
  }

  if (currentFilters.runtime?.includes('Less than 90 minutes')) url += `&with_runtime.lte=90`;
  else if (currentFilters.runtime?.includes('90–120 minutes')) url += `&with_runtime.gte=90&with_runtime.lte=120`;
  else if (currentFilters.runtime?.includes('More than 120 minutes')) url += `&with_runtime.gte=120`;

  try {
    const res = await axios.get(url);
    const results = res.data.results;
    const movie = results[Math.floor(Math.random() * results.length)];

    if (!movie) {
      return fetchWithFallback(filters, API_KEY, setRecommendedMovie, level + 1);
    }

    const trailerRes = await axios.get(
      `https://api.themoviedb.org/3/${randomType}/${movie.id}/videos?api_key=${API_KEY}`
    );
    const trailer = trailerRes.data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    const providerRes = await axios.get(
      `https://api.themoviedb.org/3/${randomType}/${movie.id}/watch/providers?api_key=${API_KEY}`
    );
    const providerRegion = movie.original_language || 'US';
    const regionData = providerRes.data.results?.[providerRegion] || providerRes.data.results?.['US'];
    const providers = regionData?.flatrate || regionData?.buy || regionData?.rent || [];

    setRecommendedMovie({
      ...movie,
      trailerKey: trailer?.key || null,
      providers,
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    setRecommendedMovie(null);
  }
};

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const getFiltersFromAnswers = (answers) => {
    return {
      genres: answers[1]?.map((g) => genreMap[g]).filter(Boolean).join(',') || '',
      types: answers[3]?.map((t) => typeMap[t]).filter(Boolean),
      languages: answers[5]?.map((r) => regionMap[r]).filter(Boolean).join(',') || '',
      ratings: answers[6]?.filter((r) => r !== 'Any'),
      runtime: answers[2] || [],
      era: answers[4] || [],
    };
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    if (isFinished && answers.length === quizQuestions.length) {
      const filters = getFiltersFromAnswers(answers);
      fetchWithFallback(filters, API_KEY, setRecommendedMovie, 0);
    }
  }, [isFinished, answers, API_KEY]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsFinished(false);
    setRecommendedMovie(null);
  };

  return (
    <div className="quiz-container">
      <div className="home-link">
        <Link to="/" className="home-button">Home</Link>
      </div>

      {!isFinished ? (
        <QuestionCard
          questionObj={quizQuestions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizQuestions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      ) : (
        <>
          <div className="result-section">
            <h2>Quiz Completed</h2>
            <p>Here's your recommendation:</p>
          </div>

          {recommendedMovie ? (
            <div className="movie-display">
              <h3>{recommendedMovie.title || recommendedMovie.name}</h3>
              <p>{recommendedMovie.vote_average}</p>
              <p>{recommendedMovie.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`}
                alt={recommendedMovie.title}
                style={{ maxWidth: '300px', borderRadius: '10px' }}
              />
              {recommendedMovie.trailerKey && (
                <div className="trailer-section">
                  <h4>Trailer</h4>
                  <iframe
                    src={`https://www.youtube.com/embed/${recommendedMovie.trailerKey}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {recommendedMovie.providers.length > 0 ? (
                <>
                  <p>Available on:</p>
                  <div className="provider-logos">
                    {recommendedMovie.providers.map((provider) => (
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
            </div>
          ) : (
            <p>Loading. This may take time.</p>
          )}

          <button className="retake-button" onClick={resetQuiz}>
            Retake Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
