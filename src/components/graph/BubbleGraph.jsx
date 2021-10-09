import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import PropTypes from "prop-types";

const Canvas = styled.svg`
  margin: 0 auto 0 auto;
  position: relative;
  text-align: center;
  width: 100%;
  height: 60%;
  border: solid 3px black;
  z-index: -1;
`;

const width = Number(window.innerWidth || document.body.clientWidth);
const height = Number(window.innerHeight || document.body.clientHeight);

function BubbleGraph({ inputData, option }) {
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);
  const circleColor = (option === "/attributes") ? "orange" : "green";

  useEffect(() => {
    svg.selectAll("g").remove();
    const data = inputData;

    const scaleRadius = d3.scaleLinear()
      .domain([d3.min(data, d => d.radius), d3.max(data, d => d.radius)])
      .range([10, 100]);

    const node = svg
      .selectAll("g")
      .data(data, d => d.name)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => "translate(" + [width / 2, height / 3.5] + ")")

    const circle = node.append("circle")
      .attr("r", d => scaleRadius(d.radius))
      .attr("fill", circleColor)
      .attr("visibility", "visible")
      .attr("display", "block")
      .attr("stroke", circleColor)
      .style("opacity", 0.8);

    const names = node.append("text")
      .html(d => d.name)
      .attr("text-anchor", "middle")
      .attr("font-size", d => `${scaleRadius(d.radius)}px`)
      .attr("visibility", "visible")
      .attr("color", "black");

    const tooltip = svg
      .append("g")
      .attr("id", "tooltipGroup")
      .append("rect")
      .attr("class", "tooltip")
      .attr("fill", "white")
      .attr("text-align", "center")
      .style("opacity", 0);

    node.on("mouseover", (event, d) => {
      const [x, y] = d3.pointer(event);

      tooltip.style("opacity", 0.8)
        .attr("stroke", "orange")
        .attr("width", "100px")
        .attr("height", "50px")
        .style("visibility", "visible")
        .attr("transform", `translate(${x + width / 2}, ${y + height / 3.5})`);

      d3.select("#tooltipGroup")
        .append("text")
        .attr("id", "tooltipText")
        .attr("color", "black")
        .attr("transform", `translate(${(x + width / 2) + 20}, ${(y + height / 3.5) + 30})`)
        .html(`total: ${d.radius}`);
    })
      .on("mouseout", () => {
        tooltip.style("opacity", 0)
          .style("visibility", "hidden");

        d3.select("#tooltipText").remove();
      });

    const tickNode = () => {
      circle
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
      names
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    }

    const simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody()
        .strength(d => - (scaleRadius(d.radius) * 7 )))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .velocityDecay(0.1)
      .force("collide", d3.forceCollide(d => scaleRadius(d.radius) + 7));

    simulation.nodes(data).on("tick", tickNode);
  }, [inputData]);

  return (
    <Canvas ref={svgRef} />
  );
}

BubbleGraph.propTypes = {
  inputData: PropTypes.array,
  option: PropTypes.string,
};

export default BubbleGraph;
