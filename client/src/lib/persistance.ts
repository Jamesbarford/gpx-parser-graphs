export const enum RequestStates {
    Initial = "Initial",
    Loading = "Loading",
    Error = "Error",
    Success = "Success"
}

export interface RequestState {
    state: RequestStates
    error?: string;
}


export class RequestError implements RequestState {
    public state: RequestStates = RequestStates.Error;

    public constructor(public readonly error: string, public readonly code: number) {
    }

    public static create(error?: string, code?: number) {
        return new RequestError(
            error || "Server error: failed to make request",
            code || 500
        );
    }

    public static is(s: RequestState): s is RequestError {
        return s instanceof RequestError;
    }
}

export class Initial implements RequestState {
    public state = RequestStates.Initial;

    public static is(s: RequestState): s is Initial {
        return s instanceof Initial;
    }
}

export class Loading implements RequestState {
    public state = RequestStates.Loading;

    public static is(s: RequestState): s is Loading {
        return s instanceof Loading;
    }
}

export class Success implements RequestState {
    public state = RequestStates.Success;

    public static is(s: RequestState): s is Success {
        return s instanceof Success;
    }
}

