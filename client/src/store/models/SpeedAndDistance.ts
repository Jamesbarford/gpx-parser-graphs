import { formatTimeInMinutes } from "../../lib/formatters/timeFormatters";
import { DistanceFormat } from "./DistanceFormat";


export class SpeedAndDistance {
    public readonly formattedSpeed: string;

    public constructor(
        public readonly speed: number,
        public readonly distance: number,
        public readonly distanceFormat: DistanceFormat
    ) {
        this.formattedSpeed = formatTimeInMinutes(this.speed);
    }
}

