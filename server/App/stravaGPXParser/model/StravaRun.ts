import { StravaDataPoint } from "./StravaDataPoint";
import { log } from "../../log";
import { parseAsDateOrThrow } from "../lib/parsers/parsers";

export function toStravaRun(parsedXml: any): StravaRun {
    const extensionKey = "gpxtpx:TrackPointExtension";
    const heartRateKey = "gpxtpx:hr";
    const cadenceKey = "gpxtpx:cad";
    const distanceKey = "$";

    const runningData = parsedXml?.gpx?.trk?.[0]?.trkseg?.[0]?.trkpt;
    const date = parsedXml?.gpx?.metadata?.[0]?.time?.[0];

    const datums = [].concat(runningData).reduce((stravaDatums: Array<StravaDataPoint>, d: any) => {
        try {
            const stravaDataPoint = StravaDataPoint.create(
                d?.[distanceKey]?.lat,
                d?.[distanceKey]?.lon,
                d?.time?.[0],
                d?.extensions?.[0]?.[extensionKey]?.[0]?.[heartRateKey]?.[0],
                d?.extensions?.[0]?.[extensionKey]?.[0]?.[cadenceKey]?.[0]
            );

            stravaDatums.push(stravaDataPoint);
        } catch (error) {
            log(error);
            console.warn(`Invalid stravaDatum: ${JSON.stringify(d)}`);
        }

        return stravaDatums;
    }, []);

    return new StravaRun(
        parseAsDateOrThrow(date),
        getRunName(parsedXml),
        datums.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime())
    );
}

export class StravaRun {
    public constructor(public readonly date: Date, public readonly runName: string, public readonly datum: StravaDataPoint[]) {
    }
}

function getRunName(parsedXml: any): string {
    const maybeName = parsedXml?.gpx?.trk?.[0]?.name?.[0];
    return maybeName || "No activity name";
}
