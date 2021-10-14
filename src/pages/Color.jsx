import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import getSearchResult from "../api/getSearchResult";
import Loading from "../components/graph/Loading";
import mockColorData from "../mockData/mockColorData";
import ColorChip from "../components/ColorChip";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const ColorChipBoard = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 75%;
  margin-top: -10%;
`;

const PaletteSt = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 30%;
  border: solid 5px purple;
  margin-top: 55%;
`;

const DeleteZone = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 30%;
  margin-top: 90%;
  z-index: 1;
  background-color: crimson;
  opacity: 0;

  &:hover {
    opacity: 1;
    border: solid 2px red;
  }
`;

function Color() {
  const [userPalette, setUserPalette] = useState([]);
  const { pathname } = useLocation();
  const [searchResult, setSearchResult] = useState(mockColorData);
  const [isLoading, setIsLoading] = useState(true);
  const inputUrl = useSelector(state => state.data.inputUrl);
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

  async function getResult(pathname, inputUrl) {
    setIsLoading(true);
    const result = await getSearchResult(pathname, inputUrl);

    if (!result) {
      setSearchResult(mockColorData);
      setIsLoading(false);

      return;
    }
    setSearchResult(result);
    setIsLoading(false);
  }

  useEffect(() => {
    getResult(pathname, inputUrl);
  }, [])

  return (
    <>
      <Wrapper>
        {isLoading && <Loading />}
        <ColorChipBoard>
          {searchResult.filteredData.map((colorCode => {
            return (
              <ColorChip
                data={colorCode}
                id={colorCode}
                key={colorCode}
                isDropped={false}
              />
            );
          }))}
        </ColorChipBoard>
        <PaletteSt ref={drop}>
          {userPalette.map((colorCode) => {
            return (
              <ColorChip
                data={colorCode}
                key={"k" + colorCode}
                isDropped={true}
              />
            );
          })}
        </PaletteSt>
        {(userPalette.length > 0) && <DeleteZone ref={dropDelete} />}
      </Wrapper>
    </>
  );
}

export default Color;
