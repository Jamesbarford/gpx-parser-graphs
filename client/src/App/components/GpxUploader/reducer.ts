import { UploadGPXActions, UploadGPXActionTypes } from "./actions";
import { Initial, Loading, RequestState, Success } from "../../../lib/persistance";
import { shallowUpdate } from "../../../lib/util";

export interface UploadGpxState {
    requestState: RequestState;
}

function initState(): UploadGpxState {
    return {
        requestState: new Initial()
    };
}

export function uploadGpxReducer(state: UploadGpxState = initState(), action: UploadGPXActions) {
    switch (action.type) {
        case UploadGPXActionTypes.UploadGPXFileFailure:
            return shallowUpdate(state, {
                requestState: action.requestError
            });


        case UploadGPXActionTypes.UploadGPXFileStart:
            return shallowUpdate(state, {
                requestState: new Loading()
            });

        case UploadGPXActionTypes.UploadGPXFileSuccess:
            return shallowUpdate(state, {
                requestState: new Success()
            });

        default:
            return state;
    }
}
