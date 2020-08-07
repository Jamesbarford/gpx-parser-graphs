import { ActivityWithData } from "../../GPXParser/model/ActivityWithData";
import { Activity } from "../../GPXParser/model/Activity";
import { ActivityDetails } from "../../GPXParser/model/ActivityDetails";

export interface IActivitiesRepository {
    insertActivity(activity: ActivityWithData, userId: string): Promise<void>;
    getSingle(userId: string, activityDate: string): Promise<ActivityDetails[]>;
    getAll(userId: string): Promise<Activity[]>;
    getCount(userId: string): Promise<number>;
    getActivitiesForMonth(userId: string, month: number, year: number): Promise<Activity[]>;
}

type InsertActivityRequest = {
    userId: string;
    activity: ActivityWithData;
};

type GetActivityDetailsRequest = {
    userId: string;
    date: string;
};

type GetActivitiesForMonthRequest = {
    userId: string;
    month: number;
    year: number;
};

export class ActivitiesService {
    public constructor(private readonly activitiesRepository: IActivitiesRepository) {}

    public async insertActivity(req: InsertActivityRequest): Promise<any> {
        return await this.activitiesRepository.insertActivity(req.activity, req.userId);
    }

    public async getSingle(req: GetActivityDetailsRequest): Promise<ActivityDetails[]> {
        return await this.activitiesRepository.getSingle(req.userId, req.date);
    }

    public async getAll(req: { userId: string }): Promise<any> {
        return await this.activitiesRepository.getAll(req.userId);
    }

    public async getCount(req: { userId: string }): Promise<number> {
        return await this.activitiesRepository.getCount(req.userId);
    }

    public async getActivitiesForMonth(req: GetActivitiesForMonthRequest): Promise<Activity[]> {
        return await this.activitiesRepository.getActivitiesForMonth(req.userId, req.month, req.year);
    }
}
