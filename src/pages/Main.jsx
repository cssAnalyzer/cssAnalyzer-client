import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUrl } from "../features/dataSlice";
import SearchBox from "../components/SearchBox";
import styled from "styled-components";

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
  width: calc(50%);
  margin-top: 1rem;

  @media (min-width: 280px) and (max-width: 480px) {
    {
      width: calc(100%);
      margin-bottom: 2rem;
    }
  }
`;

function Main() {
  const history = useHistory();
  const dispatch = useDispatch();
  const inputUrl = useSelector(state => state.data.inputUrl);

  const handleSearchBox = (url) => {
    dispatch(setUrl(url));

    history.push("/attributes");
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
