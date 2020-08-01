import { differenceInSeconds } from "date-fns";

import { ActivityDataPoint } from "../../model/ActivityDataPoint";
import { parseAsDateOrThrow } from "../parsers/parsers";

export function getTotalTimeInMinutes(datums: Array<ActivityDataPoint>) {
    const first = datums[0];
    const last = datums[datums.length - 1];

    const diff = differenceInSeconds(parseAsDateOrThrow(last.timeStamp), parseAsDateOrThrow(first.timeStamp));

    // decimal need to be mulitplied by 60 for display purposes
    return diff / 60;
}
