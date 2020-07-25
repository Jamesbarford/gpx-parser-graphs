import { Dispatch } from "redux";

import { UploadGPXFileFailure, UploadGPXFileStart, UploadGPXFileSuccess } from "./actions";
import { RequestError } from "../../../lib/persistance";
import { postGPXFileReq } from "../../../apiRequests/upload";

export function uploadGPXThunk(gpxFile: File) {
    return async function(dispatch: Dispatch<any>) {
        dispatch(new UploadGPXFileStart());

        try {
            await postGPXFileReq(gpxFile);
        } catch (e) {
            dispatch(new UploadGPXFileFailure(RequestError.create(e.error, e.code)));
            return;
        }

        dispatch(new UploadGPXFileSuccess());
    };
}
