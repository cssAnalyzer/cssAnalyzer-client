import React from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUrl } from "../features/dataSlice";

import MenuButton from "./MenuButton";
import SearchBox from "./SearchBox";
import getSearchResult from "../api/search";

const MenuBarSt = styled.div`
  z-index: 1;
  margin-top: calc(1% + 140px);
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: 100%;
  height: 5%;
`;

const MenuBottomBar = styled.div`
  z-index: 1;
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-items: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.PURPLE};
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: 100%;
  height: 5px;
`;

const SearchBoxLogoWrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 150px;
`;

const MenuNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.PURPLE};

  &[visited] {
    color: ${({ theme }) => theme.colors.PURPLE};
  }
`;

const LogoImg = styled.img`
  z-index: 1;
  display: flex;
  height: 150px;
  width: 450px;
  margin: 1rem 5rem auto;
`;

function Menu() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const inputUrl = useSelector(state => state.data.inputUrl);

  const menuItems = [
    "Attributes",
    "Tags",
    "Browser",
    "Color",
  ];

  const handleSearchBox = (inputUrl) => {
    dispatch(setUrl(inputUrl));

    history.push(pathname);
  };

  return (
    (pathname !== "/") && (
      <>
        <SearchBoxLogoWrapper>
          <NavLink to="/">
            <LogoImg src="/logo.png" />
          </NavLink>
          <SearchBox onSubmit={handleSearchBox} />
        </SearchBoxLogoWrapper>
        <MenuBarSt>
          {menuItems.map((menu) => {
            return (
              <MenuNavLink
                to={`/${menu}`}
                key={`/${menu}`}
              >
                <MenuButton
                  menuName={menu}
                  isActive={pathname === `/${menu}`}
                />
              </MenuNavLink>
            );
          })}
          <MenuBottomBar />
        </MenuBarSt>
      </>
    )
  );
}

export default Menu;
