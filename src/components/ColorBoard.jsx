import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const UserPaletteSt = styled.div`
  display: flex;
  position: relative;
  width: 33.3%;
  height: 55%;
  margin-top: 38%;
`;

function ColorBoard({ children, title }) {
  return (
    <>
      <UserPaletteSt>
        {title}
        {children}
      </UserPaletteSt>
    </>
  );
}

ColorBoard.propTypes = {
  title: propTypes.string,
  children: propTypes.string,
}

export default ColorBoard;
