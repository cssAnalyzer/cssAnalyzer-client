import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import BubbleGraph from "../components/graph/BubbleGraph";
import GroupSelector from "../components/GroupSelector";

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

  const handleClick = ({ target }) => {
    setGroupView(target.value);
  }

  const data = [
    { name: "A", radius: 27, type: "div" },
    { name: "B", radius: 40, type: "div" },
    { name: "C", radius: 35, type: "p" },
    { name: "D", radius: 10, type: "div" },
    { name: "E", radius: 17, type: "p" },
    { name: "F", radius: 17, type: "div" },
  ];

  return (
    <>
      <Wrapper>
        <BubbleGraph
          data={data}
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
