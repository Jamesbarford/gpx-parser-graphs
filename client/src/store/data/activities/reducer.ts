import { union, remove, isNil } from "lodash";
import produce from "immer";

import { DistanceFormat } from "../../models/DistanceFormat";
import { Activity, ActivityDictionary } from "./types";
import { Initial, Loading, RequestState, Success } from "../../../lib/persistance";
import { ActivitiesActionTypes, ActivityActions } from "./actions";
import { UploadGPXActions, UploadGPXActionTypes } from "../../../components/GpxUploader/actions";

export interface ActivitiesState {
    ids: Array<string>;
    byId: ActivityDictionary;
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
    action: ActivityActions | UploadGPXActions
): ActivitiesState {
    switch (action.type) {
        case UploadGPXActionTypes.UploadGPXFileSuccess:
            return produce(state, draftState => {
                const id = action.activity.date.toISOString();

                draftState.ids = union(draftState.ids, [id]);
                draftState.byId[action.activity.date.toISOString()] = {
                    ...action.activity,
                    requestState: new Success()
                };
            });

        case ActivitiesActionTypes.FetchAllActivitiesStart:
            return produce(state, draftState => {
                draftState.allActivitiesRequestState = new Loading();
            });

        case ActivitiesActionTypes.FetchAllActivitiesFailure:
            return produce(state, draftState => {
                draftState.allActivitiesRequestState = action.requestError;
            });

        case ActivitiesActionTypes.FetchAllActivitiesSuccess:
            return produce(state, draftState => {
                draftState.ids = updateIds(draftState, action.activities);
                draftState.byId = createActivityDictionary(action.activities);
                draftState.allActivitiesRequestState = new Success();
            });

        case ActivitiesActionTypes.FetchActivitiesForMonthSuccess:
            return produce(state, draftState => {
                const newDictionary = createActivityDictionary(action.activities);
                Object.assign(draftState.byId, newDictionary);
                draftState.ids = updateIds(draftState, action.activities);
            });

        case ActivitiesActionTypes.FetchActivityDetailsStart:
            return produce(state, draftState => {
                draftState.byId[action.isoDate].requestState = new Loading();
            });

        case ActivitiesActionTypes.FetchActivityDetailsFailure:
            return produce(state, draftState => {
                draftState.byId[action.isoDate].requestState = action.requestError;
            });

        case ActivitiesActionTypes.FetchActivityDetailsSuccess:
            return produce(state, draftState => {
                const activity = draftState.byId[action.isoDate];
                if (isNil(activity)) return;

                activity.requestState = new Success();
                activity.details = action.activityDetails;
                activity.speedsPerDistance = action.speedsPerDistance;
                activity.allSpeeds = action.allSpeeds;
                activity.totalDistance = action.totalDistance;
                activity.averageHeartRate = action.averageHeartRate;
            });

        case ActivitiesActionTypes.DeleteActivityStart:
            return produce(state, draftState => {
                remove(draftState.ids, id => id === action.isoDate);
                delete draftState.byId[action.isoDate];
            });

        case ActivitiesActionTypes.DeleteActivityFailure:
            return produce(state, draftState => {
                draftState.ids.push(action.isoDate);
                draftState.byId[action.isoDate] = {
                    ...action.activity,
                    requestState: action.requestError
                };
            });

        case ActivitiesActionTypes.DeleteActivitySuccess:
            return state;

        default:
            return state;
    }
}

function updateIds(state: ActivitiesState, activities: Array<Activity>): Array<string> {
    return union(
        state.ids,
        activities.map(activity => activity.date.toISOString())
    );
}

function createActivityDictionary(activities: Array<Activity>): ActivityDictionary {
    return activities.reduce((dict: ActivityDictionary, activity) => {
        dict[activity.date.toISOString()] = {
            ...activity,
            requestState: new Initial()
        };
        return dict;
    }, {});
}
