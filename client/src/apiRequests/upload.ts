import { isNil } from "lodash";

import { CancelableRequest, HttpReqMethod, MakeXMLRequest } from "./MakeXMLRequest";

export async function postGPXFileReq(gpxFile: File) {
    const fileReader = new FileReader();

    let req: CancelableRequest;

    fileReader.onload = (event) => {
        const contents = event?.target?.result;

        if (isNil(contents)) {
            throw new Error("File could not be read");
        }

        req = MakeXMLRequest.setupRequest({
            url: "/upload",
            body: { data: contents.toString() },
            httpReqMethod: HttpReqMethod.POST,
            requestHeaders: {
                "Content-Type": "application/json"
            }
        });
        console.log(typeof contents.toString());
        return req.makeRequest();
    };

    fileReader.onerror = (event) => {
        throw new Error("File could not be read! Code " + event?.target?.error?.code);
    };

    fileReader.readAsBinaryString(gpxFile);
}
