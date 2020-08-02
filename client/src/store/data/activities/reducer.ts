import { keyBy, union } from "lodash";

import { DistanceFormat } from "../../models/DistanceFormat";
import { Activity, ActivityWithDetails } from "./types";
import { Initial, Loading, RequestState, Success } from "../../../lib/persistance";
import { ActivitiesActionTypes, ActivityActions } from "./actions";

export interface ActivitiesState {
    ids: Array<string>;
    byId: Record<string, ActivityWithDetails>;
    allActivitiesRequestState: RequestState;
    distanceFormat: DistanceFormat;
}

function initActivitiesState(): ActivitiesState {
    return {
        ids: [],
        byId: {},
        distanceFormat: DistanceFormat.MILES,
        allActivitiesRequestState: new Initial()
    };
}

export function activitiesReducer(
    state: ActivitiesState = initActivitiesState(),
    action: ActivityActions
): ActivitiesState {
    switch (action.type) {
        case ActivitiesActionTypes.FetchAllActivitiesStart:
            return {
                ...state,
                allActivitiesRequestState: new Loading()
            };

        case ActivitiesActionTypes.FetchAllActivitiesFailure:
            return {
                ...state,
                allActivitiesRequestState: action.requestError
            };

        case ActivitiesActionTypes.FetchAllActivitiesSuccess:
            return {
                ...state,
                ids: updateIds(state, action.activities),
                byId: updateDictionary(state, action.activities),
                allActivitiesRequestState: new Success()
            };

        case ActivitiesActionTypes.FetchActivitiesForMonthSuccess:
            return {
                ...state,
                ids: updateIds(state, action.activities),
                byId: updateDictionary(state, action.activities)
            };

        case ActivitiesActionTypes.FetchActivityDetailsStart:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.isoDate]: {
                        ...state.byId[action.isoDate],
                        requestState: new Loading()
                    }
                }
            };

        case ActivitiesActionTypes.FetchActivityDetailsFailure:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.isoDate]: {
                        ...state.byId[action.isoDate],
                        requestState: action.requestError
                    }
                }
            };

        case ActivitiesActionTypes.FetchActivityDetailsSuccess:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.isoDate]: {
                        ...state.byId[action.isoDate],
                        requestState: new Success(),
                        details: action.activityDetails
                    }
                }
            };

        default:
            return state;
    }
}

function updateIds(state: ActivitiesState, activities: Array<Activity>) {
    return union(
        state.ids,
        activities.map(activity => activity.date.toISOString())
    );
}

function updateDictionary(state: ActivitiesState, activities: Array<Activity>) {
    return Object.assign(
        {},
        state.byId,
        keyBy(activities, activity => activity.date.toISOString())
    );
}
