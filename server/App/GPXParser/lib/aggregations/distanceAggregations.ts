import { ActivityDataPoint } from "../../model/ActivityDataPoint";

import { getDistanceBetweenDatums } from "../distanceCalulations/getDistanceBetweenDatums";
import { DistanceFormat, getDistanceFormat } from "../distanceCalulations/getDistanceFormat";

export function getTotalDistance(datums: Array<ActivityDataPoint>, distanceFormat: DistanceFormat): number {
    return datums.reduce((totalDistance, datum, i) => {
        const nextDatum = datums[i + 1];
        if (nextDatum) totalDistance += getDistanceFormat(distanceFormat, getDistanceBetweenDatums(datum, nextDatum));
        return totalDistance;
    }, 0);
}
