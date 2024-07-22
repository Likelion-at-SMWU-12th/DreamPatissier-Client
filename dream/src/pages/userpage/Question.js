import React from "react";

const Question = ({ question, onAnswer }) => {
  return (
    <div>
      <h2>{question.text}</h2>
      <div>
        {question.answers.map((answer, index) => (
          <button key={index} onClick={() => onAnswer(answer.type)}>
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
