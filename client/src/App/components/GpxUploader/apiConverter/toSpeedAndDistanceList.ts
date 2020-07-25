import { SpeedAndDistance } from "../../../../store/models/SpeedAndDistance";
import { objectHasAllKeys } from "../../../../lib/util";
import { DistanceFormat } from "../../../../store/models/DistanceFormat";


export function toSpeedAndDistanceList(apiResponse: any): Array<SpeedAndDistance> {
    const speedAndDistanceList: Array<SpeedAndDistance> = [];

    if (!("allSpeedsInKm" in apiResponse)) return speedAndDistanceList;

    for (const a of apiResponse.allSpeedsInKm) {
        try {
            const speedAndDistance = toSpeedAndDistance(a);
            speedAndDistanceList.push(speedAndDistance);
        } catch (e) {
            console.warn(e);
        }
    }

    return speedAndDistanceList;
}


function toSpeedAndDistance(apiSpeedAndDistance: any): SpeedAndDistance {
    if (!objectHasAllKeys(apiSpeedAndDistance, ["speed", "distance", "distanceFormat"])) {
        throw new Error(`Invalid object received: ${JSON.stringify(apiSpeedAndDistance)}`);
    }

    return new SpeedAndDistance(
        apiSpeedAndDistance.speed,
        apiSpeedAndDistance.distance,
        getDistanceFormat(apiSpeedAndDistance.distanceFormat)
    );
}

function getDistanceFormat(apiDistanceFormat: any): DistanceFormat {
    switch (apiDistanceFormat) {
        case "miles":
            return DistanceFormat.MILES;

        case "km":
            return DistanceFormat.KILOMETERS;

        default:
            console.warn(`${apiDistanceFormat} is an unsupported format defaulting to ${DistanceFormat.KILOMETERS}`);
            return DistanceFormat.KILOMETERS;
    }
}
