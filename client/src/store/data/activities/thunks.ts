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
import { getAllSpeedsForRun, getAverageSpeeds } from "../../../lib/aggregations/speedAggregations";
import { averageHeartRateWholeRun } from "../../../lib/aggregations/heartRateAggregations";
import { getTotalDistance } from "../../../lib/aggregations/distanceAggregations";
import { SpeedAndDistance } from "../../models/SpeedAndDistance";

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
            dispatch(new FetchAllActivitiesFailure(RequestError.create(e.message)));
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

        if(!(isoDate in state.activities.byId)) {
            // FIXME: need functionality to get 1 activity
            await dispatch(getAllActivitiesThunk())
        }

        dispatch(new FetchActivityDetailsStart(isoDate));
        let activityDetails: Array<ActivityDetails>;
        let speedsPerDistance: Array<SpeedAndDistance>;
        let allSpeeds: Array<SpeedAndDistance>;
        let totalDistance: number;
        let averageHeartRate: number | undefined;

        try {
            const response = await getActivityDetailsReq(userId, isoDate);
            activityDetails = toActivityDetails(response.data);

            const distanceFormat = state.activities.distanceFormat;

            speedsPerDistance = getAverageSpeeds(activityDetails, distanceFormat);
            allSpeeds = getAllSpeedsForRun(activityDetails, distanceFormat);
            totalDistance = getTotalDistance(activityDetails, distanceFormat);
            averageHeartRate = averageHeartRateWholeRun(activityDetails);
        } catch (e) {
            dispatch(new FetchActivityDetailsFailure(isoDate, RequestError.create(e)));
            return;
        }

        dispatch(
            new FetchActivityDetailsSuccess(
                isoDate,
                activityDetails,
                speedsPerDistance,
                allSpeeds,
                totalDistance,
                averageHeartRate
            )
        );
    };
}
