import { isNil, escape } from "lodash";

import { ActivityDataPoint } from "./ActivityDataPoint";
import { log } from "../../log";
import { parseAsDateOrThrow } from "../lib/parsers/parsers";

export class Activity {
    public constructor(
        public readonly date: Date,
        public readonly activityName: string,
        public readonly datum: Array<ActivityDataPoint>
    ) {}

    public static create(parsedXml: any, userId: string) {
        const datums = parsedXmlToActivityDataPoints(parsedXml, userId);

        return new Activity(
            getRunDate(parsedXml),
            getRunName(parsedXml),
            datums.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime())
        );
    }
}

function parsedXmlToActivityDataPoints(parsedXml: any, userId: string): Array<ActivityDataPoint> {
    const extensionKey = "gpxtpx:TrackPointExtension";
    const heartRateKey = "gpxtpx:hr";
    const cadenceKey = "gpxtpx:cad";
    const distanceKey = "$";

    const runningData = parsedXml?.gpx?.trk?.[0]?.trkseg?.[0]?.trkpt;

    if (isNil(runningData)) {
        throw new Error("No data for activity");
    }

    const date = getRunDate(parsedXml);

    return [].concat(runningData).reduce((stravaDatums: Array<ActivityDataPoint>, d: any) => {
        try {
            stravaDatums.push(
                ActivityDataPoint.create(
                    d?.[distanceKey]?.lat,
                    d?.[distanceKey]?.lon,
                    d?.time?.[0],
                    date,
                    date,
                    userId,
                    d?.extensions?.[0]?.[extensionKey]?.[0]?.[heartRateKey]?.[0],
                    d?.extensions?.[0]?.[extensionKey]?.[0]?.[cadenceKey]?.[0]
                )
            );
        } catch (error) {
            log(error);
            console.warn(`Invalid stravaDatum: ${JSON.stringify(d)}`);
        }

        return stravaDatums;
    }, []);
}

function getRunName(parsedXml: any): string {
    const maybeName = parsedXml?.gpx?.trk?.[0]?.name?.[0];
    return escape(maybeName || "No activity name");
}

function getRunDate(parsedXml: any): Date {
    const date = parsedXml?.gpx?.metadata?.[0]?.time?.[0];
    return parseAsDateOrThrow(date);
}
