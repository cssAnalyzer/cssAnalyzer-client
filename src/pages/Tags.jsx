import React from "react";
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
  height: 16%;
  width: 30%;
  margin-top: 1rem;
`;

function Tags() {
  return (
    <>
      <Wrapper>
        <LogoImg src="/logo.png" />
        <p>여기는 Tags 페이지입니다.</p>
      </Wrapper>
    </>
  );
}

export default Tags;
