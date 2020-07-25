import { isNil } from "lodash";

import { parseAsDateOrThrow, parseAsNumberOrThrow } from "../lib/parsers/parsers";

export class StravaDataPoint {
    private constructor(
        public readonly lat: number,
        public readonly lon: number,
        public readonly timeStamp: Date,
        public readonly hr?: number,
        public readonly cad?: number
    ) {}

    public static create(lat: any, lon: any, timeStamp: any, hr?: any, cad?: any): StravaDataPoint {
        if ([lat, lon, timeStamp].some(isNil)) {
            throw new Error("Invalid strava data point");
        }

        return new StravaDataPoint(
            parseAsNumberOrThrow(lat),
            parseAsNumberOrThrow(lon),
            parseAsDateOrThrow(timeStamp),
            isNil(hr) ? undefined : parseAsNumberOrThrow(hr),
            isNil(cad) ? undefined : parseAsNumberOrThrow(cad)
        );
    }
}
