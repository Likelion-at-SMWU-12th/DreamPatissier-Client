import React, { useEffect, useState } from "react";
import axios from "axios";

const Result = ({ resultType }) => {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    axios
      .get(`/test/result/${resultType}`)
      .then((response) => setResultData(response.data))
      .catch((error) => console.error(error));
  }, [resultType]);

  if (!resultData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{resultData.title}</h1>
      <img src={resultData.img} alt="result" />
      <div>{resultData.description}</div>
      <ul>
        {resultData.recommend.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
