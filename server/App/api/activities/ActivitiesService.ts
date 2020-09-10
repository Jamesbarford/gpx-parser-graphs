import { ActivityWithData } from "../../GPXParser/model/ActivityWithData";
import { Activity } from "../../GPXParser/model/Activity";
import { ActivityDetails } from "../../GPXParser/model/ActivityDetails";

export interface IActivitiesRepository {
    insertActivity(activity: ActivityWithData, userId: string): Promise<Activity>;
    getSingle(userId: string, activityDate: string): Promise<ActivityDetails[]>;
    getAll(userId: string): Promise<Activity[]>;
    getCount(userId: string): Promise<number>;
    getActivitiesForMonth(userId: string, month: number, year: number): Promise<Activity[]>;
    deleteActivity(userId: string, date: string): Promise<void>;
}

interface UserRequest {
    userId: string;
}

interface InsertActivityRequest extends UserRequest {
    activity: ActivityWithData;
}

interface GetActivityDetailsRequest extends UserRequest {
    date: string;
}

interface GetActivitiesForMonthRequest extends UserRequest {
    month: number;
    year: number;
}

export class ActivitiesService {
    public constructor(private readonly activitiesRepository: IActivitiesRepository) {}

    public async insertActivity(req: InsertActivityRequest): Promise<Activity> {
        return await this.activitiesRepository.insertActivity(req.activity, req.userId);
    }

    public async getSingle(req: GetActivityDetailsRequest): Promise<ActivityDetails[]> {
        return await this.activitiesRepository.getSingle(req.userId, req.date);
    }

    public async getAll(req: UserRequest): Promise<Activity[]> {
        return await this.activitiesRepository.getAll(req.userId);
    }

    public async getCount(req: UserRequest): Promise<number> {
        return await this.activitiesRepository.getCount(req.userId);
    }

    public async getActivitiesForMonth(req: GetActivitiesForMonthRequest): Promise<Activity[]> {
        return await this.activitiesRepository.getActivitiesForMonth(req.userId, req.month, req.year);
    }

    public async deleteActivity(req: any): Promise<void> {
        return await this.activitiesRepository.deleteActivity(req.userId, req.date);
    }
}
