import React, { useState } from 'react';
import './Quiz.css';

const QuestionCard = ({ questionObj, currentQuestionIndex, totalQuestions, onAnswer, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    if (questionObj.multiple) {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((opt) => opt !== option)
          : [...prev, option]
      );
    } else {
      setSelectedOptions([option]); 
      onAnswer(option);
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;
    onAnswer(selectedOptions);
  };

  return (
    <div className="question-card">
      <h3 className="question-text">
        {currentQuestionIndex + 1}/{totalQuestions} - {questionObj.question}
      </h3>

      <div className="options-container">
        {questionObj.options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              selectedOptions.includes(option) ? 'selected' : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {questionObj.multiple && (
        <div className="navigation-buttons">
          <button onClick={onBack} className="nav-button back-button">
              Back
          </button>

          <button
              onClick={handleNext}
              className="nav-button next-button"
              disabled={selectedOptions.length === 0}
          > 
              Next
          </button>

        </div>
      )}
    </div>
  );
};

export default QuestionCard;
