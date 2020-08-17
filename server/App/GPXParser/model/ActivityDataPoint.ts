import { ActivityDetails } from "./ActivityDetails";

export class ActivityDataPoint implements ActivityDetails {
    public constructor(
        public readonly lat: number,
        public readonly lon: number,
        public readonly timestamp: string,
        public readonly activity_date: string,
        public readonly user_id: string,
        public readonly hr?: number,
        public readonly cad?: number
    ) {}
}
