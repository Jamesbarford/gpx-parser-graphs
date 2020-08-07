import { isNil, mean, meanBy, round } from "lodash";

import { ActivityDataPoint } from "../../model/ActivityDataPoint";

import { getDistanceBetweenDatums } from "../distanceCalulations/getDistanceBetweenDatums";
import { DistanceFormat, getDistanceFormat } from "../distanceCalulations/getDistanceFormat";
import { ActivityDetails } from "./types";

export function averageHeartRate(
    datums: Array<ActivityDetails>,
    distanceFormat: DistanceFormat
): number[] {
    const averageHeartRates: number[] = [];
    let hrAccumulator: number[] = [];
    let distanceAccumulator = 0;

    datums.forEach((datum, i) => {
        const nextDatum = datums[i + 1];
        if (nextDatum && !isNil(datum.heart_rate)) {
            const distanceBetween = getDistanceBetweenDatums(datum, nextDatum);

            distanceAccumulator += getDistanceFormat(distanceFormat, distanceBetween);
            hrAccumulator.push(datum.heart_rate);

            if (round(distanceAccumulator, 3) > 0.995) {
                averageHeartRates.push(round(mean(hrAccumulator)));
                distanceAccumulator = 0;
                hrAccumulator = [];
            }
        }
    });

    return averageHeartRates;
}

export function averageHeartRateWholeRun(datums: Array<ActivityDetails>): number {
    return round(meanBy(datums, "heart_rate"));
}
