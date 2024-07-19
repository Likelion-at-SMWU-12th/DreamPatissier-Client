import React from "react";
import styled from "styled-components";

const Search = () => {
  return (
    <SearchWrap>
      <SearchBox>
        <input type="text"></input>
        <img></img>
      </SearchBox>
    </SearchWrap>
  );
};

export default Search;

const SearchWrap = styled.div`
  border: 1px solid red;
`;

const SearchBox = styled.div`
  background-color: #f8f8f8;
  border-radius: 10px;
  margin: 5px;
`;
