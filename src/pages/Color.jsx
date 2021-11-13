import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import getSearchResult from "../api/getSearchResult";
import Loading from "../components/graph/Loading";
import mockColorData from "../mockData/mockColorData";
import ColorChip from "../components/ColorChip";
import ExplainModal from "../components/ExplainModal";
import EXPLANATION from "../constants/Explanation";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  margin-top: calc(27vh);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media (min-width: 481px) and (max-width: 767px) {
    {
      margin-top: calc(27vh);
    }
  }

  @media (max-width: 480px) {
    {
      margin-top: calc(26vh);
    }
  }
`;

const ColorChipBoard = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const PaletteSt = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const DeleteZone = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 5%;
  z-index: 1;
  background-color: crimson;
  opacity: 1;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
    border: solid 2px red;
  }

  @media (max-width: 480px) {
    {
      font-size: 1rem
    }
  }
`;

function Color() {
  const [userPalette, setUserPalette] = useState([]);
  const { pathname } = useLocation();
  const [searchResult, setSearchResult] = useState(mockColorData.filteredData);
  const [isLoading, setIsLoading] = useState(true);
  const inputurl = useSelector(state => state.data.inputurl);
  const [, drop] = useDrop(() => ({
    accept: "color",
    drop: (item) => handleDropColor(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [, dropDelete] = useDrop(() => ({
    accept: "droppedColor",
    drop: (item) => handleDeleteColor(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDeleteColor = (id) => {
    const UpdatedPalette = userPalette.filter(color => color !== id);
    setUserPalette([...UpdatedPalette]);
  };

  const handleDropColor = (id) => {
    setUserPalette((userPalette) => [...userPalette, id]);
  };

  async function getResult(pathname, inputurl) {
    setIsLoading(true);
    const result = await getSearchResult(pathname, inputurl);

    if (!result) {
      setSearchResult(mockColorData.filteredData);
      setIsLoading(false);

      return;
    }
    setSearchResult(result.filteredData);
    setIsLoading(false);
  }

  useEffect(() => {
    getResult(pathname, inputurl);
  }, [pathname]);

  return (
    <>
      {isLoading && <Loading />}
      <Wrapper>
        <ColorChipBoard>
          {searchResult.map(colorCode => {
            return (
              <ColorChip
                data={colorCode}
                id={colorCode}
                key={colorCode}
                isDropped={false}
              />
            );
          })}
        </ColorChipBoard>
        <PaletteSt ref={drop}>
          {userPalette.map(colorCode => {
            return (
              <ColorChip
                data={colorCode}
                key={"k" + colorCode}
                isDropped={true}
              />
            );
          })}
        </PaletteSt>
        { (userPalette.length > 0)
          && <DeleteZone
            ref={dropDelete}
          >
            Drop below color chips for delete them all :)
          </DeleteZone> }
      </Wrapper>
      <ExplainModal
        text={EXPLANATION.COLOR}
      />
    </>
  );
}

export default Color;
