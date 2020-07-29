import Knex from "knex";
import { IActivitiesRepository } from "./ActivitiesService";
import { Activity } from "../../GPXParser/model/Activity";
import { ActivityDataPoint } from "../../GPXParser/model/ActivityDataPoint";

export class ActivitiesRepository implements IActivitiesRepository {
    public constructor(private db: Knex<any, any>) {
        this.toInsertStatement = this.toInsertStatement.bind(this);
    }

    public async insertActivity(activity: Activity, userId: string) {
        try {
            await this.db.raw(
                `
                INSERT INTO activities(user_id, activity_id, activity_date, activity_type, activity_name) 
                VALUES ('${userId}', '${activity.date}', '${activity.date}', 'run', '${activity.activityName}');
            `
            );
            await this.insertActivityData(activity.datum);
        } catch (e) {
            throw new Error(`Failed to insert activity: ${e}`);
        }
    }

    private async insertActivityData(activityDataPoints: Array<ActivityDataPoint>): Promise<any> {
        try {
            const insertStatements: string = activityDataPoints.map(this.toInsertStatement).join(",");

            await this.db.raw(
                `
                INSERT INTO activity_data(user_id, activity_id, activity_date, activity_type, speed, distance, timestamp, lat, lon, heart_rate, cadence)
                VALUES ${insertStatements};
                `
            );
        } catch (e) {
            throw new Error(`Failed to insert activity datapoints: ${e}`);
        }
    }

    private toInsertStatement(activityDataPoint: ActivityDataPoint): string {
        return `('${activityDataPoint.user_id}', '${
            activityDataPoint.activity_id
        }', '${activityDataPoint.activity_date.toISOString()}', 'run', '${0}', '${0}', '${activityDataPoint.timeStamp.toISOString()}', '${
            activityDataPoint.lat
        }', '${activityDataPoint.lon}', '${activityDataPoint.hr || null}', ${
            activityDataPoint.cad || null
        })`;
    }

    public async getSingle() {}

    public async getAll() {}

    public async getCount() {}
}
