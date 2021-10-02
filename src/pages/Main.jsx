import React from "react";
import { useHistory } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import styled from "styled-components";
import postSearchResult from "../api/search";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  display: absolute;
  height: 16%;
  width: 30%;
  margin-top: 1rem;
`;

function Main() {
  const history = useHistory();

  const handleSearchBox = async function (inputUrl) {
    const data = await postSearchResult("/", inputUrl);
    history.push({
      pathname: "/attributes",
      data,
    });
  };

  return (
    <>
      <Wrapper>
        <LogoImg src="/logo.png" />
        <SearchBox
          onSubmit={handleSearchBox}
        />
      </Wrapper>
    </>
  );
}

export default Main;
