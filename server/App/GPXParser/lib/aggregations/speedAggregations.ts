import { round } from "lodash";

import { ActivityDataPoint } from "../../model/ActivityDataPoint";
import { SpeedAndDistance } from "../../model/SpeedAndDistance";

import { getDistanceBetweenDatums } from "../distanceCalulations/getDistanceBetweenDatums";
import { DistanceFormat, getDistanceFormat } from "../distanceCalulations/getDistanceFormat";
import { getTotalTimeInMinutes } from "./timeAggregations";

// this may not work
export function getAverageSpeeds(
    datums: Array<ActivityDataPoint>,
    distanceFormat: DistanceFormat
): Array<SpeedAndDistance> {
    let distanceAccumulator = 0;
    let timeAccumulator = 0;

    return datums.reduce((arr: Array<SpeedAndDistance>, datum, i) => {
        const nextDatum = datums[i + 1];
        if (nextDatum) {
            const distanceBetween = getDistanceBetweenDatums(datum, nextDatum);

            distanceAccumulator += getDistanceFormat(distanceFormat, distanceBetween);
            timeAccumulator += getTotalTimeInMinutes([datum, nextDatum]);

            if (round(distanceAccumulator, 3) > 0.995) {
                const minsPerDistance = timeAccumulator;
                arr.push(new SpeedAndDistance(minsPerDistance, distanceAccumulator, distanceFormat));
                distanceAccumulator = 0;
                timeAccumulator = 0;
            }
        }
        return arr;
    }, []);
}

export function getAllSpeedsForRun(
    datums: Array<ActivityDataPoint>,
    distanceFormat: DistanceFormat
): Array<SpeedAndDistance> {
    let distanceAcc = 0;
    return datums.reduce((acc: Array<SpeedAndDistance>, datum, i) => {
        const nextDatum = datums[i + 1];

        if (nextDatum) {
            const distanceBetween = getDistanceBetweenDatums(datum, nextDatum);
            const distance = getDistanceFormat(distanceFormat, distanceBetween);
            const time = getTotalTimeInMinutes([datum, nextDatum]);

            acc.push(new SpeedAndDistance(time / distance, distanceAcc += distance, DistanceFormat.KILOMETERS));
        }
        return acc;
    }, []);
}
