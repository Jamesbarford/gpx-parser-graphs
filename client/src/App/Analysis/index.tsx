import * as React from "react";
import { connect } from "react-redux";

import { AppState, DispatchThunk } from "../../store/store";
import { getActivityDetailsThunk } from "../../store/data/activities/thunks";
import { PageContainer } from "../../components/PageContainer";
import { DistanceFormat } from "../../store/models/DistanceFormat";
import { getActivityNameFromISODateOwnProp } from "../../components/Activity/selectors";
import { getRequestStateForActivity, getTotalDistance } from "../../store/data/activities/selectors";
import { RequestState } from "../../lib/persistance";
import { RenderOnRequestStateMergeInitialAndLoading } from "../../components/RenderOnRequestState";
import { Typography } from "@material-ui/core";

interface OwnProps {
    activityISODate: string;
}

interface MapDispatchToProps {
    getActivityDetails(): void;
}

interface MapStateToProps {
    activityName: string;
    activityDistance: number;
    distanceFormat: DistanceFormat;
    requestState: RequestState;
}

type AnalysisProps = OwnProps & MapDispatchToProps & MapStateToProps;

class Analysis extends React.Component<AnalysisProps, any> {
    public componentDidMount(): void {
        this.props.getActivityDetails();
    }

    public render() {
        return (
            <PageContainer>
                <RenderOnRequestStateMergeInitialAndLoading
                    requestState={this.props.requestState}
                    LoadingComponent={<span>Loading</span>}
                    SuccessComponent={<Typography variant="h4">{this.props.activityName}</Typography>}
                    ErrorComponent={<span>{this.props.requestState.error}</span>}
                />
            </PageContainer>
        );
    }
}

export const AnalysisConnected = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
    (state: AppState, ownProps: OwnProps) => ({
        activityName: getActivityNameFromISODateOwnProp(state, ownProps),
        activityDistance: getTotalDistance(state, ownProps.activityISODate),
        distanceFormat: state.activities.distanceFormat,
        requestState: getRequestStateForActivity(state, ownProps.activityISODate)
    }),
    (dispatch: DispatchThunk, ownProps: OwnProps) => ({
        getActivityDetails(): void {
            dispatch(getActivityDetailsThunk(ownProps.activityISODate));
        }
    })
)(Analysis);
