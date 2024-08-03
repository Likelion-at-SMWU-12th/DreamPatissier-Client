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
  // 점수, 질문, 현재 페이지 관리
  const [scores, setScores] = useState({ F: 0, T: 0, P: 0, J: 0 });
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 주어진 페이지에 대한 질문을 로드하는 함수
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
        // 기존 질문 상태를 업데이트하여 새 질문을 추가
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

  // currentPage가 변경될 때마다 질문 로드
  useEffect(() => {
    console.log(`Current page: ${currentPage}`);
    loadQuestions(currentPage);
  }, [currentPage]);

  // 점수를 바탕으로 결과 문자열을 생성
  const getResultString = (scores) => {
    const resultArray = [];
    if (scores.F >= scores.T) resultArray.push("F");
    else resultArray.push("T");
    if (scores.P >= scores.J) resultArray.push("P");
    else resultArray.push("J");
    return resultArray.join("");
  };

  // 선택된 옵션에 따라 점수를 업데이트하고 다음 페이지로 이동하는 함수
  const handleOptionClick = (type, page) => {
    console.log(`Option clicked: ${type}`);

    setScores((prevScores) => {
      const updatedScores = { ...prevScores, [type]: prevScores[type] + 1 };
      const nextPage = parseInt(page) + 1; // 다음 페이지 번호 계산

      console.log("Updated Scores:", updatedScores);
      console.log("Total Scores:");
      console.log(`F: ${updatedScores.F}`);
      console.log(`T: ${updatedScores.T}`);
      console.log(`P: ${updatedScores.P}`);
      console.log(`J: ${updatedScores.J}`);

      // 다음 페이지가 6 이하이면 페이지를 이동시키고 질문을 로드합니다.
      if (nextPage <= 6) {
        setCurrentPage(nextPage);
        navigate(`/test/questions/${nextPage}`);
      } else {
        // 결과 페이지로 이동하기 전에 결과를 제출합니다.
        const resultString = getResultString(updatedScores);
        submitResult(resultString);
      }
      return updatedScores;
    });
  };

  // 테스트 결과를 서버에 제출하고 결과 페이지로 이동하는 함수
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
        navigate(`/test/result/${response.data.result_id}`); // 결과 페이지로 이동
      })
      .catch((error) => {
        console.error(
          "테스트 결과 전송 중 오류 발생:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // 테스트를 초기화하고 첫 번째 페이지로 이동하는 함수
  const resetTest = () => {
    setScores({ F: 0, T: 0, P: 0, J: 0 });
    setCurrentPage(1);
    navigate(`/test/questions/1`);
  };

  return (
    // React Router의 Routes를 사용하여 페이지를 설정합니다.
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

// QuestionPage 컴포넌트 정의
const QuestionPage = ({ questions, handleOptionClick }) => {
  const { page } = useParams(); // 현재 페이지를 URL 파라미터에서 가져옵니다.
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const pageIndex = parseInt(page, 10) - 1; // 페이지 인덱스를 0부터 시작하도록 조정

  useEffect(() => {
    // 페이지 인덱스가 유효한지 확인하고, 유효하지 않으면 첫 페이지로 이동합니다.
    if (isNaN(pageIndex) || pageIndex < 0 || pageIndex >= questions.length) {
      console.warn(`Invalid pageIndex: ${pageIndex}`);
      navigate("/test/questions/1");
    }
  }, [pageIndex, navigate, questions.length]);

  // 현재 페이지의 질문이 로드되지 않은 경우 경고 메시지를 출력하고 아무 것도 렌더링하지 않습니다.
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
