import { RequestError } from "../../../lib/persistance";
import { Activity, ActivityDetails } from "./types";
import { SpeedAndDistance } from "../../models/SpeedAndDistance";

export const enum ActivitiesActionTypes {
    FetchAllActivitiesStart = "Activities.FetchAllActivitiesStart",
    FetchAllActivitiesFailure = "Activities.FetchAllActivitiesFailure",
    FetchAllActivitiesSuccess = "Activities.FetchAllActivitiesSuccess",
    FetchActivitiesForMonthStart = "Activities.FetchActivitiesForMonthStart",
    FetchActivitiesForMonthFailure = "Activities.FetchActivitiesForMonthFailure",
    FetchActivitiesForMonthSuccess = "Activities.FetchActivitiesForMonthSuccess",
    FetchActivityDetailsStart = "Activities.FetchActivityDetailsStart",
    FetchActivityDetailsFailure = "Activities.FetchActivityDetailsFailure",
    FetchActivityDetailsSuccess = "Activities.FetchActivityDetailsSuccess",
    DeleteActivityStart = "Activities.DeleteActivityStart",
    DeleteActivityFailure = "Activities.DeleteActivityFailure",
    DeleteActivitySuccess = "Activities.DeleteActivitySuccess"
}

export class FetchAllActivitiesStart {
    public readonly type = ActivitiesActionTypes.FetchAllActivitiesStart;
}

export class FetchAllActivitiesFailure {
    public readonly type = ActivitiesActionTypes.FetchAllActivitiesFailure;
    public constructor(public readonly requestError: RequestError) {}
}

export class FetchAllActivitiesSuccess {
    public readonly type = ActivitiesActionTypes.FetchAllActivitiesSuccess;
    public constructor(public readonly activities: Array<Activity>) {}
}

export class FetchActivitiesForMonthStart {
    public readonly type = ActivitiesActionTypes.FetchActivitiesForMonthStart;
}

export class FetchActivitiesForMonthFailure {
    public readonly type = ActivitiesActionTypes.FetchActivitiesForMonthFailure;
    public constructor(public readonly requestError: RequestError) {}
}

export class FetchActivitiesForMonthSuccess {
    public readonly type = ActivitiesActionTypes.FetchActivitiesForMonthSuccess;
    public constructor(public readonly activities: Array<Activity>) {}
}

export class FetchActivityDetailsStart {
    public readonly type = ActivitiesActionTypes.FetchActivityDetailsStart;
    public constructor(public readonly isoDate: string) {}
}

export class FetchActivityDetailsFailure {
    public readonly type = ActivitiesActionTypes.FetchActivityDetailsFailure;
    public constructor(public readonly isoDate: string, public readonly requestError: RequestError) {}
}

export class FetchActivityDetailsSuccess {
    public readonly type = ActivitiesActionTypes.FetchActivityDetailsSuccess;
    public constructor(
        public readonly isoDate: string,
        public readonly activityDetails: Array<ActivityDetails>,
        public readonly speedsPerDistance: Array<SpeedAndDistance>,
        public readonly allSpeeds: Array<SpeedAndDistance>,
        public readonly totalDistance?: number,
        public readonly averageHeartRate?: number
    ) {}
}

export class DeleteActivityStart {
    public readonly type = ActivitiesActionTypes.DeleteActivityStart;
    public constructor(public readonly isoDate: string) {}
}

export class DeleteActivityFailure {
    public readonly type = ActivitiesActionTypes.DeleteActivityFailure;
    public constructor(
        public readonly isoDate: string,
        public readonly activity: Activity,
        public readonly requestError: RequestError
    ) {}
}

export class DeleteActivitySuccess {
    public readonly type = ActivitiesActionTypes.DeleteActivitySuccess;
    public constructor(public readonly isoDate: string) {}
}

export type ActivityActions =
    | FetchAllActivitiesStart
    | FetchAllActivitiesFailure
    | FetchAllActivitiesSuccess
    | FetchActivitiesForMonthStart
    | FetchActivitiesForMonthFailure
    | FetchActivitiesForMonthSuccess
    | FetchActivityDetailsStart
    | FetchActivityDetailsFailure
    | FetchActivityDetailsSuccess
    | DeleteActivityStart
    | DeleteActivityFailure
    | DeleteActivitySuccess;
