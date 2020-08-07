import { getDistanceBetweenDatums } from "../distanceCalulations/getDistanceBetweenDatums";
import { DistanceFormat, getDistanceFormat } from "../distanceCalulations/getDistanceFormat";
import { ActivityDetails } from "../../model/ActivityDetails";

export function getTotalDistance(datums: Array<ActivityDetails>, distanceFormat: DistanceFormat): number {
    return datums.reduce((totalDistance, datum, i) => {
        const nextDatum = datums[i + 1];
        if (nextDatum) totalDistance += getDistanceFormat(distanceFormat, getDistanceBetweenDatums(datum, nextDatum));
        return totalDistance;
    }, 0);
}
