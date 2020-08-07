import { ActivityWithData } from "../../GPXParser/model/ActivityWithData";

export interface IActivitiesRepository {
    insertActivity(activity: ActivityWithData, userId: string): Promise<any>;
    getSingle(userId: string, activityDate: string): Promise<any>;
    getAll(userId: string): Promise<any>;
    getCount(userId: string): Promise<any>;
    getActivitiesForMonth(userId: string, month: number, year: number): Promise<any>;
}

type InsertActivityRequest = {
    userId: string;
    activity: ActivityWithData;
};

export class ActivitiesService {
    public constructor(private readonly activitiesRepository: IActivitiesRepository) {}

    public async insertActivity(req: InsertActivityRequest): Promise<any> {
        try {
            return await this.activitiesRepository.insertActivity(req.activity, req.userId);
        } catch (e) {
            throw e;
        }
    }

    public async getSingle(req: { userId: string; date: string }): Promise<any> {
        try {
            return await this.activitiesRepository.getSingle(req.userId, req.date);
        } catch (e) {
            throw e;
        }
    }

    public async getAll(req: { userId: string }): Promise<any> {
        try {
            return await this.activitiesRepository.getAll(req.userId);
        } catch (e) {
            throw e;
        }
    }

    public async getCount(req: { userId: string }): Promise<any> {
        try {
            console.log(req);
            return await this.activitiesRepository.getCount(req.userId);
        } catch (e) {
            throw e;
        }
    }

    public async getActivitiesForMonth(req: {
        userId: string;
        month: number;
        year: number;
    }): Promise<any> {
        try {
            return await this.activitiesRepository.getActivitiesForMonth(req.userId, req.month, req.year);
        } catch (e) {
            throw e;
        }
    }
}
