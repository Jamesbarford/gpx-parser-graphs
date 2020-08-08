import * as React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

import { AppState, DispatchThunk } from "../../store/store";
import { getActivityDetailsThunk } from "../../store/data/activities/thunks";
import { PageContainer } from "../../components/PageContainer";
import { DistanceFormat } from "../../store/models/DistanceFormat";
import { getActivityNameFromISODateOwnProp } from "../../components/Activity/selectors";
import {
    getAverageSpeedsPerDistance,
    getRequestStateForActivity,
    getTotalDistance
} from "../../store/data/activities/selectors";
import { RequestState } from "../../lib/persistance";
import { RenderOnRequestStateMergeInitialAndLoading } from "../../components/RenderOnRequestState";
import { BarChart } from "../graphRendering/Graphs/BarChart";
import { SpeedAndDistance } from "../../store/models/SpeedAndDistance";

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
    averageSpeedsPerDistance: Array<SpeedAndDistance>;
}

type AnalysisProps = OwnProps & MapDispatchToProps & MapStateToProps;

class Analysis extends React.Component<AnalysisProps, any> {
    public componentDidMount(): void {
        this.props.getActivityDetails();
    }

    public render() {
        console.log(this.props.requestState)
        return (
            <PageContainer>
                <RenderOnRequestStateMergeInitialAndLoading
                    requestState={this.props.requestState}
                    LoadingComponent={<span>Loading</span>}
                    ErrorComponent={<span>{this.props.requestState.error}</span>}
                    SuccessComponent={
                        <>
                            <Typography variant="h4">{this.props.activityName}</Typography>
                            <BarChart activityData={this.props.averageSpeedsPerDistance} />
                        </>
                    }
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
        requestState: getRequestStateForActivity(state, ownProps.activityISODate),
        averageSpeedsPerDistance: getAverageSpeedsPerDistance(state, ownProps.activityISODate)
    }),
    (dispatch: DispatchThunk, ownProps: OwnProps) => ({
        getActivityDetails(): void {
            dispatch(getActivityDetailsThunk(ownProps.activityISODate));
        }
    })
)(Analysis);
