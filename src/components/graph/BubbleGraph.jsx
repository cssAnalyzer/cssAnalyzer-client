import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import PropTypes from "prop-types";

const SvgWrapper = styled.g`
  position: relative;
  text-align: center;
  width: calc(100vw);
  height: calc(70vh);
`;

const Text = styled.text`
  position: relative;
  justify-content: center;
  top: 4rem;
  font-size: 50px;
`;

const Canvas = styled.svg`
  position: relative;
  width: calc(100vw);
  height: calc(75vh);
`;

const width = Number(window.innerWidth || document.body.clientWidth);
const height = Number(window.innerHeight || document.body.clientHeight);

function BubbleGraph({ data, title, option }) {
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);
  const circleColor = (option === "/attributes") ? "orange" : "green";

  useEffect(() => {
    svg.selectAll("g").remove();
    const scaleRadius = d3.scaleLinear()
      .domain([d3.min(data, d => d.radius), d3.max(data, d => d.radius)])
      .range([10, 100]);

    const node = svg
      .attr("viewBox", "0 0 400 600")
      .selectAll("g")
      .data(data, d => d.name)
      .enter()
      .append("g")
      .attr("id", d => d.name)
      .style("cursor", "pointer")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("transform", "translate(" + [width / 6, height / 2] + ")")

    const circle = node.append("circle")
      .attr("r", d => scaleRadius(d.radius))
      .attr("xlink:href", d => "https://developer.mozilla.org/ko/search?q=" + d.name)
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
      .attr("color", "black")
      .style("pointer-events", "none");

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
        .attr("transform", `translate(${x + width / 6}, ${y + height / 4})`);

      d3.select("#tooltipGroup")
        .append("text")
        .attr("id", "tooltipText")
        .attr("color", "black")
        .attr("transform", `translate(${(x + width / 6) + 20}, ${(y + height / 4) + 30})`)
        .html(`total: ${d.radius}`);
    })
      .on("mouseout", (event, d) => {
        tooltip.style("opacity", 0)
          .style("visibility", "hidden");

        d3.select("#tooltipText").remove();
      })
      .on("click", (event, d) => {
        const link = `https://developer.mozilla.org/ko/search?q=${d.name}`;
        window.location.href = link;
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
      .force("collide", d3.forceCollide(d => scaleRadius(d.radius) + 5));

    simulation.nodes(data).on("tick", tickNode);
  }, [data]);

  return (
    <SvgWrapper className="group">
      <Text>{title}</Text>
      <Canvas ref={svgRef} />
    </SvgWrapper>
  );
}

BubbleGraph.propTypes = {
  data: PropTypes.array,
  option: PropTypes.string,
  title: PropTypes.string,
};

export default BubbleGraph;
