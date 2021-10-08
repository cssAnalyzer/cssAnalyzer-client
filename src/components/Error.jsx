import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { removeError } from "../features/errorSlice";

const ErrorWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.YELLOW};
  z-index: 1;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  width: 100%;
  height: 100px;
`;

const InnerMsg = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px;
  font-size: 1.2rem;
`;

const CloseButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
  width: 50px;
  height: 50px;
  font-size: 2rem;
`;

function Error({ statusCode, message }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleConfirm = function () {
    dispatch(removeError());
    history.goBack();
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
};

export default Error;