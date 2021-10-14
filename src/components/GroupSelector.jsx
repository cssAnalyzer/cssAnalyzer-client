import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const GroupButton = styled.button`
  display: flex;
  margin: auto;
  padding: 20px 40px 10px 40px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};

  &.active{
    background-color: ${({ theme }) => theme.colors.PURPLE};
    color: ${({ theme }) => theme.colors.WHITE};
    border-radius: 30px 30px 0 0;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  width: 500px;
  height: calc(10vh + 1px);
`;

function GroupSelector({
  isActive,
  handleClick,
}) {
  return (
    <SelectorWrapper>
      <GroupButton
        onClick={handleClick}
        value="all"
        isActive={isActive}
      >
      Show All
      </GroupButton>
      <GroupButton
        onClick={handleClick}
        value="year"
        isActive={isActive}
      >
      Show Year
      </GroupButton>
    </SelectorWrapper>
  );
}

GroupSelector.propTypes = {
  handleClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default GroupSelector;
