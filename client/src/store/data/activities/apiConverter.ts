import { parseISO } from "date-fns";

import { Activity, ActivityDetails } from "./types";
import { objectHasAllKeys } from "../../../lib/util";

export function toActivities(apiResponse: any): Array<Activity> {
    const activities: Array<Activity> = [];

    if(!Array.isArray(apiResponse)) return activities;

    for (const a of apiResponse) {
        try {
            const activity = toActivity(a);
            activities.push(activity);
        } catch (e) {
            console.warn(e);
        }
    }

    return activities;
}

export function toActivity(apiResponse: any): Activity {
    if (!objectHasAllKeys(apiResponse, ["activity_date", "activity_name", "activity_type"])) {
        throw new Error("Invalid activity");
    }

    return {
        date: parseISO(apiResponse.activity_date),
        name: apiResponse.activity_name,
        type: apiResponse.activity_type
    };
}

export function toActivityDetails(apiResponse: any): Array<ActivityDetails> {
    const activityDetailList: Array<ActivityDetails> = [];

    for (const apiDetail of apiResponse) {
        try {
            const activityDetails = getActivityDetails(apiDetail);
            activityDetailList.push(activityDetails);
        } catch (e) {
            console.warn(e);
        }
    }

    return activityDetailList;
}

function getActivityDetails(apiResponse: any): ActivityDetails {
    if (!objectHasAllKeys(apiResponse, ["timestamp", "lat", "lon"])) {
        throw new Error("Invalid details for activity");
    }

    return {
        timestamp: parseISO(apiResponse.timestamp),
        lat: +apiResponse.lat,
        lon: +apiResponse.lon,
        heartRate: +apiResponse.heart_rate,
        cadence: apiResponse.cadence
    };
}
