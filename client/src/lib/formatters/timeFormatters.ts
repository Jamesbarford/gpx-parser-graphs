import { round, isNil } from "lodash";

export function formatTimeInMinutes(timeInMinutes: number): string {
    const timeArr = String(timeInMinutes).split(".");
    const minutes = +timeArr[0];

    if (isNil(timeArr[1])) return `${minutes}:00`;

    const valueAsSeconds = +("0." + timeArr[1]) * 60;
    const seconds = `${round(valueAsSeconds)}`;

    return `${minutes}:` + (seconds.length === 1 ? `0${seconds}` : seconds);
}
