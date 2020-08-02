import { RequestError } from "../../../lib/persistance";

export const enum UploadGPXActionTypes {
    UploadGPXFileStart = "UploadGpx.UploadGPXFileStart",
    UploadGPXFileFailure = "UploadGpx.UploadGPXFileFailure",
    UploadGPXFileSuccess = "UploadGpx.UploadGPXFileSuccess"
}

export class UploadGPXFileStart {
    public readonly type = UploadGPXActionTypes.UploadGPXFileStart;
}

export class UploadGPXFileFailure {
    public readonly type = UploadGPXActionTypes.UploadGPXFileFailure;

    public constructor(public readonly requestError: RequestError) {}
}

export class UploadGPXFileSuccess {
    public readonly type = UploadGPXActionTypes.UploadGPXFileSuccess;
}

export type UploadGPXActions = UploadGPXFileStart | UploadGPXFileFailure | UploadGPXFileSuccess;
