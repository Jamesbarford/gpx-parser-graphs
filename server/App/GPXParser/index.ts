import { Parser } from "xml2js";
import { isNil } from "lodash";

import { ActivityWithData } from "./model/ActivityWithData";

import { parseAsDateOrThrow } from "./lib/parsers/parsers";

// interface GPXasJSON {
//     date: Date; // "2020-07-06T11:53:35.000Z"
//     runName: string;
//     mins: string;
//     avgHeartRateWholeRun: number | undefined;
//     distanceMiles: number;
//     distanceKm: number;
//     avgSpeedMile: string; // mins per mile, formatted e.g 6:43
//     avgSpeedKm: string; // mins per km, formatted e.g 4:12
//     avgMileSpeedArr: Array<SpeedAndDistance>;
//     avgKmSpeedArr: Array<SpeedAndDistance>; // e.g 3 km = length 3.
//     avgHeartRateMiles: Array<number>;
//     avgHeartRateKm: Array<number>;
//     allSpeedsInKm: Array<SpeedAndDistance>; // break down for the whole run between each GPS point. (huge)
// }

export async function getActivity(xmlString: any, userId: string): Promise<ActivityWithData> {
    const xmlParser = new Parser();

    let activity: ActivityWithData;

    try {
        const parsedXml = await xmlParser.parseStringPromise(xmlString);
        if (isNil(parsedXml)) throw new Error("Invalid GPX file");

        activity = ActivityWithData.create(parsedXml, userId);
    } catch (e) {
        throw new Error(`Failed to parse file: ${e}`);
    }

    return activity;
}

// export async function getGPXasJSON(xmlString: any, userId: string): Promise<GPXasJSON | void> {
//     const xmlParser = new Parser();
//
//     let activity: ActivityWithData;
//
//     try {
//         const xmlData = await xmlParser.parseStringPromise(xmlString);
//         if (isNil(xmlData)) throw new Error("Invalid GPX file");
//
//         activity = ActivityWithData.create(xmlData, userId);
//     } catch (e) {
//         throw new Error(`Failed to parse file: ${e}`);
//     }
//
//     const activityData = activity.datum;
//     const distanceKm = round(getTotalDistance(activityData, DistanceFormat.KILOMETERS), 2);
//     const distanceMiles = round(getTotalDistance(activityData, DistanceFormat.MILES), 2);
//     const exerciseTime = getTotalTimeInMinutes(activityData);
//
//     const gpxAsJson: GPXasJSON = {
//         date: parseAsDateOrThrow(activity.date),
//         runName: activity.activityName,
//         mins: formatTimeInMinutes(exerciseTime),
//         avgHeartRateWholeRun: averageHeartRateWholeRun(activityData),
//
//         distanceMiles,
//         distanceKm,
//
//         avgSpeedMile: formatTimeInMinutes(exerciseTime / distanceMiles),
//         avgSpeedKm: formatTimeInMinutes(exerciseTime / distanceKm),
//
//         avgMileSpeedArr: getAverageSpeeds(activityData, DistanceFormat.MILES),
//         avgKmSpeedArr: getAverageSpeeds(activityData, DistanceFormat.KILOMETERS),
//
//         avgHeartRateMiles: averageHeartRate(activityData, DistanceFormat.MILES),
//         avgHeartRateKm: averageHeartRate(activityData, DistanceFormat.KILOMETERS),
//
//         allSpeedsInKm: getAllSpeedsForRun(activityData, DistanceFormat.KILOMETERS)
//     };
//
//     return gpxAsJson;
// }
