import { differenceInSeconds } from "date-fns";

import { StravaDataPoint } from "../../model/StravaDataPoint";

export function getTotalTimeInMinutes(datums: Array<StravaDataPoint>) {
    const first = datums[0];
    const last = datums[datums.length - 1];

    const diff = differenceInSeconds(last.timeStamp, first.timeStamp);

    // decimal need to be mulitplied by 60 for display purposes
    return diff / 60;
}
