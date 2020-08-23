import { formatTimeInMinutes } from "../formatters/timeFormatters";

const KILOMETER_TO_MILE = 1609.344;

export function metersPerSecondToMinutesPerMileFormatted(metersPerSecond: number): string {
    const minutesPerMile = metersPerSecondToMinutesPerMile(metersPerSecond);
    return formatTimeInMinutes(minutesPerMile);
}

export function metersPerSecondToMinutesPerMile(metersPerSecond: number): number {
    const metersPerMinute = metersPerSecondToMetersPerMinute(metersPerSecond);
    return KILOMETER_TO_MILE / metersPerMinute;
}

function metersPerSecondToMetersPerMinute(metresPerSecond: number): number {
    return metresPerSecond * 60;
}
