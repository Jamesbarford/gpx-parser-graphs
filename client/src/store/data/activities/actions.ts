import { RequestError } from "../../../lib/persistance";
import { Activity, ActivityDetails } from "./types";

export const enum ActivitiesActionTypes {
    FetchAllActivitiesStart = "Activities.FetchAllActivitiesStart",
    FetchAllActivitiesFailure = "Activities.FetchAllActivitiesFailure",
    FetchAllActivitiesSuccess = "Activities.FetchAllActivitiesSuccess",
    FetchActivitiesForMonthStart = "Activities.FetchActivitiesForMonthStart",
    FetchActivitiesForMonthFailure = "Activities.FetchActivitiesForMonthFailure",
    FetchActivitiesForMonthSuccess = "Activities.FetchActivitiesForMonthSuccess",
    FetchActivityDetailsStart = "Activities.FetchActivityDetailsStart",
    FetchActivityDetailsFailure = "Activities.FetchActivityDetailsFailure",
    FetchActivityDetailsSuccess = "Activities.FetchActivityDetailsSuccess"
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
        public readonly activityDetails: Array<ActivityDetails>
    ) {}
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
    | FetchActivityDetailsSuccess;
