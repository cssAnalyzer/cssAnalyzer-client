import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import getSearchResult from "../api/getSearchResult";
import PieGraph from "../components/graph/PieGraph";
import mockPieData from "../mockPieData";
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

function Compatibility() {
  const { pathname } = useLocation();
  const [searchResult, setSearchResult] = useState(mockPieData);
  const [isLoading, setIsLoading] = useState(false);
  const inputUrl = useSelector(state => state.data.inputUrl);

  async function getResult(pathname, inputUrl) {
    setIsLoading(true);
    const result = await getSearchResult(pathname, inputUrl);

    if (!result) {
      setSearchResult(mockPieData);
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
        {isLoading && <Loading />}
        <PieGraph
          data={searchResult}
          title={inputUrl}
        />
      </Wrapper>
    </>
  );
}

export default Compatibility;