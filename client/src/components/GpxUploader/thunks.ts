import { Dispatch } from "redux";
import { isNil } from "lodash";

import { UploadGPXFileFailure, UploadGPXFileStart, UploadGPXFileSuccess } from "./actions";
import { RequestError } from "../../lib/persistance";
import { postGPXFileReq } from "../../apiRequests/upload";
import { toActivity } from "../../store/data/activities/apiConverter";

export function uploadGPXThunk(gpxFile: File) {
    return async function(dispatch: Dispatch<any>): Promise<void> {
        dispatch(new UploadGPXFileStart());

        try {
            const fileReader = new FileReader();

            fileReader.onload = async (event) => {
                const contents = event?.target?.result;

                if (isNil(contents)) {
                    throw new Error("File could not be read");
                }

                const res = await postGPXFileReq(contents.toString());
                const activity = toActivity(res.data);

                dispatch(new UploadGPXFileSuccess(activity));
            };

            fileReader.onerror = (event) => {
                throw new Error("File could not be read! Code " + event?.target?.error?.code);
            };

            fileReader.readAsBinaryString(gpxFile);


        } catch (e) {
            dispatch(new UploadGPXFileFailure(RequestError.create(e?.error || "Failed to upload gpx file", e.code)));
        }
    };
}
