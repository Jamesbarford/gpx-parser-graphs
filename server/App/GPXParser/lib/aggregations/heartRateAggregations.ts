import { isNil, mean, meanBy, round } from "lodash";

import { ActivityDataPoint } from "../../model/ActivityDataPoint";

import { getDistanceBetweenDatums } from "../distanceCalulations/getDistanceBetweenDatums";
import { DistanceFormat, getDistanceFormat } from "../distanceCalulations/getDistanceFormat";

export function averageHeartRate(
    datums: Array<ActivityDataPoint>,
    distanceFormat: DistanceFormat
) {
    const averageHeartRates: number[] = [];
    let hrAccumulator: number[] = [];
    let distanceAccumulator = 0;

    datums.forEach((datum, i) => {
        const nextDatum = datums[i + 1];
        if (nextDatum && !isNil(datum.hr)) {
            const distanceBetween = getDistanceBetweenDatums(datum, nextDatum);

            distanceAccumulator += getDistanceFormat(distanceFormat, distanceBetween);
            hrAccumulator.push(datum.hr);

            if (round(distanceAccumulator, 3) > 0.995) {
                averageHeartRates.push(round(mean(hrAccumulator)));
                distanceAccumulator = 0;
                hrAccumulator = [];
            }
        }
    });

    return averageHeartRates;
}

export function averageHeartRateWholeRun(stravaDatums: Array<ActivityDataPoint>): number {
    return round(meanBy(stravaDatums, "hr"));
}
