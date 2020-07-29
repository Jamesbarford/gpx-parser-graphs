export const enum DistanceFormat {
    MILES = "miles",
    KILOMETERS = "km"
}

export function getDistanceFormat(distanceFormat: DistanceFormat, distance: number): number {
    switch (distanceFormat) {
        case DistanceFormat.KILOMETERS:
            return distance;

        case DistanceFormat.MILES:
            return toMiles(distance);

        default:
            console.warn(`${distanceFormat} not implemented`);
            return distance;
    }
}

function toMiles(km: number): number {
    return km / 1.609;
}

