import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Box = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  line-height: 5vh;
  z-index: 1;
  color: ${({ theme }) => theme.colors.WHITE};
  width: calc(5vw);
  height: calc(5vh);
  margin: 5vh;
  background-color: ${({ theme }) => theme.colors.PURPLE};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  animation: ${ boxFade } 2s 1s infinite linear alternate;

  &:hover {
    color: ${({ theme }) => theme.colors.BLACK};
    background-color: ${({ theme }) => theme.colors.WHITE};
    border: solid 3px ${({ theme }) => theme.colors.PURPLE};
    width: calc(50vw);
    height: calc(7vh);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    animation-play-state: paused;
    opacity: 1;
  }

  @media (min-width: 280px) and (max-width: 480px) {
    {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
`;

function ExplainModal({ text }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Box
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {(isHover) ? text : "?"}
    </Box>
  );
}

ExplainModal.propTypes = {
  text: PropTypes.string,
};

export default ExplainModal;
