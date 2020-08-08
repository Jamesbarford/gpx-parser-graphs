import * as d3 from "d3";
import { height, margin, width } from "./margins";

export function drawGraph(htmlEl: HTMLElement): void {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height + margin.top + margin.bottom] as any);

    htmlEl.append(svg.node() || "");

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height + margin.bottom - margin.top + 10)
        .style("font-size", "7px")
        .text("Mile");


    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("transform", `translate(${margin.right - 15}, ${margin.top}) rotate(-90)`)
        .text("Speed");
}


