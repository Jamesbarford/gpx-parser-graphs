import { parseGPXString, Activity } from "gpx-parser-lite";
import { isNil } from "lodash";

import { ActivityWithData } from "./model/ActivityWithData";

export async function getActivity(xmlString: any, userId: string): Promise<ActivityWithData> {
    let activityWithData: ActivityWithData;

    try {
        const activity: Activity | undefined = await parseGPXString(xmlString);
        if (isNil(activity)) throw new Error("Invalid GPX file");

        activityWithData = ActivityWithData.create(activity, userId);
    } catch (e) {
        throw new Error(`Failed to parse file: ${e}`);
    }

    return activityWithData;
}