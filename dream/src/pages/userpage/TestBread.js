import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Question from "../../components/Question";
import Result from "../../components/Result";
import ProgressBar from "../../components/ProgressBar";

const TestBread = () => {
  const [scores, setScores] = useState({ F: 0, T: 0, P: 0, J: 0 });

  const questions = [
    {
      q: "빵을 구경하던 당신, 어떤 빵소개가 더 마음에 드나요?",
      a: [
        {
          text: "다이어트할 때 걱정 없이 행복하게 먹을 수 있는 베이글",
          type: "F",
        },
        {
          text: "비건빵이라 우유와 버터가 들어 있지 않고 밀가루도 넣지 않아 속이 편한 베이글",
          type: "T",
        },
      ],
    },
    {
      q: "먹어본 적이 없는 인기빵을 구매할 때, 당신이 선택한 이유는 무엇인가요?",
      a: [
        { text: "리뷰가 좋으니까 구매해야지!", type: "J" },
        { text: "오늘은 새로운 걸 시도해보고 싶으니까~", type: "P" },
      ],
    },
    // 다른 질문들 추가
  ];

  const handleOptionClick = (type, navigate, page) => {
    setScores({ ...scores, [type]: scores[type] + 1 });
    const nextPage = page + 1;
    if (nextPage < questions.length) {
      navigate(`/test/questions/${nextPage}`);
    } else {
      navigate(`/test/result`);
    }
  };

  const getResultType = () => {
    const type1 = scores.F > scores.T ? "F" : "T";
    const type2 = scores.P > scores.J ? "P" : "J";
    return `${type1}${type2}`;
  };

  return (
    <Routes>
      <Route
        path="questions/:page"
        element={
          <QuestionPage
            questions={questions}
            handleOptionClick={handleOptionClick}
          />
        }
      />
      <Route path="result" element={<Result resultType={getResultType()} />} />
      <Route path="/" element={<Navigate to="/test/questions/0" />} />
    </Routes>
  );
};

const QuestionPage = ({ questions, handleOptionClick }) => {
  const { page } = useParams();
  const navigate = useNavigate();
  const pageIndex = parseInt(page, 10);

  useEffect(() => {
    // 페이지 인덱스가 유효한지 확인하고 유효하지 않으면 첫 번째 질문으로 리다이렉트
    if (isNaN(pageIndex) || pageIndex < 0 || pageIndex >= questions.length) {
      navigate(`/test/questions/0`);
    }
  }, [pageIndex, navigate, questions.length]);

  return (
    <div>
      <ProgressBar current={pageIndex} total={questions.length} />
      <Question
        q={questions[pageIndex].q}
        a={questions[pageIndex].a}
        onOptionClick={(type) => handleOptionClick(type, navigate, pageIndex)}
      />
    </div>
  );
};

export default TestBread;
