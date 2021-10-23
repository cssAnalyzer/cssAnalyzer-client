import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import randomizeData from "../../helper/randomizeData";
import propTypes from "prop-types";

const Wrapper = styled.svg`
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-items: center;
  align-items: center;
`;

const Canvas = styled.svg`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-items: center;
  align-items: center;
`;

const Text = styled.text`
  display: flex;
  position: fixed;
  font-size: ${({ theme }) => theme.fontSizes.xLarge};
  color: ${({ theme }) => theme.colors.PURPLE};
  font-family: Megrim;
  text-anchor: middle;
  top: 50%;
  left: 35%;
`;

function Loading() {
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);

  const nodes = randomizeData;
  const width = 1000;
  const height = 800;

  const restart = (nodes) => {
    d3.selectAll("#group").remove();

    const node = svg
      .append("g")
      .selectAll("g")
      .append("id", "group")
      .data(nodes, d => d.name)
      .enter()
      .append("circle")
      .attr("fill", "purple")
      .attr("r", d => d.size * 50)
      .attr("transform", "translate(" + [width / 2, height / 2] + ")")

    node
      .attr("stroke", "white")
      .transition()
      .duration(600)
      .style("fill", "pink")
      .transition()
      .duration(400)
      .style("fill", "purple")
      .attr("r", 0)
      .transition()
      .duration(600)
      .remove();

    const ticked = () => {
      node
        .attr("cx", d => d.size * 150)
        .attr("cy", d => d.size * 150);
    }

    const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-600))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force("collide", d3.forceCollide(d => (d.size * 50)));

    simulation.nodes(nodes).on("tick", ticked);
  }

  useEffect(() => {
    d3.interval(() => {
      restart(nodes);
    }, 1500);
  }, []);

  return (
    <Wrapper>
      <Text>Loading...</Text>
      <Canvas ref={svgRef} />
    </Wrapper>
  );
}

export default Loading;
