import { AppState } from "../store";
import { UserId } from "./types";
import { AuthState } from "./reducer";

export function getUserId(appState: AppState): UserId {
    return getAuthState(appState).userId;
}

function getAuthState(appState: AppState): AuthState {
    return appState.auth;
}
