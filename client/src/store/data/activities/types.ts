import { RequestState } from "../../../lib/persistance";

export interface Activity {
    date: Date;
    name: string;
    type: string;
}

export interface ActivityWithRequestState extends Activity {
    requestState: RequestState;
}

export interface ActivityWithDetails extends ActivityWithRequestState {
    details?: ActivityDetails[];
}

export type ActivityDictionary = Record<string, ActivityWithDetails>;

export interface ActivityDetails {
    timestamp: Date;
    lat: number;
    lon: number;
    heartRate?: number;
    cadence?: number;
}
