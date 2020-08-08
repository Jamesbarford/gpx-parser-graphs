import { getDistanceBetweenDatums } from "../distanceCalulations/getDistanceBetweenDatums";
import { getDistanceFormat } from "../distanceCalulations/getDistanceFormat";
import { ActivityDetails } from "../../store/data/activities/types";
import { DistanceFormat } from "../../store/models/DistanceFormat";


export function getTotalDistance(datums: Array<ActivityDetails>, distanceFormat: DistanceFormat): number {
    return datums.reduce((totalDistance, datum, i) => {
        const nextDatum = datums[i + 1];
        if (nextDatum) totalDistance += getDistanceFormat(distanceFormat, getDistanceBetweenDatums(datum, nextDatum));
        return totalDistance;
    }, 0);
}
