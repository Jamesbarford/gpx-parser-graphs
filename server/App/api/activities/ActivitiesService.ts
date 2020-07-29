import { Activity } from "../../GPXParser/model/Activity";

export interface IActivitiesRepository {
    insertActivity(activity: Activity, userId: string): Promise<any>;
    getSingle(): Promise<any>;
    getAll(): Promise<any>;
    getCount(): Promise<any>;
}

type InsertActivityRequest = {
    userId: string;
    activity: Activity;
};

export class ActivitiesService {
    public constructor(private readonly activitiesRepository: IActivitiesRepository) {}

    public async insertActivity(req: InsertActivityRequest, res: any): Promise<any> {
        try {
            await this.activitiesRepository.insertActivity(req.activity, req.userId);
        } catch (e) {
            throw e;
        }
    }

    public async getSingle(req: any, res: any): Promise<any> {}

    public async getAll(req: any, res: any): Promise<any> {}

    public async getCount(req: any, res: any): Promise<any> {}
}
