import { isNil } from "lodash";

import { parseAsDateOrThrow, parseAsNumberOrThrow } from "../lib/parsers/parsers";
import { ActivityDetails } from "./ActivityDetails";

export class ActivityDataPoint implements ActivityDetails {
    private constructor(
        public readonly lat: number,
        public readonly lon: number,
        public readonly timestamp: string,
        public readonly activity_date: string,
        public readonly user_id: string,
        public readonly hr?: number,
        public readonly cad?: number
    ) {}

    public static create(
        lat: any,
        lon: any,
        timestamp: any,
        activity_date: any,
        user_id: any,
        hr?: any,
        cad?: any
    ): ActivityDataPoint {
        if ([lat, lon, timestamp, activity_date, user_id].some(isNil)) {
            throw new Error("Invalid strava data point");
        }

        return new ActivityDataPoint(
            parseAsNumberOrThrow(lat),
            parseAsNumberOrThrow(lon),
            parseAsDateOrThrow(timestamp).toISOString(),
            activity_date,
            String(user_id),
            isNil(hr) ? undefined : parseAsNumberOrThrow(hr),
            isNil(cad) ? undefined : parseAsNumberOrThrow(cad)
        );
    }
}
