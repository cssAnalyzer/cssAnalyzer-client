import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MenuItem = styled.div`
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

function MenuButton({
  menuName,
  isActive,
}) {
  return isActive ? (
    <MenuItem
      className="active"
      key={menuName}
    >
      {menuName}
    </MenuItem>
  ) : (
    <MenuItem
      key={menuName}>
      {menuName}
    </MenuItem>
  );
}

MenuButton.propTypes = {
  menuName: PropTypes.string,
  isActive: PropTypes.bool,
};

export default MenuButton;
