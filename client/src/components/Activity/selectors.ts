import { AppState } from "../../store/store";
import { getActivityWithDetails } from "../../store/data/activities/selectors";
import { format } from "date-fns";

interface ActivityDateOwnProp {
    activityISODate: string;
}

export function getActivityNameFromISODateOwnProp(
    appState: AppState,
    ownProps: ActivityDateOwnProp
): string {
    return getActivityWithDetails(appState, ownProps.activityISODate)?.name || "No activity found";
}

export function getActivityDateFormattedFromISODateOwnProp(
    appState: AppState,
    ownProps: ActivityDateOwnProp
): string {
    const date = getActivityWithDetails(appState, ownProps.activityISODate)?.date;
    return date ? format(date, "yyyy/MM/dd") : "No date for activity";
}

export function getActivityTypeFromISODateOwnProp(
    appState: AppState,
    ownProps: ActivityDateOwnProp
): string {
    return getActivityWithDetails(appState, ownProps.activityISODate)?.type || "No activity type found";
}
