import React from "react";

const Question = ({ q, a, onOptionClick }) => (
  <div>
    <h1>{q}</h1>
    {a.map((option, index) => (
      <button key={index} onClick={() => onOptionClick(option.type)}>
        {option.text}
      </button>
    ))}
  </div>
);

export default Question;
