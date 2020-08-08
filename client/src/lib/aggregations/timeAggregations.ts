import { differenceInSeconds } from "date-fns";
import { ActivityDetails } from "../../store/data/activities/types";

export function getTotalTimeInMinutes(datums: Array<ActivityDetails>) {
    const first = datums[0];
    const last = datums[datums.length - 1];

    const diff = differenceInSeconds(last.timestamp, first.timestamp);

    // decimal need to be mulitplied by 60 for display purposes
    return diff / 60;
}
