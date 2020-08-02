import { ActivitiesState } from "./reducer";
import { ActivityDetails, ActivityWithDetails } from "./types";
import { AppState } from "../../store";
import { Initial, RequestState } from "../../../lib/persistance";

export function getActivityDetails(appState: AppState, isoDate: string): Array<ActivityDetails> {
    return getActivityWithDetails(appState, isoDate)?.details || [];
}

export function getActivityWithDetails(
    appState: AppState,
    isoDate: string
): ActivityWithDetails | undefined {
    return getActivitiesDictionary(appState)?.[isoDate];
}

function getActivitiesDictionary(appState: AppState) {
    return getActivitiesState(appState).byId;
}

function getActivitiesState(appState: AppState): ActivitiesState {
    return appState.activities;
}

export function getAllActivitiesRequestState(appState: AppState): RequestState {
    return getActivitiesState(appState).allActivitiesRequestState;
}

export function getAllActivityIds(appState: AppState): Array<string> {
    return getActivitiesState(appState).ids;
}

export function getRequestStateForActivity(appState: AppState, isoDate: string): RequestState {
    return getActivityWithDetails(appState, isoDate)?.requestState || new Initial();
}
