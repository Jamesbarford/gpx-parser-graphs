import { round } from "lodash";

export function formatTimeInMinutes(timeInMinutes: number) {
    const timeArr = String(timeInMinutes).split(".");
    const mins = +timeArr[0];

    const valueAsSeconds = +("0." + timeArr[1]) * 60;
    const seconds = round(valueAsSeconds);

    return `${mins}:${seconds}`;
}
