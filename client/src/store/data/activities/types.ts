import { RequestState } from "../../../lib/persistance";
import { SpeedAndDistance } from "../../models/SpeedAndDistance";

export interface Activity {
    date: Date;
    name: string;
    type: string;
}

export type ActivityDictionary = Record<string, ActivityWithDetails>;

export interface ActivityWithDetails extends ActivityWithRequestState {
    details?: ActivityDetails[];
    speedsPerDistance?: SpeedAndDistance[];
    allSpeeds?: SpeedAndDistance[];
    totalDistance?: number;
    averageHeartRate?: number;
}

export interface ActivityWithRequestState extends Activity {
    requestState: RequestState;
}

export interface ActivityDetails {
    timestamp: Date;
    lat: number;
    lon: number;
    heartRate?: number;
    cadence?: number;
}
