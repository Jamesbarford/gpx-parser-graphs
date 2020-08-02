export interface AuthState {
    userId: string;
}

function initAuthState(): AuthState {
    return {
        userId: "user_id"
    };
}

export function authReducer(state: AuthState = initAuthState()) {
    return state;
}
