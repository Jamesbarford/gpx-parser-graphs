import { AppState, DispatchThunk } from "../../store";
import { getUserId } from "../../auth/selectors";
import {
    FetchActivitiesForMonthFailure,
    FetchActivitiesForMonthStart,
    FetchActivitiesForMonthSuccess,
    FetchActivityDetailsFailure,
    FetchActivityDetailsStart,
    FetchActivityDetailsSuccess,
    FetchAllActivitiesFailure,
    FetchAllActivitiesStart,
    FetchAllActivitiesSuccess
} from "./actions";
import {
    getActivitiesForMonthReq,
    getActivityDetailsReq,
    getAllActivitiesReq
} from "../../../apiRequests/activities";
import { RequestError } from "../../../lib/persistance";
import { Activity, ActivityDetails } from "./types";
import { toActivities, toActivityDetails } from "./apiConverter";

export function getAllActivitiesThunk() {
    return async function (dispatch: DispatchThunk, getState: () => AppState) {
        const state = getState();
        const userId = getUserId(state);

        dispatch(new FetchAllActivitiesStart());
        let activities: Array<Activity>;
        try {
            const response = await getAllActivitiesReq(userId);
            activities = toActivities(response.data);
        } catch (e) {
            dispatch(new FetchAllActivitiesFailure(RequestError.create(e)));
            return;
        }

        dispatch(new FetchAllActivitiesSuccess(activities));
    };
}

export function getActivitiesForMonthThunk(month: number, year: number) {
    return async function (dispatch: DispatchThunk, getState: () => AppState) {
        const state = getState();
        const userId = getUserId(state);

        dispatch(new FetchActivitiesForMonthStart());
        let activities: Array<Activity>;
        try {
            const response = await getActivitiesForMonthReq(userId, month, year);
            activities = toActivities(response.data);
        } catch (e) {
            dispatch(new FetchActivitiesForMonthFailure(RequestError.create(e)));
            return;
        }

        dispatch(new FetchActivitiesForMonthSuccess(activities));
    };
}

export function getActivityDetailsThunk(isoDate: string) {
    return async function (dispatch: DispatchThunk, getState: () => AppState) {
        const state = getState();
        const userId = getUserId(state);

        dispatch(new FetchActivityDetailsStart(isoDate));
        let activityDetails: Array<ActivityDetails>;
        try {
            const response = await getActivityDetailsReq(userId, isoDate);
            console.log(response)
            activityDetails = toActivityDetails(response.data);
        } catch (e) {
            dispatch(new FetchActivityDetailsFailure(isoDate, RequestError.create(e)));
            return;
        }

        dispatch(new FetchActivityDetailsSuccess(isoDate, activityDetails));
    };
}
