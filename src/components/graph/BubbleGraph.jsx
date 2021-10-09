import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import PropTypes from "prop-types";

const Canvas = styled.svg`
  margin: 0 auto 0 auto;
  position: relative;
  text-align: center;
  width: 80%;
  height: 70%;
  border: solid 3px black;
  z-index: -1;
`;

const width = 1000;
const height = 800;

function BubbleGraph({ inputData, option }) {
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);
  const circleColor = (option === "/Attributes") ? "orange" : "green";

  useEffect(() => {
    svg.selectAll("g").remove();
    const data = inputData;

    const scaleRadius = d3.scaleLinear()
      .domain([d3.min(data, d => d.radius), d3.max(data, d => d.radius)])
      .range([10, 100]);

    const circles = svg
      .append("g")
      .selectAll("g")
      .data(data, d => d.name)
      .enter()
      .append("circle")
      .attr("r", d => scaleRadius(d.radius))
      .attr("transform", "translate(" + [width / 2, height / 2] + ")")
      .attr("fill", circleColor)
      .attr("visibility", "visible")
      .attr("display", "block")
      .attr("stroke", circleColor)
      .style("opacity", 0.8);

    const tooltip = svg
      .append("g")
      .attr("id", "tooltipGroup")
      .append("rect")
      .attr("class", "tooltip")
      .attr("fill", "white")
      .attr("width", "100px")
      .attr("height", "50px")
      .attr("text-align", "center")
      .style("opacity", 0);

    circles.on("mouseover", (event, d) => {
      const [x, y] = d3.pointer(event);

      tooltip.style("opacity", 0.8)
        .attr("stroke", "orange")
        .style("visibility", "visible")
        .attr("transform", `translate(${x + width / 2}, ${y + height / 2})`);

      d3.select("#tooltipGroup")
        .append("text")
        .attr("id", "tooltipText")
        .attr("color", "black")
        .attr("transform", `translate(${(x + width / 2) + 20}, ${(y + height / 2) + 30})`)
        .html(`${d.name}<br>${d.radius}`);
    })
      .on("mouseout", () => {
        tooltip.style("opacity", 0)
          .style("visibility", "hidden");

        d3.select("#tooltipText").remove();
      });

    const tickNode = () => {
      circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    }

    const simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody()
        .strength(d => -(scaleRadius(d.radius) * 7 )))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .velocityDecay(0.1)
      .force("collide", d3.forceCollide(d => scaleRadius(d.radius) + 5));

    simulation.nodes(data).on("tick", tickNode);
  }, [inputData]);

  return (
    <>
      <Canvas ref={svgRef}></Canvas>
    </>
  );
}

BubbleGraph.propTypes = {
  inputData: PropTypes.array,
  option: PropTypes.string,
};

export default BubbleGraph;
