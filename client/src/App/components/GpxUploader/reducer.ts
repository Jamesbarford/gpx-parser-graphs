import { UploadGPXActions, UploadGPXActionTypes } from "./actions";
import { Initial, Loading, RequestState, Success } from "../../../lib/persistance";

export interface RunDataState {
    requestState: RequestState;
}

function initState(): RunDataState {
    return {
        requestState: new Initial()
    };
}

export function runDataReducer(state: RunDataState = initState(), action: UploadGPXActions) {
    switch (action.type) {
        case UploadGPXActionTypes.UploadGPXFileFailure:
            return updateState(state, {
                requestState: action.requestError
            });


        case UploadGPXActionTypes.UploadGPXFileStart:
            return updateState(state, {
                requestState: new Loading()
            });

        case UploadGPXActionTypes.UploadGPXFileSuccess:
            return updateState(state, {
                requestState: new Success()
            });

        default:
            return state;
    }
}

function updateState(state: RunDataState, patch: Partial<RunDataState>): RunDataState {
    return Object.assign({}, state, patch);
}
