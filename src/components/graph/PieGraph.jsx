import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import PropTypes from "prop-types";

const SvgWrapper = styled.svg`
  position: relative;
  text-align: center;
  width: 100%;
  height: 90vh;
  border: solid pick 3px;
`;

const Text = styled.svg`
  position: relative;
  justify-content: center;
  top: 12em;
  font-size: 50px;
`;

const Canvas = styled.svg`
  position: relative;
  top: 5rem;
  width: 100%;
  height: 120%;
`;

const width = Number(window.innerWidth || document.body.clientWidth);
const height = Number(window.innerHeight || document.body.clientHeight);

function PieGraph({ data, title }) {
  const svgRef = useRef();
  const svg = d3.select(svgRef.current);

  const drag = () => {
    const dragstarted = (d, event) => {
      d3.select(this).raise().attr("stroke", "black");
    };

    const dragged = (d, event) => {
      d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
    };

    const dragended = (d, event) => {
      d3.select(this).attr("stroke", null);
    };

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  useEffect(() => {
    svg.selectAll("g").remove();

    const radius = height / 2;
    const format = d3.format(",d");
    const color = d3.scaleOrdinal(d3.quantize(
      d3.interpolateRainbow, data.children.length + 1));

    let root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    const partition = data => d3.partition()
      .size([2 * Math.PI, radius])(
        d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value));

    root = partition(data);
    root.each(d => d.current = d);

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1);

    svg.append("g")
      .attr("fill-opacity", 0.6)
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .selectAll("path")
      .data(root.descendants().filter(d => d.depth))
      .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.ancestors().map(d => d.data.name)
        .reverse().join("/")}\n${format(d.value)}`);

    svg.append("g")
      .call(drag)
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .selectAll("text")
      .data(root.descendants().filter(
        d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
      .join("text")
      .attr("transform", d => {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;

        return `rotate(${x - 90}) translate(${y}, 0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text(d => d.data.name);
  }, [data]);

  return (
    <SvgWrapper className="group">
      <Text>{title}</Text>
      <Canvas ref={svgRef} />
    </SvgWrapper>
  );
}

PieGraph.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
};

export default PieGraph;
