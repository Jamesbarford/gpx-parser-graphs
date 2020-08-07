import { differenceInSeconds } from "date-fns";

import { parseAsDateOrThrow } from "../parsers/parsers";
import { ActivityDetails } from "../../model/ActivityDetails";

export function getTotalTimeInMinutes(datums: Array<ActivityDetails>) {
    const first = datums[0];
    const last = datums[datums.length - 1];

    const diff = differenceInSeconds(parseAsDateOrThrow(last.timestamp), parseAsDateOrThrow(first.timestamp));

    // decimal need to be mulitplied by 60 for display purposes
    return diff / 60;
}
