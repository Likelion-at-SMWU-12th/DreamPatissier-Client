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
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const loadQuestions = (page) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("토큰이 존재하지 않습니다.");
      return;
    }

    console.log(`Fetching questions for page: ${page}`);

    axios
      .get(`http://127.0.0.1:8000/test/questions/${page}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("서버로부터 받은 데이터:", response.data);
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          {
            q: response.data.question,
            a: response.data.choices,
          },
        ]);
      })
      .catch((error) => {
        console.error(
          "질문을 가져오는 중 오류 발생:",
          error.response ? error.response.data : error.message
        );
      });
  };

  useEffect(() => {
    console.log(`Current page: ${currentPage}`);
    loadQuestions(currentPage);
  }, [currentPage]);

  const getResultString = (scores) => {
    const resultArray = [];
    if (scores.F >= scores.T) resultArray.push("F");
    else resultArray.push("T");
    if (scores.P >= scores.J) resultArray.push("P");
    else resultArray.push("J");
    return resultArray.join("");
  };

  const handleOptionClick = (type, page) => {
    console.log(`Option clicked: ${type}`);

    setScores((prevScores) => {
      const updatedScores = { ...prevScores, [type]: prevScores[type] + 1 };
      const nextPage = parseInt(page) + 1;

      console.log("Updated Scores:", updatedScores);
      console.log("Total Scores:");
      console.log(`F: ${updatedScores.F}`);
      console.log(`T: ${updatedScores.T}`);
      console.log(`P: ${updatedScores.P}`);
      console.log(`J: ${updatedScores.J}`);

      if (nextPage <= 6) {
        setCurrentPage(nextPage);
        navigate(`/test/questions/${nextPage}`);
      } else {
        const resultString = getResultString(updatedScores);
        submitResult(resultString);
      }
      return updatedScores;
    });
  };

  const submitResult = (resultString) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/test/submit",
        { result: resultString },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("테스트 결과 전송 완료:", response.data);
        navigate(`/test/result/${response.data.result_id}`);
      })
      .catch((error) => {
        console.error(
          "테스트 결과 전송 중 오류 발생:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const resetTest = () => {
    setScores({ F: 0, T: 0, P: 0, J: 0 });
    setCurrentPage(1);
    navigate(`/test/questions/1`);
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
        element={<Result resetTest={resetTest} />}
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
      console.warn(`Invalid pageIndex: ${pageIndex}`);
      navigate("/test/questions/1");
    }
  }, [pageIndex, navigate, questions.length]);

  if (!questions[pageIndex]) {
    console.warn("질문 데이터가 비어 있습니다.");
    return null;
  }

  return (
    <div>
      <ProgressBar current={pageIndex} total={6} />
      <Question
        q={questions[pageIndex].q}
        a={questions[pageIndex].a}
        onOptionClick={(type) => handleOptionClick(type, page)}
      />
    </div>
  );
};

export default TestBread;
