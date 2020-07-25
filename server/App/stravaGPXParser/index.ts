import { Parser } from "xml2js";
import { isNil, round } from "lodash";

import { StravaRun, toStravaRun } from "./model/StravaRun";

import { formatTimeInMinutes } from "./lib/formatters/timeFormatters";
import {
    getAllSpeedsForRun,
    getAverageSpeeds
} from "./lib/aggregations/speedAggregations";
import { getTotalDistance } from "./lib/aggregations/distanceAggregations";
import { averageHeartRate, averageHeartRateWholeRun } from "./lib/aggregations/heartRateAggregations";
import { getTotalTimeInMinutes } from "./lib/aggregations/timeAggregations";
import { DistanceFormat } from "./lib/distanceCalulations/getDistanceFormat";
import { SpeedAndDistance } from "./model/SpeedAndDistance";

interface GPXasJSON {
    date: Date;
    runName: string
    mins: string;
    avgHeartRateWholeRun: number | undefined
    distanceMiles: number;
    distanceKm: number;
    avgSpeedMile: string; // mins per mile, formatted e.g 6:43
    avgSpeedKm: string; // mins per km, formatted e.g 4:12
    avgMileSpeedArr: Array<SpeedAndDistance>;
    avgKmSpeedArr: Array<SpeedAndDistance>; // e.g 3 km = length 3.
    avgHeartRateMiles: Array<number>;
    avgHeartRateKm: Array<number>;
    allSpeedsInKm: Array<SpeedAndDistance> // break down for the whole run between each GPS point. (huge)
}

export async function getGPXasJSON(xmlString: any): Promise<GPXasJSON | void> {
    const xmlParser = new Parser();

    let stravaRun: StravaRun;

    try {
        const xmlData = await xmlParser.parseStringPromise(xmlString);
        if (isNil(xmlData)) throw new Error("Invalid GPX file");

        stravaRun = toStravaRun(xmlData);
    } catch (e) {
        throw new Error(`Failed to parse file: ${e}`);
    }

    const stravaDatums = stravaRun.datum;
    const distanceKm = round(getTotalDistance(stravaDatums, DistanceFormat.KILOMETERS), 2);
    const distanceMiles = round(getTotalDistance(stravaDatums, DistanceFormat.MILES), 2);
    const exerciseTime = getTotalTimeInMinutes(stravaDatums);

    const gpxAsJson: GPXasJSON = {
        date: stravaRun.date,
        runName: stravaRun.runName,
        mins: formatTimeInMinutes(exerciseTime),
        avgHeartRateWholeRun: averageHeartRateWholeRun(stravaDatums),

        distanceMiles,
        distanceKm,

        avgSpeedMile: formatTimeInMinutes(exerciseTime / distanceMiles),
        avgSpeedKm: formatTimeInMinutes(exerciseTime / distanceKm),

        avgMileSpeedArr: getAverageSpeeds(stravaDatums, DistanceFormat.MILES),
        avgKmSpeedArr: getAverageSpeeds(stravaDatums, DistanceFormat.KILOMETERS),

        avgHeartRateMiles: averageHeartRate(stravaDatums, DistanceFormat.MILES),
        avgHeartRateKm: averageHeartRate(stravaDatums, DistanceFormat.KILOMETERS),

        allSpeedsInKm: getAllSpeedsForRun(stravaDatums, DistanceFormat.KILOMETERS)
    };

    return gpxAsJson;
}
