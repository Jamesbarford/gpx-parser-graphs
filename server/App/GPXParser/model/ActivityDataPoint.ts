import { isNil } from "lodash";

import { parseAsDateOrThrow, parseAsNumberOrThrow } from "../lib/parsers/parsers";

export class ActivityDataPoint {
    private constructor(
        public readonly lat: number,
        public readonly lon: number,
        public readonly timeStamp: Date,
        public readonly activity_date: Date,
        public readonly activity_id: string,
        public readonly user_id: string,
        public readonly hr?: number,
        public readonly cad?: number
    ) {}

    public static create(
        lat: any,
        lon: any,
        timeStamp: any,
        activity_date: any,
        activity_id: any,
        user_id: any,
        hr?: any,
        cad?: any
    ): ActivityDataPoint {
        if ([lat, lon, timeStamp, activity_date, activity_id, user_id].some(isNil)) {
            throw new Error("Invalid strava data point");
        }

        return new ActivityDataPoint(
            parseAsNumberOrThrow(lat),
            parseAsNumberOrThrow(lon),
            parseAsDateOrThrow(timeStamp),
            activity_date,
            String(activity_id),
            String(user_id),
            isNil(hr) ? undefined : parseAsNumberOrThrow(hr),
            isNil(cad) ? undefined : parseAsNumberOrThrow(cad)
        );
    }
}
