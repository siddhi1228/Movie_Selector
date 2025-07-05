import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import './Quiz.css';

const questions = [
  {
    id: 1,
    question: "What genre are you in the mood for?",
    options: ["Action", "Comedy", "Drama", "Sci-Fi"],
  },
  {
    id: 2,
    question: "Preferred release period?",
    options: ["Before 2000", "2000–2010", "2010–2020", "2020–Present"],
  },
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setCurrentQ((prev) => prev + 1);
  };

  return (
    <div className="quiz-container">
      {currentQ < questions.length ? (
        <QuestionCard
          question={questions[currentQ]}
          onAnswer={handleAnswer}
        />
      ) : (
        <div className="result-screen">
          <h2>Thanks for completing the quiz!</h2>
          <p>We’ll use your answers to recommend something great.</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
