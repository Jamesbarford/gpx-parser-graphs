import thunk, { ThunkDispatch } from "redux-thunk";
import { createStore, combineReducers, AnyAction, applyMiddleware, compose, Store, Action } from "redux";
import { createLogger } from "redux-logger";
import { isPlainObject, isFunction } from "lodash";
import { uploadGpxReducer, UploadGpxState } from "../App/components/GpxUploader/reducer";
import { runningDataReducer, RunningDataState } from "./data/runningData/reducer";


export type DispatchThunk<E = any> = ThunkDispatch<E, AppState, Action>;

export interface AppState {
    uploadGpxState: UploadGpxState;
    runningDataState: RunningDataState
}

const middleware = applyMiddleware(
    thunk,
    stripClassActions,
    createLogger({
        collapsed(): boolean {
            return true;
        }
    })
);

function stripClassActions<State, Action>(_: Store<State>) {
    return function(next: (a: Action) => void) {
        return function(action: Action) {
            if (isPlainObject(action)) return next(action);
            if (isFunction(action)) return next(action());
            return next(Object.assign({}, action));
        };
    };
}


const reducers = combineReducers<AppState, AnyAction>({
    uploadGpxState: uploadGpxReducer,
    runningDataState: runningDataReducer
});

const enhancers = compose(
    middleware,
    "__REDUX_DEVTOOLS_EXTENSION__" in window ? (<any>window).__REDUX_DEVTOOLS_EXTENSION__() : compose
);

export const store = createStore(reducers, enhancers);
