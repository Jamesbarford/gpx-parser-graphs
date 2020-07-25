import * as d3 from "d3";
import { get } from "lodash";
import { height, margin, width } from "./margins";

export function getX(data: any[]) {
    return d3.scaleBand()
        .domain(<any>d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
}

export function getY(data: any[], dataAccessor: string) {
    return d3.scaleLinear()
        .domain([0, d3.max(data, d => get(d, dataAccessor))]).nice()
        .range([height - margin.bottom, margin.top]);
}

export function drawXAxis(g: d3.Selection<any, any, any, any>, x: d3.AxisScale<d3.AxisDomain>, data: any[], dataProperty: string) {
    return g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => get(data, [<any>i, dataProperty])).tickSizeOuter(.2))
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "7px")
        .attr("dx", "-1em")
        .attr("dy", "-.1em")
        .attr("transform", "rotate(-60)");
}

export function drawYAxis(g: d3.Selection<any, any, any, any>, y: d3.AxisScale<d3.AxisDomain>) {
    return g
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "7px");
}
