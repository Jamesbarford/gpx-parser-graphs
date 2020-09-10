import produce from "immer";

import { UploadGPXActions, UploadGPXActionTypes } from "./actions";
import { Initial, Loading, RequestState, Success } from "../../lib/persistance";

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
            return produce(state, draftState => {
                draftState.requestState = action.requestError;
            });

        case UploadGPXActionTypes.UploadGPXFileStart:
            return produce(state, draftState => {
                draftState.requestState = new Loading();
            });

        case UploadGPXActionTypes.UploadGPXFileSuccess:
            return produce(state, draftState => {
                draftState.requestState = new Success();
            });

        default:
            return state;
    }
}
