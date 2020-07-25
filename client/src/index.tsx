import * as React from "react";
import * as d3 from "d3";
import { isNil } from "lodash";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { height, margin, width } from "./App/graphRendering/margins";
import { store } from "./store/store";
import { GpxUploadConnected } from "./App/components/GpxUploader";


const App: React.FC = () => (
    <Provider store={store}>
        <GpxUploadConnected/>
    </Provider>
);

const root = document.getElementById("root");

if (isNil(root)) throw new Error("no valid root for application");

render(<App/>, root);

function drawGraph(): void {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height + margin.top + margin.bottom] as any);

    root?.append(svg.node() || "");

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





