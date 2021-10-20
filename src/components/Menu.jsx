import React from "react";
import styled from "styled-components";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUrl } from "../features/dataSlice";
import MenuButton from "./MenuButton";
import SearchBox from "./SearchBox";
import Error from "./Error";

const MenuBarSt = styled.div`
  z-index: 1;
  margin-top: calc(21vh);
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  width: 100%;
  height: calc(5vh);

  @media (min-width: 481px) and (max-width: 767px) {
    {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }

  @media (max-width: 480px) {
    {
      font-size: ${({ theme }) => theme.fontSizes.xSmall};
    }
  }
`;

const SearchBoxLogoWrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: calc(15vh);
  margin: 1rem;

  @media (min-width: 481px) and (max-width: 767px) {
    {
      margin: 1rem 0 0 0;
    }
  }

  @media (max-width: 480px) {
    {
      margin: 1rem 0 0 0;
      flex-direction: column;
    }
  }
`;

const MenuNavLink = styled(NavLink)`
  z-index: 1;
  color: ${({ theme }) => theme.colors.PURPLE};

  &[visited] {
    color: ${({ theme }) => theme.colors.PURPLE};
  }
`;

const LogoImg = styled.img`
  z-index: 1;
  display: flex;
  width: calc(40vw + 1px);
  height: auto !important;
  margin: auto 1rem auto;

  @media (min-width: 280px) and (max-width: 480px) {
    {
      margin: auto;
      width: calc(80vw + 1px);
    }
  }
`;

function Menu() {
  const { hasError, ...error } = useSelector((state) => state.error);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const nowPath = pathname;

  const menuItems = [
    "attributes",
    "tags",
    "compatibility",
    "color",
  ];

  const handleSearchBox = (url) => {
    dispatch(setUrl(url));

    (nowPath === pathname)
      ? window.location.replace(pathname)
      : history.push(pathname);
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
                  isActive={pathname.length > 2 ? (pathname === `/${menu}`) : ("attributes" === menu)}
                />
              </MenuNavLink>
            );
          })}
          {hasError && <Error {...error} /> }
        </MenuBarSt>
      </>
    )
  );
}

export default Menu;
