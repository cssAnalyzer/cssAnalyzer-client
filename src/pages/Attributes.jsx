import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import getSearchResult from "../api/getSearchResult";
import BubbleGraph from "../components/graph/BubbleGraph";
import mockData from "../mockData/mockData";
import Loading from "../components/graph/Loading";
import ExplainModal from "../components/ExplainModal";
import EXPLANATION from "../constants/Explanation";

const Wrapper = styled.div`
  flex-direction: column;
  margin-top: calc(25vh);
  align-items: center;
  display: flex;
  position: fixed;
  height: calc(100vh);
`;

function Attributes() {
  const { pathname } = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputUrl = useSelector(state => state.data.inputUrl);

  async function getResult(pathname, inputUrl) {
    setIsLoading(true);
    const result = await getSearchResult(pathname, inputUrl);

    if (!result) {
      setSearchResult(mockData.filteredData);
      setIsLoading(false);

      return;
    }
    setSearchResult(result.filteredData);
    setIsLoading(false);
  }

  useEffect(() => {
    getResult(pathname, inputUrl);
  }, [])

  return (
    <>
      <Wrapper>
        {isLoading && <Loading status={isLoading}/>}
        <BubbleGraph
          data={searchResult}
          option={pathname}
        />
      </Wrapper>
      <ExplainModal
        text={EXPLANATION.BUBBLE_GRAPH}
      />
    </>
  );
}

export default Attributes;
