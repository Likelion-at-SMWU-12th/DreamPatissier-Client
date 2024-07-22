import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "../userpage/Question";
import ProgressBar from "../userpage/ProgressBar";
import Result from "../userpage/Result";

const TestBread = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [weights, setWeights] = useState({ F: 0, T: 0, P: 0, J: 0 });
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  // 질문 데이터 가져오기
  useEffect(() => {
    axios
      .get("/test/questions/1")
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Failed to fetch questions:", error));
  }, []);

  // 답변 처리
  const handleAnswer = (type) => {
    setWeights((prevWeights) => ({
      ...prevWeights,
      [type]: prevWeights[type] + 1,
    }));
    setProgress(((currentQuestion + 1) / questions.length) * 100);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitResults();
    }
  };

  // 결과 제출
  const submitResults = () => {
    axios
      .post("/test/submit", weights)
      .then((response) => setResult(response.data))
      .catch((error) => console.error("Failed to submit results:", error));
  };

  return (
    <div>
      {result ? (
        <Result result={result} />
      ) : (
        <div>
          내일의 나에게 맡긴다 ~
          <ProgressBar progress={progress} />
          {questions.length > 0 && (
            <Question
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TestBread;
