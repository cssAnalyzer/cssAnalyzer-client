import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import getSearchResult from "../api/search";
import BubbleGraphTag from "../components/graph/BubbleGraphTag";
import GroupSelector from "../components/GroupSelector";
import mockData from "../mockData";

const Wrapper = styled.div`
  flex-direction: column;
  margin: calc(1% + 200px) 0 0 0;
  align-items: center;
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

function Attributes() {
  const [groupView, setGroupView] = useState("all");
  const { pathname } = useLocation();
  const [searchResult, setSearchResult] = useState({});
  const inputUrl = useSelector(state => state.data.inputUrl);

  const handleClick = ({ target }) => {
    setGroupView(target.value);
  }

  useEffect(() => {
    const result = getSearchResult(pathname, inputUrl);
    result ? setSearchResult(result) : setSearchResult(mockData.filteredData);
  }, [])

  return (
    <>
      <Wrapper>
        <BubbleGraphTag
          data={searchResult}
          option={groupView}
        />
        <GroupSelector
          handleClick={handleClick}
        />
      </Wrapper>
    </>
  );
}

export default Attributes;
