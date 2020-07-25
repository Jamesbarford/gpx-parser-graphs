import { HttpReqMethod, MakeXMLRequest } from "./MakeXMLRequest";

export async function postGPXFileReq(gpxFileString: string) {
    const req = MakeXMLRequest.setupRequest({
        url: "/upload",
        body: { data: gpxFileString },
        httpReqMethod: HttpReqMethod.POST,
        requestHeaders: {
            "Content-Type": "application/json"
        }
    });

    return req.makeRequest();
}
