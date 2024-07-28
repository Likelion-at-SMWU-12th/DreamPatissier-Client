import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Question from "../../components/Question.jsx";
import Result from "../../components/Result.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import axios from "axios";

const TestBread = () => {
  const [scores, setScores] = useState({ F: 0, T: 0, P: 0, J: 0 });
  const [resultsData, setResultsData] = useState([]);

  const questions = [
    {
      q: "빵을 구경하던 당신, <br /> 어떤 빵소개가 더 마음에 드나요?",
      a: [
        {
          text: "다이어트할 때 걱정 없이 행복하게 먹을 수 있는 베이글",
          type: "F",
        },
        {
          text: "비건빵이라 우유와 버터가 들어 있지 않고 <br /> 밀가루도 넣지 않아 속이 편한 베이글",
          type: "T",
        },
      ],
    },
    {
      q: "먹어본 적이 없는 <br /> 인기빵을 구매할 때,<br /> 당신이 선택한 이유는 무엇인가요?",
      a: [
        { text: "리뷰가 좋으니까 구매해야지!", type: "J" },
        { text: "오늘은 새로운 걸 시도해보고 싶으니까~", type: "P" },
      ],
    },
    {
      q: "레시피대로 빵을 만들던 중,<br />레시피와 모양이 다른 빵이<br />만들어졌을 때의 반응은 무엇인가요?",
      a: [
        {
          text: "레시피랑 달라도 새로운 빵이 만들어지다니<br />완전 럭키비키잖아~",
          type: "P",
        },
        { text: "레시피대로 완성되지 않다니 너무 속상해..", type: "J" },
      ],
    },
    {
      q: "친구한테 온 연락!<br />우울해서 빵을 샀다고 했을 때<br />당신의 반응은 무엇인가요?",
      a: [
        { text: "무슨 빵을 샀을까? 크림빵?", type: "T" },
        { text: "왜 우울한지 궁금하다", type: "F" },
      ],
    },
    {
      q: "빵을 사러 나갔을 때,<br />당신의 선택 방법은 무엇인가요?",
      a: [
        {
          text: "빵집의 메뉴를 미리 살펴보고<br />어떤 빵을 사고 싶은지 결정해 두었다.",
          type: "J",
        },
        { text: "빵집에 가서 그때 그때 눈에 들어오는 빵을 고른다.", type: "P" },
      ],
    },
    {
      q: "친구가 새로운 빵을 추천할 때,<br />당신의 반응은 무엇인가요?",
      a: [
        {
          text: "친구가 그 빵을 좋아하는 이유와 맛이 궁금하다.",
          type: "F",
        },
        {
          text: "빵의 성분, 영양정보, 다른 사람들의 리뷰가 궁금하다.",
          type: "T",
        },
      ],
    },
  ];

  useEffect(() => {
    axios
      .get("/test.json")
      .then((response) => {
        setResultsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching test results", error);
      });
  }, []);

  const getResultString = (scores) => {
    const resultArray = [];
    if (scores.F >= scores.T) resultArray.push("F");
    else resultArray.push("T");
    if (scores.P >= scores.J) resultArray.push("P");
    else resultArray.push("J");
    return resultArray.join("");
  };

  const handleOptionClick = (type, navigate, page) => {
    setScores((prevScores) => {
      const updatedScores = { ...prevScores, [type]: prevScores[type] + 1 };
      const nextPage = page + 1;
      if (nextPage < questions.length) {
        navigate(`/test/questions/${nextPage + 1}`);
      } else {
        const resultString = getResultString(updatedScores);
        const result = resultsData.find((r) => r.type === resultString);
        if (result) {
          navigate(`/test/result/${result.id}`);
        } else {
          console.error("Result not found for type", resultString);
        }
      }
      return updatedScores;
    });
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
      <Route
        path="result/:resultId"
        element={<Result resultsData={resultsData} />}
      />
      <Route path="/" element={<Navigate to="/test/questions/1" />} />
    </Routes>
  );
};

const QuestionPage = ({ questions, handleOptionClick }) => {
  const { page } = useParams();
  const navigate = useNavigate();
  const pageIndex = parseInt(page, 10) - 1;

  useEffect(() => {
    if (isNaN(pageIndex) || pageIndex < 0 || pageIndex >= questions.length) {
      navigate("/test/questions/1");
    }
  }, [pageIndex, navigate, questions.length]);

  if (pageIndex < 0 || pageIndex >= questions.length) {
    return null;
  }

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
