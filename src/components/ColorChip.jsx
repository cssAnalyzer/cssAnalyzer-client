import React from "react";
import { useDrag } from "react-dnd"
import styled from "styled-components";
import PropTypes from "prop-types";

const Chip = styled.div`
  position: relative;
  display: flex;
  width: 100px;
  margin-top: 0.5%;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
    border: solid 2px red;
  }
`;

const DroppedColorChip = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 70%;
`;

function ColorChip({ data, id, isDropped }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: isDropped ? "droppedColor" : "color",
    item: { id: data },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleChipClick = ({ target }) => {
    navigator.clipboard.writeText(
      JSON.stringify(target.style.backgroundColor));
  };

  return (
    <>
      { isDropped
        ? <DroppedColorChip
          ref={drag}
          style={{
            backgroundColor: `${data}`,
            border: isDragging && "3px solid red",
          }}
          onClick={handleChipClick}
        />
        : <Chip
          ref={drag}
          style={{
            backgroundColor: `${data}`,
            border: isDragging && "3px solid red",
          }}
          id={id}
          onClick={handleChipClick}
        />
      }
    </>
  );
}

ColorChip.propTypes = {
  data: PropTypes.string,
  id: PropTypes.string,
  isDropped: PropTypes.bool,
};

export default ColorChip;
