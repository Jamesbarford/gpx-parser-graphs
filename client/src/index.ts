import * as d3 from "d3";
import * as _ from "lodash";

import { height, margin, width } from "./graphRendering/margins";
import { uploadGPXFile } from "./apiRequests/upload";

const root = document.getElementById("root");

if (_.isNil(root)) throw new Error("no valid root for application");

const form = document.createElement("form");
const input = document.createElement("input");
const button = document.createElement("button");

button.innerText = "submit";
button.setAttribute("type", "submit");
input.setAttribute("type", "file");
input.setAttribute("name", "gpx-upload");

form.onsubmit = e => {
    const file = _.get(form.elements, "gpx-upload.files.[0]");

    try {
        uploadGPXFile(file);
    } catch (e) {
        console.warn(e);
    }

    e.preventDefault();
};

form.append(input);
form.append(button);


root.append(form);

function drawGraph() {
    const svg = d3.create("svg")
        .attr("viewBox", <any>[0, 0, width, height + margin.top + margin.bottom]);

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





