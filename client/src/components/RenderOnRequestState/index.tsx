import * as React from "react";
import { RequestError, RequestState, RequestStates } from "../../lib/persistance";

interface RenderOnRequestStateProps {
    requestState: RequestState;
    InitializerComponent: React.ReactElement;
    LoadingComponent: React.ReactElement;
    SuccessComponent: React.ReactElement;
    ErrorComponent: React.ReactElement;
}

export const RenderOnRequestState: React.FC<RenderOnRequestStateProps> = React.memo(props => {
    if (RequestError.is(props.requestState)) return props.ErrorComponent;

    switch (props.requestState.state) {
        case RequestStates.Initial:
            return props.InitializerComponent;

        case RequestStates.Loading:
            return props.LoadingComponent;

        case RequestStates.Success:
            return props.SuccessComponent;

        default:
            return null;
    }
});

type RenderOnRequestStateMergeInitialAndLoadingProps = Omit<
    RenderOnRequestStateProps,
    "InitializerComponent"
>;

export const RenderOnRequestStateMergeInitialAndLoading: React.FC<RenderOnRequestStateMergeInitialAndLoadingProps> = React.memo(
    props => (
        <RenderOnRequestState
            requestState={props.requestState}
            InitializerComponent={props.LoadingComponent}
            LoadingComponent={props.LoadingComponent}
            SuccessComponent={props.SuccessComponent}
            ErrorComponent={props.ErrorComponent}
        />
    )
);
