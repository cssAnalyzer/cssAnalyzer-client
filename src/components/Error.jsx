import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeError } from "../features/errorSlice";

const ErrorWrapper = styled.div`
  position: fixed;
  margin-top: 15vh;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.YELLOW};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(8vh);
  color: ${({ theme }) => theme.colors.BLACK};

  @media (min-width: 481px) and (max-width: 767px) {
    {
      margin-top: 14vh;
    }
  }

  @media (max-width: 480px) {
    {
      margin-top: 11vh;
      height: calc(6vh);
    }
  }
`;

const InnerMsg = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 10px;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    {
      font-size: 1rem
    }
  }
`;

const CloseButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1vw;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  cursor: pointer;

  @media (max-width: 480px) {
    {
      font-size: 1rem;
      margin-right: 1vw;
    }
  }
`;

function Error({ statusCode, message, isMain }) {
  const dispatch = useDispatch();

  const handleConfirm = function () {
    dispatch(removeError());
  };

  return (
    <ErrorWrapper
      onClick={handleConfirm}
    >
      <InnerMsg>
        {`${statusCode} : ${message}`}
      </InnerMsg>
      <CloseButton
        onClick={handleConfirm}
      >
        X
      </CloseButton>
    </ErrorWrapper>
  );
}

Error.propTypes = {
  statusCode: PropTypes.number,
  message: PropTypes.string,
  isMain: PropTypes.string,
};

export default Error;