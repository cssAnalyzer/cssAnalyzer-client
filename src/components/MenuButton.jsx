import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MenuItem = styled.div`
  display: flex;
  margin-top: calc(2vh);
  padding: 20px 40px 10px 40px;

  &.active{
    background-color: ${({ theme }) => theme.colors.PURPLE};
    color: ${({ theme }) => theme.colors.WHITE};
    border-radius: 30px 30px 0 0;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    {
      padding: 15px 20px 10px 20px;

      &.active{
        border-radius: 15px 15px 0 0;
      }
    }
  }

  @media (max-width: 480px) {
    {
      padding: 10px 15px 5px 15px;

      &.active{
        border-radius: 15px 15px 0 0;
      }
    }
  }
`;

const MenuBottomBar = styled.div`
  z-index: 1;
  margin-left: -10vw;
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-items: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.PURPLE};
  width: 110%;
  height: 5px;
`;

function MenuButton({
  menuName,
  isActive,
}) {
  return (
    <>
      { isActive ? (
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
      ) }
      <MenuBottomBar />
    </>
  );
}

MenuButton.propTypes = {
  menuName: PropTypes.string,
  isActive: PropTypes.bool,
};

export default MenuButton;
