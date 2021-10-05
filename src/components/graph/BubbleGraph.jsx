import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import * as d3 from "d3";
import PropTypes from "prop-types";

const Canvas = styled.svg`
  margin: 0 auto 0 auto;
  position: relative;
  text-align: center;
  width: 80%;
  height: 70%;
`;

function BubbleGraph({ data, option }) {
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);

  useEffect(() => {
    svg.selectAll("circle").remove();

    const circles = svg
      .append("g")
      .selectAll("g")
      .data(data, d => d.name)
      .enter()
      .append("circle")
      .attr("r", ({ radius }) => radius * 4)
      .attr("fill", "orange")
      .attr("stroke", "black");

    const tickNode = () => {
      circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    }

    const simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(300))
      .force("collide", d3.forceCollide(d => d.radius * 4))
      .force("center", d3.forceCenter(300, 500));

    simulation.nodes(data).on("tick", tickNode);
  }, []);

  return (
    <>
      <Canvas ref={svgRef}></Canvas>
    </>
  );
}

BubbleGraph.propTypes = {
  data: PropTypes.array,
  option: PropTypes.string,
};

export default BubbleGraph;
