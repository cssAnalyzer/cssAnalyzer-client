import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import getSearchResult from "../api/getSearchResult";
import BubbleGraph from "../components/graph/BubbleGraph";
import GroupSelector from "../components/GroupSelector";
import mockData from "../mockData";
import Loading from "../components/graph/Loading";

const Wrapper = styled.div`
  flex-direction: column;
  margin: calc(1% + 200px) 0 0 0;
  align-items: center;
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

function Tags() {
  const [groupView, setGroupView] = useState("all");
  const { pathname } = useLocation();
  const [searchResult, setSearchResult] = useState([mockData.filteredData]);
  const [isLoading, setIsLoading] = useState(false);
  const inputUrl = useSelector(state => state.data.inputUrl);

  const handleClick = ({ target }) => {
    setGroupView(target.value);
  }

  async function getResult(pathname, inputUrl) {
    setIsLoading(true);
    const result = await getSearchResult(pathname, inputUrl);

    if (!result) {
      setSearchResult(mockData.filteredData);

      return;
    }
    setSearchResult(result.filteredData);
  }

  useEffect(() => {
    getResult(pathname, inputUrl);
    setIsLoading(false);
  }, [])

  return (
    <>
      <Wrapper>
        {isLoading && <Loading />}
        <BubbleGraph
          inputData={searchResult}
          option={pathname}
        />
        <GroupSelector
          handleClick={handleClick}
        />
        <div>{inputUrl}</div>
      </Wrapper>
    </>
  );
}

export default Tags;
