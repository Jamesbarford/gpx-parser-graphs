import { deleteRequest, getRequest } from "./MakeXMLRequest";

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

export async function getAllActivitiesReq(userId: string): Promise<any> {
    return getRequest(`/activities/${userId}`);
}

export async function deleteActivity(userId: string, isoDate: string): Promise<any> {
    return deleteRequest(`/activities/userId/${userId}/date/${isoDate}`);
}
