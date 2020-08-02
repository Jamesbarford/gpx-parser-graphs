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
                INSERT INTO activities(user_id, activity_date, activity_type, activity_name) 
                VALUES ('${userId}', '${activity.date}', 'run', '${activity.activityName}');
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
                INSERT INTO activity_data(user_id, activity_date, activity_type, timestamp, lat, lon, heart_rate, cadence) 
                VALUES ${insertStatements};
                `
            );
        } catch (e) {
            throw new Error(`Failed to insert activity datapoints: ${e}`);
        }
    }

    private toInsertStatement(activityDataPoint: ActivityDataPoint): string {
        return `('${activityDataPoint.user_id}', '${activityDataPoint.activity_date}', 'run', '${
            activityDataPoint.timeStamp
        }', '${activityDataPoint.lat}', '${activityDataPoint.lon}', '${activityDataPoint.hr || null}', ${
            activityDataPoint.cad || null
        })`;
    }

    public async getSingle(userId: string, activityDate: string): Promise<any> {
        try {
            const dbResponse = await this.db.raw(`
                SELECT * FROM activity_data
                WHERE activity_date = '${activityDate}'
                AND user_id = '${userId}'
                ORDER BY timestamp;
            `);
            return dbResponse.rows[0];
        } catch (e) {
            throw new Error(`Failed to get activity for date: ${activityDate}: ${e}`);
        }
    }

    public async getAll(userId: string): Promise<any[]> {
        try {
            const dbResponse = await this.db.raw(`SELECT * FROM activities WHERE user_id = '${userId}'`);
            return dbResponse.rows;
        } catch (e) {
            throw new Error(`Failed to get activities for user: ${e}`);
        }
    }

    public async getCount(userId: string): Promise<number> {
        try {
            const dbResponse = await this.db.raw(`
                SELECT COUNT(*) from activities
                WHERE user_id = '${userId}';
            `);

            return dbResponse.rows[0].count;
        } catch (e) {
            throw new Error(`Failed to get activity for user: ${e}`);
        }
    }

    public async getActivitiesForMonth(userId: string, month: number, year: number) {
        try {
            const dbResponse = await this.db.raw(`
                SELECT * from activities
                WHERE user_id = '${userId}' AND
                EXTRACT(MONTH FROM activity_date::timestamp) = ${month} AND 
                EXTRACT(YEAR FROM activity_date::timestamp) = ${year};
            `);

            return dbResponse.rows;
        } catch (e) {
            throw new Error(`Failed to get activities for: ${month}/${year}: ${e}`);
        }
    }
}
