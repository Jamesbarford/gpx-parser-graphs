import { HttpReqMethod, MakeXMLRequest } from "./MakeXMLRequest";

export async function postGPXFileReq(gpxFileString: string) {
    const req = MakeXMLRequest.setupRequest({
        url: "/activities/upload",
        body: { data: gpxFileString, userId: "user_id" },
        httpReqMethod: HttpReqMethod.POST,
        requestHeaders: {
            "Content-Type": "application/json"
        }
    });

    return req.makeRequest();
}
