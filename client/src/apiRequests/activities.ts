import { getRequest } from "./MakeXMLRequest";

export async function getActivitiesForMonthReq(
    userId: string,
    month: number,
    year: number
): Promise<any> {
    return getRequest(`/activities/range/${userId}?month=${month}&year=${year}`);
}

export async function getActivityDetailsReq(userId: string, date: string): Promise<any> {
    return getRequest(`/activities/userId/${userId}/date/${date}`);
}

export async function getAllActivities(userId: string): Promise<any> {
    return getRequest(`/activities/${userId}`);
}
