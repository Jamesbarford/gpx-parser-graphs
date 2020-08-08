import * as React from "react";
import { isNil } from "lodash";
import ResizeObserver from "resize-observer-polyfill";
import * as d3 from "d3";

import { SpeedAndDistance } from "../../../../store/models/SpeedAndDistance";
import { margin } from "../../utilities/margins";
import { formatTimeInMinutes } from "../../../../lib/formatters/timeFormatters";

interface BarChartState {
    width: number;
    height: number;
}

interface BarChartProps {
    activityData: Array<SpeedAndDistance>;
}

export class BarChart extends React.PureComponent<BarChartProps, BarChartState> {
    private svgRef: React.RefObject<SVGSVGElement> = React.createRef();
    private svgWrapper: React.RefObject<HTMLDivElement> = React.createRef();
    public state: BarChartState = {
        width: 0,
        height: 400
    };

    public componentDidMount(): void {
        if (isNil(this.svgWrapper.current)) return;

        this.setState({ width: this.svgWrapper.current.clientWidth }, () => {
            this.renderRectangles(this.svgRef.current);
        });

        const observer = new ResizeObserver(entries => {
            this.setState({ width: entries[0].contentRect.width - 100 });
        });

        observer.observe(this.svgWrapper.current);
    }

    private renderRectangles(svg: SVGSVGElement | null): void {
        const x = d3
            .scaleBand()
            .range([0, this.state.width + margin.right])
            .domain(this.props.activityData.map((d, i) => `${i + 1} ${d.distanceFormat}`))
            .padding(0.2);

        const minValue = (d3.min(this.props.activityData, d => d.speed) || 0) - 1;

        const y = d3
            .scaleLinear()
            .domain([minValue, d3.max(this.props.activityData, d => d.speed) || 0])
            .nice()
            .range([this.state.height - margin.top, margin.bottom]);

        d3.select(svg)
            .append("g")
            .selectAll("rect")
            .data(this.props.activityData)
            .join("rect")
            .attr("fill", "#69b3a2")
            .attr("y", d => y(d.speed))
            .attr("x", (d, i) => x(`${i + 1} ${d.distanceFormat}`) || i + 1)
            .attr("height", d => y(minValue) - y(d.speed))
            .attr("transform", "translate(0, 5)")
            .attr("width", x.bandwidth());

        d3.select(svg)
            .append("g")
            .attr("transform", `translate(0, ${this.state.height - margin.top})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        d3.select(svg).append("g").call(d3.axisLeft(y).ticks(6).tickFormat(formatTimeInMinutes));
    }

    public render() {
        return (
            <div ref={this.svgWrapper}>
                <svg
                    viewBox={`0, 0 ${this.state.width}, ${
                        this.state.height + margin.top + margin.bottom
                    }`}
                    width={this.state.width}
                    height={300}
                    ref={this.svgRef}
                />
            </div>
        );
    }
}
