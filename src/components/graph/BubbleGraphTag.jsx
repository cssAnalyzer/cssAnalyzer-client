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

function BubbleGraph({ data, option }) {
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);

  useEffect(() => {
    svg.selectAll("g").remove();

    const scaleRadius = d3.scaleLinear()
      .domain([d3.min(data, d => d.radius), d3.max(data, d => d.radius)])
      .range([30, 100]);

    const circles = svg
      .append("g")
      .selectAll("g")
      .data(data, d => d.name)
      .enter()
      .append("circle")
      .attr("r", d => scaleRadius(d.radius))
      .attr("transform", "translate(" + [1000 / 2, 800 / 2] + ")")
      .attr("fill", "orange")
      .attr("visibility", "visible")
      .attr("display", "block")
      .attr("stroke", "black")

    const tooltip = circles
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background-color", "purple")
      .style("border-radius", "6px")
      .style("text-align", "center")
      .style("width", "400px")
      .style("opacity", 0);

    circles.on("mouseover", (event, d) => {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9)
        .html(`total: ${d.radius}`)
        .style("left", event.pageX + "px")
        .style("top", (event.pageY - 30) + "px");
    }).on("mouseout", () => {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

    const tickNode = () => {
      circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    }

    const simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(-300))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force("collide", d3.forceCollide(d => scaleRadius(d.radius) + 5));

    simulation.nodes(data).on("tick", tickNode);
  }, [data]);

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
