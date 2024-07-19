import React from "react";
import styled from "styled-components";
import SearchIcon from "../assets/search.svg";

const Search = () => {
  return (
    <SearchWrap>
      <SearchBox>
        <InputBox
          type="text"
          placeholder="#프로틴 #저당 등 웰니스 키워드를 검색해 주세요."
        />
        <SearchImg src={SearchIcon} alt="Search Icon" />
      </SearchBox>
    </SearchWrap>
  );
};

export default Search;

const SearchWrap = styled.div`
  border: 1px solid red;
  justify-content: center;
  width: 100%;
  display: flex;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const SearchImg = styled.img`
  width: 20px;
  margin-left: -20px;
`;

const SearchBox = styled.div`
  background-color: #f8f8f8;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 2px 0px #00000040;
  width: 90%;
  justify-content: center;
`;

const InputBox = styled.input`
  border: none;
  width: 80%;
  background-color: #f8f8f8;
  padding: 15px;
  font-size: 13px;
`;
