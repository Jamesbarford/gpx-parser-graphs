import { isNil, mean, meanBy, round } from "lodash";

import { getDistanceBetweenDatums } from "../distanceCalulations/getDistanceBetweenDatums";
import { getDistanceFormat } from "../distanceCalulations/getDistanceFormat";
import { ActivityDetails } from "../../store/data/activities/types";
import { DistanceFormat } from "../../store/models/DistanceFormat";

export function averageHeartRate(
    datums: Array<ActivityDetails>,
    distanceFormat: DistanceFormat
): number[] {
    const averageHeartRates: number[] = [];
    let hrAccumulator: number[] = [];
    let distanceAccumulator = 0;

    datums.forEach((datum, i) => {
        const nextDatum = datums[i + 1];
        if (nextDatum && !isNil(datum.heartRate)) {
            const distanceBetween = getDistanceBetweenDatums(datum, nextDatum);

            distanceAccumulator += getDistanceFormat(distanceFormat, distanceBetween);
            hrAccumulator.push(datum.heartRate);

            if (round(distanceAccumulator, 3) > 0.995) {
                averageHeartRates.push(round(mean(hrAccumulator)));
                distanceAccumulator = 0;
                hrAccumulator = [];
            }
        }
    });

    return averageHeartRates;
}

export function averageHeartRateWholeRun(datums: Array<ActivityDetails>): number | undefined {
    const heartRate = round(meanBy(datums, "heartRate"));
    return isNaN(heartRate) ? undefined : heartRate;
}
