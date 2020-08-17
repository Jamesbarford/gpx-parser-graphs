import { isNil } from "lodash";
import { Activity } from "gpx-parser-lite";

import { ActivityDataPoint } from "./ActivityDataPoint";
import { parseAsNumberOrThrow, parseAsDateOrThrow, parseAsDateToISOString } from "../lib/parsers/parsers";

export class ActivityWithData {
    public constructor(
        public readonly date: string,
        public readonly activityName: string,
        public readonly datum: Array<ActivityDataPoint>
    ) {}

    public static create(activity: Activity, userId: string) {
        return new ActivityWithData(activity.date, activity.name, toDataPoints(activity, userId));
    }
}

function toDataPoints(activity: Activity, userId: string): ActivityDataPoint[] {
    const activityDataPoints: ActivityDataPoint[] = [];
    const activityDate = parseAsDateToISOString(activity.date);

    for (const a of activity.activityDataPoints) {
        try {


            if (isNil(a.timestamp)) {
                throw new Error("Timestamp undefined for datapoint");
            }

            activityDataPoints.push(
                new ActivityDataPoint(
                    parseAsNumberOrThrow(a.latitude),
                    parseAsNumberOrThrow(a.longitude),
                    parseAsDateToISOString(a.timestamp),
                    activityDate,
                    userId,
                    isNil(a.heartRate) ? undefined :  parseAsNumberOrThrow(a.heartRate),
                    isNil(a.cadence) ? undefined : parseAsNumberOrThrow(a.cadence)
                )
            )
        } catch (e) {
            throw new Error(`Failed to parse data: ${e}`);
        }
    }

    return activityDataPoints;
}
